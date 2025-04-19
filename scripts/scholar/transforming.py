from typing import List, Dict, Any, Optional
from scholar.parsing import clean_title, extract_year, extract_venue, extract_authors, extract_url
from dataclasses import dataclass, asdict, field

@dataclass
class Publication:
    """Publication class that matches the TypeScript interface in publications.ts"""
    title: str
    authors: List[str]  # List of author names
    venue: str
    year: int
    link: str
    citations: Optional[int] = None  # Optional in the TS interface
    award: Optional[str] = None  # Optional in the TS interface
    projectId: Optional[str] = None  # Optional in the TS interface
    categories: List[str] = field(default_factory=list)  # Empty list by default

def cleanup_publication(pub: Dict[str, Any]) -> Publication:
    """Clean up the publication data and format it according to the Pinia store format."""
    # Extract authors as a list
    author_list = extract_authors(pub)
    
    # Create the publication object with the correct format
    cleaned_pub = Publication(
        title=clean_title(pub.get('bib', {}).get('title', '')),
        authors=author_list,  # Keep as a list
        venue=extract_venue(pub),
        year=extract_year(pub) or 0,  # Ensure we have a year (required field)
        link=extract_url(pub),
        citations=pub.get('num_citations', None),
        categories=[]  # Empty list initially, to be filled manually later
    )
    
    print(f"Formatting publication: {cleaned_pub.title}, Year: {cleaned_pub.year}, Citations: {cleaned_pub.citations}")
    # If the url is Github, set the venue to "GitHub"
    if cleaned_pub.link.startswith('https://github.com/') or cleaned_pub.venue.startswith('Available online: github'):
        cleaned_pub.venue = "GitHub"
    # If the url is arxiv, set the venue to "arXiv"
    if cleaned_pub.link.startswith('https://arxiv.org/'):
        cleaned_pub.venue = "arXiv"
    if cleaned_pub.link.startswith('https://www.tdcommons'):
        cleaned_pub.venue = "TDCommons"
    # If the link starts with https://patents.google.com/, set the venue to "US Patent"
    if cleaned_pub.link.startswith('https://patents.google.com/'):
        cleaned_pub.venue = "US Patent"
    # If the link starts with https://search.proquest.com/, set the venue to "Thesis"
    if cleaned_pub.link.startswith('https://search.proquest.com/'):
        cleaned_pub.venue = "Thesis"
    # Special handling for papers with very many authors
    if cleaned_pub.title.startswith('Gemini 1.5: Unlocking'):
        if len(cleaned_pub.authors) > 5:
            cleaned_pub.authors = cleaned_pub.authors[:5]  # Keep first 5 authors
            cleaned_pub.authors.append("et al. (606 authors)")  # Add "et al." as the last element
            cleaned_pub.venue = "arXiv"
    return cleaned_pub

def transform_to_pinia_format(publications: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Transform Google Scholar data to format compatible with Pinia store."""
    transformed_pubs = []

    for pub in publications:
        if 'bib' not in pub:
            print(f"Skipping publication without 'bib': {pub}")
            continue
        
        year = extract_year(pub)
        if not year:
            print(f"Skipping publication without year: {pub.get('bib', {}).get('title', 'Unknown')}")
            continue  # Skip publications without a year
        
        try:
            transformed_pub = cleanup_publication(pub)
            transformed_pubs.append(asdict(transformed_pub))
        except Exception as e:
            print(f"Error processing publication: {e}")
            continue

    # Sort by year (newest first)
    transformed_pubs.sort(key=lambda x: x['year'], reverse=True)

    return transformed_pubs