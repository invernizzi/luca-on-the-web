from typing import List, Dict, Any
from pathlib import Path
import time
import json
from scholarly import scholarly
from tqdm import tqdm
from scholar.caching import cache_results

AUTHOR_ID = '4CEVnEMAAAAJ'  # Luca Invernizzi

@cache_results(".scholar_publications_cache.json", 86400)
def fetch_publications() -> List[Dict[str, Any]]:
    """Fetch all publications for the specified author."""
    print(f"Searching for author ID: {AUTHOR_ID}")

    try:
        # Search for the author by ID
        author = scholarly.search_author_id(AUTHOR_ID)

        # Fill in all available author information
        author = scholarly.fill(author)

        # Print some basic information
        print(f"Found author: {author['name']}")
        print(f"Total publications: {len(author['publications'])}")

        # Get complete information for each publication
        publications = []

        print("Fetching detailed publication information...")
        for pub in tqdm(author['publications']):
            try:
                # Fill in the publication details
                pub_filled = scholarly.fill(pub)
                publications.append(pub_filled)
            except Exception as e:
                print(f"Error fetching details for publication: {e}")
                # Add the incomplete publication data
                publications.append(pub)

        return publications

    except Exception as e:
        print(f"Error fetching publications: {e}")
        return []