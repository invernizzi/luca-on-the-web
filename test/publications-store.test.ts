import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
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

  it('merges From Payload to Plugin metadata including Distinguished Paper Award and PDF link', () => {
    const publicationsStore = usePublicationsStore();

    const payloadToPlugin = publicationsStore.recentPublications.find(
      (pub) =>
        pub.title ===
        'From Payload to Plugin: Web-Scale Ecosystem Attribution of JavaScript Injection Campaigns'
    );

    expect(payloadToPlugin).toBeDefined();
    expect(payloadToPlugin?.award).toBe('Distinguished Paper Award');
    expect(payloadToPlugin?.link).toBe(
      'https://sites.cs.ucsb.edu/~chris/research/doc/ccs26_plugin.pdf'
    );
    expect(payloadToPlugin?.categories).toEqual([PublicationCategory.SECURITY]);
  });

  it('classifies every academic publication with at least one category tag', () => {
    const publicationsStore = usePublicationsStore();

    const unclassified = publicationsStore.recentPublications.filter(
      (pub) => !pub.openSource && (!pub.categories || pub.categories.length === 0)
    );

    expect(unclassified.map((p) => p.title)).toEqual([]);
  });

  it('includes Magika and Getting Things GNOME! (GTG) in open source entries', () => {
    const publicationsStore = usePublicationsStore();
    const ossTitles = publicationsStore.recentPublications
      .filter((pub) => pub.openSource)
      .map((pub) => pub.title);

    expect(ossTitles).toEqual(expect.arrayContaining(['Magika', 'Getting Things GNOME! (GTG)']));
  });

  it('points every local pdf path to an existing PDF file in public/', () => {
    const publicationsStore = usePublicationsStore();
    const publicDir = path.resolve(__dirname, '../public');
    const withPdf = publicationsStore.recentPublications.filter((p) => Boolean(p.pdf));

    expect(withPdf.length).toBeGreaterThanOrEqual(30);

    for (const pub of withPdf) {
      const fullPath = path.join(publicDir, pub.pdf!.replace(/^\//, ''));
      expect(fs.existsSync(fullPath), `Missing PDF for "${pub.title}": ${fullPath}`).toBe(true);
      const header = fs.readFileSync(fullPath).subarray(0, 5).toString('ascii');
      expect(header, `Invalid PDF header for "${pub.title}"`).toBe('%PDF-');
    }
  });
});
