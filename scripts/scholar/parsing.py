import re
from typing import Dict, Any, Optional


AUTHORS = {
    "Invernizzi, L": "Luca Invernizzi",
    "Invernizzi, Luca": "Luca Invernizzi",
    "Doe, John": "John Doe",
    "Doe, J": "John Doe",

    
}

def clean_title(title: str) -> str:
    """Clean up title text by removing extra whitespace and special characters."""
    return re.sub(r'\s+', ' ', title).strip()

def extract_year(pub: Dict[str, Any]) -> Optional[int]:
    """Extract year from publication data."""
    if 'bib' in pub and 'pub_year' in pub['bib']:
        try:
            return int(pub['bib']['pub_year'])
        except (ValueError, TypeError):
            pass

    # Try to extract year from the citation
    if 'bib' in pub and 'citation' in pub['bib']:
        year_match = re.search(r'20\d\d|19\d\d', pub['bib']['citation'])
        if year_match:
            return int(year_match.group(0))

    return None

def extract_url(pub: Dict[str, Any]) -> str:
    """Extract URL from publication data."""
    bib = pub.get('bib', {})
    print(f"Extracting URL from citation: {bib}")
    if 'http' in bib.get('citation', ''):
        
        # Extract URL from citation
        url_match = re.search(r'(https?://[^\s]+)', bib['citation'])
        if url_match:
            return url_match.group(0).strip(',')
    if url:= pub.get('pub_url'):
        return url
    return None

def extract_venue(pub: Dict[str, Any]) -> str:
    """Extract venue information from publication."""
    def clean_venue(venue: str) -> str:
        """Clean up venue text by removing extra whitespac and commas."""
        return re.sub(r'\s+|,|;', ' ', venue).strip()
    if 'bib' in pub and 'journal' in pub['bib'] and pub['bib']['journal']:
        return clean_venue(pub['bib']['journal'])
    if 'bib' in pub and 'conference' in pub['bib'] and pub['bib']['conference']:
        return clean_venue(pub['bib']['conference'])
    if 'bib' in pub and 'citation' in pub['bib']:
        # Try to extract venue from citation
        citation = pub['bib']['citation']
        # Remove the initial portion of the citation.
        citation = re.sub(r'\s*Proceedings of (the )?(20\d\d)?\s+', '', citation)
        # Fix spelling
        citation = re.sub(r'ACM on', 'ACM', citation)
        # Remove page numbers
        citation = re.sub(r',\s*\d+-\d+\s*,', '', citation)
        print(f"Citation: {citation}")
        # Remove the year and everything after it
        year_match = re.search(r'(20\d\d|19\d\d)', citation)
        if year_match:
            parts = citation.split(year_match.group(0), 1)
            if len(parts) > 0:
                venue = parts[0].strip()
                # Remove author information (assuming it ends with a comma)
                if ',' in venue:
                    venue = venue.split(',', 1)[1].strip()
        venue = clean_venue(venue)
        print(f"Extracted venue: {venue}")
        return venue
    return "Unknown Venue"

def extract_authors(pub: Dict[str, Any]) -> [str]:
    """Extract and format authors list."""
    def clean_author(author: str) -> str:
        """Clean up author names by removing extra whitespace and special characters."""
        author = re.sub(r'\s+', ' ', author).strip()
        author = AUTHORS.get(author, author)  # Replace with full name if available

        return author
    
    
    if 'bib' in pub and 'author' in pub['bib']:
        authors = pub['bib']['author']
        # Clean up author names
        authors = re.split(r'\s+and\s+|;', authors)
        authors = [clean_author(author) for author in authors]
        # Remove empty strings
        authors = [author for author in authors if author]
        return authors
    return []
