from functools import wraps
from typing import Callable, TypeVar, Any
from app.core.errors import handle_app_error
from app.core.logging import get_logger
from app.core.transactions import transaction
from sqlmodel import Session

T = TypeVar('T')
logger = get_logger("decorators")


def handle_errors(func: Callable[..., T]) -> Callable[..., T]:
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            logger.error(f"Error in {func.__name__}: {e}", exc_info=True)
            raise handle_app_error(e) if isinstance(e, BaseAppError) else e
    return wrapper


def log_execution(func: Callable[..., T]) -> Callable[..., T]:
    @wraps(func)
    def wrapper(*args, **kwargs):
        logger.debug(f"Executing {func.__name__} with args={args}, kwargs={kwargs}")
        result = func(*args, **kwargs)
        logger.debug(f"{func.__name__} completed successfully")
        return result
    return wrapper


def validate_input(validator_func: Callable) -> Callable:
    def decorator(func: Callable[..., T]) -> Callable[..., T]:
        @wraps(func)
        def wrapper(*args, **kwargs):
            validator_func(*args, **kwargs)
            return func(*args, **kwargs)
        return wrapper
    return decorator


def retry(max_attempts: int = 3, delay: float = 1.0):
    def decorator(func: Callable[..., T]) -> Callable[..., T]:
        @wraps(func)
        def wrapper(*args, **kwargs):
            import time
            last_error = None
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_error = e
                    if attempt < max_attempts - 1:
                        logger.warning(f"Attempt {attempt + 1} failed for {func.__name__}, retrying...")
                        time.sleep(delay)
                    else:
                        logger.error(f"All {max_attempts} attempts failed for {func.__name__}")
            raise last_error
        return wrapper
    return decorator


def with_session(func: Callable[..., T]) -> Callable[..., T]:
    @wraps(func)
    def wrapper(*args, **kwargs):
        from app.db import get_session
        session = next(get_session())
        try:
            return func(session, *args, **kwargs)
        finally:
            session.close()
    return wrapper

