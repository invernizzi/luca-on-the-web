import unittest
import sys
import os
from pathlib import Path

# Add the parent directory to the Python path so we can import the scholar module
sys.path.insert(0, str(Path(__file__).parent.parent))

from scholar.parsing import clean_title, extract_year, extract_venue, extract_authors


class TestParsing(unittest.TestCase):
    """Test cases for the scholar.parsing module."""

    def test_clean_title(self):
        """Test that title cleaning removes extra whitespace and special characters."""
        # Test with extra whitespace
        self.assertEqual(clean_title("  Title  with    spaces  "), "Title with spaces")
        
        # Test with newlines and tabs
        self.assertEqual(clean_title("Title\nwith\ttabs"), "Title with tabs")
        
        # Test with empty string
        self.assertEqual(clean_title(""), "")
        
        # Test with None (should raise TypeError)
        with self.assertRaises(TypeError):
            clean_title(None)

    def test_extract_year(self):
        """Test extracting year from publication data."""
        # Test with year in pub_year field
        pub_with_year = {"bib": {"pub_year": "2020"}}
        self.assertEqual(extract_year(pub_with_year), 2020)
        
        # Test with non-numeric year
        pub_with_invalid_year = {"bib": {"pub_year": "not a year"}}
        self.assertIsNone(extract_year(pub_with_invalid_year))
        
        # Test with year in citation
        pub_with_citation = {"bib": {"citation": "Author, Journal, 2021, pp. 123-145"}}
        self.assertEqual(extract_year(pub_with_citation), 2021)
        
        # Test with no year information
        pub_without_year = {"bib": {}}
        self.assertIsNone(extract_year(pub_without_year))
        
        # Test with missing bib field
        pub_without_bib = {}
        self.assertIsNone(extract_year(pub_without_bib))

    def test_extract_venue(self):
        """Test extracting venue from publication data."""
        # Test with journal field
        pub_with_journal = {"bib": {"journal": "Nature"}}
        self.assertEqual(extract_venue(pub_with_journal), "Nature")
        
        # Test with conference field
        pub_with_conference = {"bib": {"conference": "USENIX Security"}}
        self.assertEqual(extract_venue(pub_with_conference), "USENIX Security")
        
        # Test with citation field
        pub_with_citation = {"bib": {"citation": "Author et al., IEEE Conference, 2020"}}
        self.assertEqual(extract_venue(pub_with_citation), "IEEE Conference")

        # Test with citation field
        pub_with_citation = {"bib": {"citation": " Proceedings of the 2024 ACM on Internet Measurement Conference, 704-712, 2024"}}
        self.assertEqual(extract_venue(pub_with_citation), "ACM on Internet Measurement Conference")
        

        # Test with no venue information
        pub_without_venue = {"bib": {}}
        self.assertEqual(extract_venue(pub_without_venue), "Unknown Venue")
        
        # Test with missing bib field
        pub_without_bib = {}
        self.assertEqual(extract_venue(pub_without_bib), "Unknown Venue")

    def test_extract_authors(self):
        """Test extracting authors from publication data."""
          # Test with author field
        pub_with_authors = {"bib": {"author": "Invernizzi, Luca and Doe, John"}}
        self.assertEqual(extract_authors(pub_with_authors), ["Luca Invernizzi", "John Doe"])
        
        # Test with author field shortened to first initials
        pub_with_authors = {"bib": {"author": "Invernizzi, L and Doe, J"}}
        self.assertEqual(extract_authors(pub_with_authors), ["Luca Invernizzi", "John Doe"])

        # Test with author field using ;
        pub_with_authors = {"bib": {"author": "Invernizzi, L; Doe, J"}}
        self.assertEqual(extract_authors(pub_with_authors), ["Luca Invernizzi", "John Doe"])
         
        # Test with author field
        pub_with_authors = {"bib": {"author": "Luca Invernizzi and John Doe"}}
        self.assertEqual(extract_authors(pub_with_authors), ["Luca Invernizzi", "John Doe"])

        # Test with empty author field
        pub_with_empty_authors = {"bib": {"author": ""}}
        self.assertEqual(extract_authors(pub_with_empty_authors), [])
        
        # Test with no author field
        pub_without_authors = {"bib": {}}
        self.assertEqual(extract_authors(pub_without_authors), [])
        
        # Test with missing bib field
        pub_without_bib = {}
        self.assertEqual(extract_authors(pub_without_bib), [])


if __name__ == "__main__":
    unittest.main()