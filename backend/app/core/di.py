from typing import TypeVar, Type, Dict, Any, Callable
from functools import lru_cache
from app.config import Settings
from app.db import engine, get_session
from openai import OpenAI
from sqlmodel import Session

T = TypeVar('T')


class DIContainer:
    _instances: Dict[Type, Any] = {}
    _factories: Dict[Type, Callable] = {}
    
    @classmethod
    def register(cls, interface: Type[T], factory: Callable[[], T]) -> None:
        cls._factories[interface] = factory
    
    @classmethod
    def register_singleton(cls, interface: Type[T], instance: T) -> None:
        cls._instances[interface] = instance
    
    @classmethod
    def resolve(cls, interface: Type[T]) -> T:
        if interface in cls._instances:
            return cls._instances[interface]
        
        if interface in cls._factories:
            instance = cls._factories[interface]()
            if interface not in cls._instances:
                cls._instances[interface] = instance
            return instance
        
        raise ValueError(f"No registration found for {interface}")
    
    @classmethod
    def clear(cls) -> None:
        cls._instances.clear()
        cls._factories.clear()


@lru_cache()
def get_settings() -> Settings:
    return Settings()


def get_openai_client() -> OpenAI:
    settings = get_settings()
    return OpenAI(api_key=settings.openai_api_key) if settings.openai_api_key else None


def get_db_session() -> Session:
    return next(get_session())


container = DIContainer()

