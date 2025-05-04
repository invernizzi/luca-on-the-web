import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCVStore } from '../stores/cv';

// Function to validate URL format
function isValidUrl(url: string): boolean {
  try {
    // For internal routes that don't have protocol
    if (url.startsWith('/') || !url.includes('://')) {
      // Validate internal links format
      return !url.includes(' ') && url.length > 0;
    }
    
    // For external URLs, use URL constructor
    new URL(url);
    return true;
  } catch (e) {
    console.error('Invalid URL:', url, e);
    return false;
  }
}

describe('CV Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  
  it('has valid structure with required sections', () => {
    const cvStore = useCVStore();
    
    // Check for required sections
    expect(cvStore.title).toBeDefined();
    expect(Array.isArray(cvStore.professionalExperience)).toBe(true);
    expect(Array.isArray(cvStore.education)).toBe(true);
    
    // Professional experience should have items
    expect(cvStore.professionalExperience.length).toBeGreaterThan(0);
    
    // Education should have items
    expect(cvStore.education.length).toBeGreaterThan(0);
  });
  
  it('has correctly formatted timeline items', () => {
    const cvStore = useCVStore();
    
    // Check professional experience items
    cvStore.professionalExperience.forEach(item => {
      expect(item.title).toBeDefined();
      expect(typeof item.title).toBe('string');
      expect(item.organization).toBeDefined();
      expect(typeof item.organization).toBe('string');
      expect(item.period).toBeDefined();
      expect(typeof item.period).toBe('string');
    });
    
    // Check education items
    cvStore.education.forEach(item => {
      expect(item.title).toBeDefined();
      expect(typeof item.title).toBe('string');
      expect(item.organization).toBeDefined();
      expect(typeof item.organization).toBe('string');
      expect(item.period).toBeDefined();
      expect(typeof item.period).toBe('string');
    });
  });
  
  it('has valid links in all timeline items', () => {
    const cvStore = useCVStore();
    const invalidLinks: Array<{section: string, item: string, url: string}> = [];
    
    // Check professional experience links
    cvStore.professionalExperience.forEach(item => {
      if (item.links && item.links.length > 0) {
        item.links.forEach((link: any) => {
          if (!isValidUrl(link.url)) {
            invalidLinks.push({
              section: 'Professional Experience',
              item: item.title,
              url: link.url
            });
          }
        });
      }
    });
    
    // Check education links
    cvStore.education.forEach(item => {
      if (item.links && item.links.length > 0) {
        item.links.forEach((link: any) => {
          if (!isValidUrl(link.url)) {
            invalidLinks.push({
              section: 'Education',
              item: item.title,
              url: link.url
            });
          }
        });
      }
    });
    
    // Check open source links if they exist
    if (cvStore.openSourceContributions) {
      cvStore.openSourceContributions.forEach(item => {
        if (item.links && item.links.length > 0) {
          item.links.forEach((link: any) => {
            if (!isValidUrl(link.url)) {
              invalidLinks.push({
                section: 'Open Source',
                item: item.title,
                url: link.url
              });
            }
          });
        }
      });
    }
    
    // Should have no invalid links
    if (invalidLinks.length > 0) {
      console.error('Invalid links found:', invalidLinks);
    }
    expect(invalidLinks.length).toBe(0);
  });

  it('has valid link types throughout the CV', () => {
    const cvStore = useCVStore();
    const validLinkTypes = ['blog', 'news', 'github', 'website', 'paper'];
    const invalidLinkTypes: Array<{section: string, item: string, type: string}> = [];
    
    // Check all sections for link types
    const checkLinks = (section: string, item: any) => {
      if (item.links && item.links.length > 0) {
        item.links.forEach((link: any) => {
          if (!validLinkTypes.includes(link.type)) {
            invalidLinkTypes.push({
              section,
              item: item.title,
              type: link.type
            });
          }
        });
      }
    };
    
    // Check professional experience
    cvStore.professionalExperience.forEach(item => {
      checkLinks('Professional Experience', item);
    });
    
    // Check education
    cvStore.education.forEach(item => {
      checkLinks('Education', item);
    });
    
    // Check open source
    if (cvStore.openSourceContributions) {
      cvStore.openSourceContributions.forEach(item => {
        checkLinks('Open Source', item);
      });
    }
    
    // Should have no invalid link types
    if (invalidLinkTypes.length > 0) {
      console.error('Invalid link types found:', invalidLinkTypes);
    }
    expect(invalidLinkTypes.length).toBe(0);
  });
}); 