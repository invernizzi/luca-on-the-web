#!/usr/bin/env python3
"""
Google Scholar Publication Downloader

This script downloads publications from Google Scholar for a specific author
and exports them as JSON for use with a Pinia store.

Usage:
    python scholar_sync.py [--output OUTPUT]
"""

import argparse
import json
import sys
import re
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any, Optional
import functools

try:
    from scholarly import scholarly
    from tqdm import tqdm
except ImportError:
    print("Required packages not installed. Run: uv pip install scholarly tqdm jsonschema")
    sys.exit(1)

from scholar.caching import cache_results
from scholar.parsing import clean_title, extract_year, extract_venue, extract_authors
from scholar.fetching import fetch_publications
from scholar.transforming import transform_to_pinia_format

AUTHOR_ID = '4CEVnEMAAAAJ'  # Luca Invernizzi
DEFAULT_OUTPUT = '../assets/scholar_publications.json'


def main():
    """Main function to execute the script."""
    parser = argparse.ArgumentParser(description='Download publications from Google Scholar')
    parser.add_argument('--output', type=str, default=DEFAULT_OUTPUT, 
                        help=f'Output JSON file path (default: {DEFAULT_OUTPUT})')
    args = parser.parse_args()
    
    output_path = Path(args.output)
    
    # Fetch publications from Google Scholar
    publications = fetch_publications()
    
    if not publications:
        print("No publications found.")
        return
    
    # Transform to Pinia-compatible format
    transformed_pubs = transform_to_pinia_format(publications)
    
    # Create the output structure that directly matches the publications store state
    # The publications store expects just an array of publications, not a wrapper object
    output_data = transformed_pubs
    
    if not output_data or len(output_data) < 30:
        print("No valid publications found after transformation.")
        return
    # Write to JSON file.
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
    
    print(f"Successfully exported {len(transformed_pubs)} publications to {output_path}")



if __name__ == "__main__":
    main()