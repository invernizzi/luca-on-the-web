import json
import time
from pathlib import Path
import functools

def cache_results(cache_file_path: str, cache_duration: int):
    """Decorator to cache the results of a function for a specified duration."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            cache_file = Path(cache_file_path)

            # Check if the cache file exists and is recent
            if cache_file.exists():
                cache_age = time.time() - cache_file.stat().st_mtime
                if cache_age < cache_duration:
                    print("Using cached data.", cache_file)
                    with open(cache_file, 'r', encoding='utf-8') as f:
                        return json.load(f)

            # Call the original function and cache its result
            result = func(*args, **kwargs)
            try:
                with open(cache_file, 'w', encoding='utf-8') as f:
                    json.dump(result, f, ensure_ascii=False, indent=2)
            except FileNotFoundError:
                print('Could not write to cache file.')
                pass
            return result

        return wrapper

    return decorator
