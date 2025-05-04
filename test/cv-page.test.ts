import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCVStore } from '../stores/cv';

// Instead of importing from pages/cv.vue directly, we'll mock all required components
// and test the store functionality

// Mock the CardComponent
vi.mock('../components/CardComponent.vue', () => ({
  default: {
    template: '<div><slot name="default" /><slot /></div>',
    props: ['title']
  }
}));

// Mock the CV page data structure to test against
describe('CV Data Validation', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  
  it('has valid sections in CV store', () => {
    const cvStore = useCVStore();
    
    // Verify essential sections exist
    expect(cvStore.professionalExperience).toBeDefined();
    expect(cvStore.education).toBeDefined();
    expect(Array.isArray(cvStore.professionalExperience)).toBe(true);
    expect(Array.isArray(cvStore.education)).toBe(true);
    
    // Check for required fields in experience items
    cvStore.professionalExperience.forEach((item: { title: any; organization: any; period: any; }) => {
      expect(item.title).toBeDefined();
      expect(item.organization).toBeDefined();
      expect(item.period).toBeDefined();
    });
    
    // Check for required fields in education items
    interface EducationItem {
      title: string;
      organization: string;
      period: string;
    }

    cvStore.education.forEach((item: EducationItem) => {
      expect(item.title).toBeDefined();
      expect(item.organization).toBeDefined();
      expect(item.period).toBeDefined();
    });
  });
  
  it('has correct formatting for organization link styles', () => {
    const cvStore = useCVStore();
    
    // Verify that links have the required fields
    let allLinks = 0;
    
    // Check professional experience links
    cvStore.professionalExperience.forEach((item) => {
      if (item.links && item.links.length > 0) {
        allLinks += item.links.length;
        item.links.forEach(link => {
          expect(link.name).toBeDefined();
          expect(link.type).toBeDefined();
          expect(link.url).toBeDefined();
          
          // Verify link type is a valid option
          expect(['blog', 'news', 'github', 'website', 'paper']).toContain(link.type);
        });
      }
    });
    
    // Check education links
    cvStore.education.forEach((item: TimelineItem) => {
      if (item.links && item.links.length > 0) {
        allLinks += item.links.length;
        item.links.forEach(link => {
          expect(link.name).toBeDefined();
          expect(link.type).toBeDefined();
          expect(link.url).toBeDefined();
        }); 
      }
    });
    
    // We should have at least some links
    expect(allLinks).toBeGreaterThan(0);
  });
  
  it('has valid GPA information in education items', () => {
    const cvStore = useCVStore();
    let gpaFound = false;
    
    cvStore.education.forEach((item: TimelineItem) => {
      if (item.gpa) {
        gpaFound = true;
        // GPA should be a string
        expect(typeof item.gpa).toBe('string');
        // GPA should not be empty
        expect(item.gpa.trim().length).toBeGreaterThan(0);
      }
    });
    
    // We should have at least one education item with GPA
    expect(gpaFound).toBe(true);
  });
}); 