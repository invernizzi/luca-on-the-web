import unittest
from scholar.transforming import cleanup_publication, transform_to_pinia_format

class TestTransforming(unittest.TestCase):

    def test_cleanup_publication(self):
        pub = {
            'bib': {
                'title': 'Sample Title'
            },
            'pub_url': 'http://example.com',
            'num_citations': 10
        }
        cleaned_pub = cleanup_publication(pub)
        self.assertEqual(cleaned_pub.title, 'Sample Title')
        self.assertEqual(cleaned_pub.link, 'http://example.com')
        self.assertEqual(cleaned_pub.citations, 10)

    def test_transform_to_pinia_format(self):
        publications = [
            {
                'bib': {
                    'title': 'Sample Title',
                    "pub_year": "2023",
                },
                'pub_url': 'http://example.com',
                'num_citations': 10,
                'author_pub_id': '123',
            }
        ]
        transformed = transform_to_pinia_format(publications)
      
        self.assertEqual(len(transformed), 1)
        self.assertEqual(transformed[0]['title'], 'Sample Title')
        self.assertEqual(transformed[0]['link'], 'http://example.com')
        self.assertEqual(transformed[0]['citations'], 10)

if __name__ == '__main__':
    unittest.main()