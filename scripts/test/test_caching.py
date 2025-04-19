import unittest
import sys
import os
import json
import time
import tempfile
from pathlib import Path

# Add the parent directory to the Python path so we can import the scholar module
sys.path.insert(0, str(Path(__file__).parent.parent))

from scholar.caching import cache_results


class TestCaching(unittest.TestCase):
    """Test cases for the scholar.caching module."""

    def setUp(self):
        """Set up test fixtures."""
        # Create a temporary directory for cache files
        self.temp_dir = tempfile.TemporaryDirectory()
        self.cache_file = Path(self.temp_dir.name) / "test_cache.json"
    
    def tearDown(self):
        """Tear down test fixtures."""
        # Clean up the temporary directory
        self.temp_dir.cleanup()
    
    def test_cache_creation(self):
        """Test that cache is created when function is called."""
        # Define a function to cache
        @cache_results(str(self.cache_file), 3600)
        def func_to_cache():
            return {"data": "test_data", "timestamp": time.time()}
        
        # Call the function, which should create the cache
        result = func_to_cache()
        
        # Check that the cache file exists
        self.assertTrue(self.cache_file.exists())
        
        # Check that the cache file contains the correct data
        with open(self.cache_file, 'r', encoding='utf-8') as f:
            cached_data = json.load(f)
        
        self.assertEqual(cached_data, result)
    
    def test_cache_expiration(self):
        """Test that cache is used when recent and ignored when expired."""
        # Make a fake cache file with old timestamp
        test_data = {"data": "old_data", "timestamp": time.time()}
        with open(self.cache_file, 'w', encoding='utf-8') as f:
            json.dump(test_data, f)
        
        # Set the file's modify time to be older than cache duration
        old_time = time.time() - 7200  # 2 hours ago (beyond our 1 hour cache)
        os.utime(self.cache_file, (old_time, old_time))
        
        # Define a function with 1 hour cache duration
        @cache_results(str(self.cache_file), 3600)  # 1 hour in seconds
        def func_with_expired_cache():
            return {"data": "new_data", "timestamp": time.time()}
        
        # Call the function, which should ignore the expired cache
        result = func_with_expired_cache()
        
        # Verify we got the new data, not the cached data
        self.assertEqual(result["data"], "new_data")
        
        # Create another function with fresh cache
        @cache_results(str(self.cache_file), 3600)
        def func_with_fresh_cache():
            return {"data": "newer_data", "timestamp": time.time()}
        
        # Call this new function immediately after updating the cache
        result2 = func_with_fresh_cache()
        
        # Verify we got the cached data, not new data
        self.assertEqual(result2["data"], "new_data")
    
    def test_cache_with_args(self):
        """Test that caching works with function arguments."""
        # Define a function that takes arguments
        @cache_results(str(self.cache_file), 3600)
        def func_with_args(a, b, c=None):
            return {"args": (a, b), "c": c, "timestamp": time.time()}
        
        # Call with some arguments
        result = func_with_args(1, 2, c=3)
        
        # Call again with the same arguments (should use cache)
        cached_result = func_with_args(1, 2, c=3)
        
        # Timestamps should be identical if cache was used
        self.assertEqual(result["timestamp"], cached_result["timestamp"])


if __name__ == "__main__":
    unittest.main() 