// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import fs from 'node:fs';
import { glob } from 'glob';
import { compile } from 'tailwindcss';
import { parse as parseSfc, compileTemplate, babelParse, walk } from 'vue/compiler-sfc';

/**
 * Guards the design-system contract declared in assets/css/main.css.
 *
 * Tailwind v4 only generates utilities for tokens registered in `@theme`, and it
 * silently drops any class it cannot resolve. A token that is renamed, removed or
 * never registered therefore ships *invisible* styling instead of a build error
 * (this happened: cards rendered transparent and all text pure white for months).
 * These tests compile the real stylesheet and assert that every token utility
 * referenced from a Vue component produces a CSS rule.
 */

const projectRoot = resolve(__dirname, '..');
const mainCssPath = resolve(projectRoot, 'assets/css/main.css');
const require = createRequire(import.meta.url);

/** Colour tokens (`--color-<token>`) that `@theme` must declare. */
const COLOR_TOKENS = ['background', 'surface', 'surface-light', 'text-primary', 'text-secondary'];
/** Font tokens (`--font-<token>`) and the brand family each must resolve to. */
const FONT_FAMILIES: Record<string, string> = { sans: 'Manrope', display: 'General Sans' };

// --- Stylesheet compilation ---------------------------------------------------

type LoadStylesheet = NonNullable<Parameters<typeof compile>[1]>['loadStylesheet'];

/** Resolves `@import`s like the Vite plugin does, minus Nuxt UI's build-time virtual CSS. */
const loadStylesheet: LoadStylesheet = async (id, base) => {
  if (id === '@nuxt/ui') {
    // Assembled by Nuxt from `#build/ui.css`; it defines no token of ours.
    return { path: id, base, content: '' };
  }
  const path = id.startsWith('.')
    ? resolve(base, id)
    : require.resolve(id === 'tailwindcss' ? 'tailwindcss/index.css' : id);
  return { path, base: dirname(path), content: fs.readFileSync(path, 'utf8') };
};

const buildCss = async (candidates: string[]): Promise<string> => {
  const compiler = await compile(fs.readFileSync(mainCssPath, 'utf8'), {
    base: dirname(mainCssPath),
    loadStylesheet,
  });
  return compiler.build(candidates);
};

/** Mirrors `CSS.escape()` for the class names Tailwind emits (no DOM in this environment). */
const cssEscape = (value: string): string =>
  Array.from(value, (char, index) => {
    const leadingDigit = index === 0 && /\d/.test(char);
    if (leadingDigit) return `\\3${char} `;
    return /[a-zA-Z0-9_-]/.test(char) ? char : `\\${char}`;
  }).join('');

// --- Candidate extraction from Vue SFCs ---------------------------------------

type BabelParserOptions = NonNullable<Parameters<typeof babelParse>[1]>;

/** Whitespace-separated words of every string literal in a JS/TS module. */
const stringLiteralWords = (code: string, options: BabelParserOptions = {}): string[] => {
  const words: string[] = [];
  walk(babelParse(code, { sourceType: 'module', ...options }), {
    enter(node: { type: string; value?: unknown }) {
      if (node.type === 'StringLiteral' && typeof node.value === 'string') {
        words.push(...node.value.split(/\s+/).filter(Boolean));
      }
    },
  });
  return words;
};

/**
 * Class candidates of a single-file component: static `class` attributes and
 * `:class` bindings end up as string literals in the compiled render function;
 * `<script>` blocks are parsed directly for class strings built in code.
 */
const sfcClassCandidates = (filename: string): string[] => {
  const { descriptor } = parseSfc(fs.readFileSync(filename, 'utf8'), { filename });
  const candidates: string[] = [];

  if (descriptor.template) {
    const { code } = compileTemplate({
      source: descriptor.template.content,
      filename,
      id: filename,
      // Keep every class as a string literal (no static-tree stringification).
      compilerOptions: { hoistStatic: false },
    });
    candidates.push(...stringLiteralWords(code));
  }
  for (const block of [descriptor.script, descriptor.scriptSetup]) {
    if (block) candidates.push(...stringLiteralWords(block.content, { plugins: ['typescript'] }));
  }
  return candidates;
};

/** Strips variants (`hover:`), the important marker (`!`) and the opacity modifier (`/50`). */
const utilityOf = (candidate: string): string =>
  (candidate.split(':').pop() ?? candidate).replace(/^!/, '').split('/')[0] ?? candidate;

const referencesDesignToken = (candidate: string): boolean => {
  const utility = utilityOf(candidate);
  return (
    COLOR_TOKENS.some((token) => utility.endsWith(`-${token}`)) ||
    Object.keys(FONT_FAMILIES).some((token) => utility === `font-${token}`)
  );
};

const designTokenCandidates = (): string[] => {
  const files = glob.sync([
    resolve(projectRoot, 'app.vue'),
    resolve(projectRoot, '{components,layouts,pages}/**/*.vue'),
  ]);
  const candidates = new Set(files.flatMap(sfcClassCandidates).filter(referencesDesignToken));
  return [...candidates].sort();
};

// --- Tests --------------------------------------------------------------------

describe('Design tokens (assets/css/main.css @theme)', () => {
  it('compiles every token utility used by a component into a CSS rule', async () => {
    const candidates = designTokenCandidates();
    // Sanity check that the scanner sees the templates at all.
    expect(candidates).toEqual(expect.arrayContaining(['bg-surface/95', 'text-text-secondary', 'font-display']));

    const css = await buildCss(candidates);
    const unresolved = candidates.filter((candidate) => !css.includes(`.${cssEscape(candidate)}`));

    expect(unresolved).toEqual([]);
  });

  it('always emits the colour tokens as CSS variables for hand-written styles', async () => {
    const css = await buildCss([]);
    for (const token of COLOR_TOKENS) {
      expect(css).toContain(`--color-${token}:`);
    }
  });

  it('maps the font tokens to the brand families so @nuxt/fonts can self-host them', async () => {
    const css = await buildCss(Object.keys(FONT_FAMILIES).map((token) => `font-${token}`));
    for (const [token, family] of Object.entries(FONT_FAMILIES)) {
      expect(css).toContain(`--font-${token}: "${family}"`);
    }
  });
});
