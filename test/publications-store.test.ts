import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePublicationsStore, PublicationCategory } from '../stores/publications';
import { ProjectId } from '../stores/projects';

describe('Publications Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('merges TypeSeg metadata including Spotlight Talk', () => {
    const publicationsStore = usePublicationsStore();

    const typeSeg = publicationsStore.recentPublications.find(
      (pub) => pub.title === 'TypeSeg: Content-Type Segmentation for Mixed Text'
    );

    expect(typeSeg).toBeDefined();
    expect(typeSeg?.award).toBe('Spotlight Talk');
    expect(typeSeg?.projectId).toBe(ProjectId.MAGIKA);
    expect(typeSeg?.categories).toEqual([
      PublicationCategory.MACHINE_LEARNING,
      PublicationCategory.SECURITY,
    ]);

    const legacyTypeMap = publicationsStore.recentPublications.find((pub) =>
      pub.title.toLowerCase().includes('typemap')
    );
    expect(legacyTypeMap).toBeUndefined();
  });

  it('merges Nazca metadata including UCSB Computer Science Outstanding Publication Award', () => {
    const publicationsStore = usePublicationsStore();

    const nazca = publicationsStore.recentPublications.find((pub) =>
      pub.title.startsWith('Nazca: Detecting Malware Distribution')
    );

    expect(nazca).toBeDefined();
    expect(nazca?.award).toBe(
      'UCSB Computer Science Outstanding Publication Award'
    );
    expect(nazca?.categories).toEqual([PublicationCategory.SECURITY]);
  });
});
