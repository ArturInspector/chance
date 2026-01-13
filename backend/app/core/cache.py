from typing import Optional, Callable, Any
from functools import wraps
from datetime import datetime, timedelta
import hashlib
import json


class CacheEntry:
    def __init__(self, value: Any, expires_at: datetime):
        self.value = value
        self.expires_at = expires_at
    
    def is_expired(self) -> bool:
        return datetime.utcnow() > self.expires_at


class SimpleCache:
    def __init__(self):
        self._cache: dict[str, CacheEntry] = {}
    
    def get(self, key: str) -> Optional[Any]:
        entry = self._cache.get(key)
        if entry and not entry.is_expired():
            return entry.value
        if entry:
            del self._cache[key]
        return None
    
    def set(self, key: str, value: Any, ttl_seconds: int = 300) -> None:
        expires_at = datetime.utcnow() + timedelta(seconds=ttl_seconds)
        self._cache[key] = CacheEntry(value, expires_at)
    
    def delete(self, key: str) -> None:
        self._cache.pop(key, None)
    
    def clear(self) -> None:
        self._cache.clear()
    
    def cleanup_expired(self) -> None:
        expired_keys = [k for k, v in self._cache.items() if v.is_expired()]
        for key in expired_keys:
            del self._cache[key]


_global_cache = SimpleCache()


def cache_key(*args, **kwargs) -> str:
    key_data = json.dumps({"args": args, "kwargs": kwargs}, sort_keys=True, default=str)
    return hashlib.md5(key_data.encode()).hexdigest()


def cached(ttl_seconds: int = 300, key_func: Optional[Callable] = None):
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            if key_func:
                key = key_func(*args, **kwargs)
            else:
                key = f"{func.__module__}.{func.__name__}:{cache_key(*args, **kwargs)}"
            
            cached_value = _global_cache.get(key)
            if cached_value is not None:
                return cached_value
            
            result = func(*args, **kwargs)
            _global_cache.set(key, result, ttl_seconds)
            return result
        
        return wrapper
    return decorator


def get_cache() -> SimpleCache:
    return _global_cache

