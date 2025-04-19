import { describe, it, expect } from 'vitest';
import { resolve } from 'path';
import fs from 'fs';
import { glob } from 'glob';
import { JSDOM } from 'jsdom';

// Helper function to extract all NuxtLink elements with external targets
const extractExternalLinks = (htmlContent: string) => {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  const links: NodeListOf<HTMLLinkElement> = document.querySelectorAll('a[target="_blank"]');
  return Array.from(links).map((link) => link.href);
};

describe('Validate NuxtLink external targets', () => {
  it('should ensure all external links are valid', async () => {
    const vueFiles = glob.sync(resolve(__dirname, '../**/*.vue'));
    const invalidLinks = [];

    for (const file of vueFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const externalLinks = extractExternalLinks(content);

      for (const link of externalLinks) {
        try {
          const response = await fetch(link, { method: 'HEAD' });
          if (!response.ok) {
            invalidLinks.push({ file, link, status: response.status });
          }
        } catch (error: {message: string} | any) {
         {
          invalidLinks.push({ file, link, error: error?.message });
        }
      }
    }

    expect(invalidLinks).toEqual([]);
  }});
  
});