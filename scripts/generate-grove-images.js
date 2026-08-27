#!/usr/bin/env node
/**
 * Print image-generation briefs from *.story.json + assets/characters/manifest.json.
 * Does not call an image API — paste prompts into Midjourney, Leonardo, etc.
 */

const fs = require('fs');
const path = require('path');
const { loadAdventure, findManuscriptById } = require('./lib/grove-manuscript');

const ROOT = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT, 'assets', 'characters', 'manifest.json');

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.warn('No manifest at', MANIFEST_PATH);
    return { characters: [], styleRef: null, styleSuffixBase: '' };
  }
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
}

function parseArgs(argv) {
  const out = { id: null, all: false };
  for (const arg of argv) {
    if (arg === '--all') out.all = true;
    else if (arg.startsWith('--id=')) out.id = arg.slice('--id='.length);
  }
  return out;
}

function refsForPrompt(manifest) {
  const approved = (manifest.characters || []).filter((c) => {
    const p = path.join(ROOT, c.primaryRef);
    return c.status === 'approved' && fs.existsSync(p);
  });
  return approved;
}

function buildFullPrompt(page, adventure, manifest) {
  const suffix = adventure.storyDefaults?.styleSuffix || manifest.styleSuffixBase || '';
  return [page.imagePrompt, suffix].filter(Boolean).join(', ');
}

function printBrief(adventure, manifest) {
  const refs = refsForPrompt(manifest);
  const stylePath = manifest.styleRef ? path.join(ROOT, manifest.styleRef) : null;
  const styleExists = stylePath && fs.existsSync(stylePath);

  console.log(`\n=== ${adventure.adventureId} ===`);
  console.log('Story JSON:', adventure.storyPath || '(none)');
  console.log('Style ref:', styleExists ? manifest.styleRef : `${manifest.styleRef || '(none)'} (missing)`);
  if (refs.length) {
    console.log('Character refs (approved):');
    for (const c of refs) console.log(`  - ${c.id}: ${c.primaryRef}`);
  } else {
    console.log('Character refs: none approved yet — add reference-sheet.png and set status approved in manifest');
    for (const c of manifest.characters || []) {
      if (c.role === 'core') console.log(`  pending: ${c.primaryRef}`);
    }
  }

  const pages = adventure.storyPages || [];
  pages.forEach((page, i) => {
    console.log(`\n--- Page ${i + 1} (${page.beat || 'beat'}) ---`);
    console.log(buildFullPrompt(page, adventure, manifest));
  });

  console.log(`\nOutput folder (when saving): output/images/${adventure.adventureId}/page-{n}.png`);
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const manifest = loadManifest();

  let ids = [];
  if (opts.all) {
    const booksDir = path.join(ROOT, 'docs', 'books');
    ids = fs
      .readdirSync(booksDir)
      .filter((f) => /^gv\d+_a\d+-.+\.story\.json$/.test(f))
      .map((f) => f.match(/^(gv\d+_a\d+)/)[1]);
  } else if (opts.id) {
    ids = [opts.id];
  } else {
    console.error('Usage: node scripts/generate-grove-images.js --id=gv01_a1');
    console.error('       node scripts/generate-grove-images.js --all');
    process.exit(1);
  }

  for (const id of ids) {
    const mdPath = findManuscriptById(id);
    if (!mdPath) {
      console.error('No manuscript for', id);
      process.exit(1);
    }
    const adventure = loadAdventure(mdPath);
    printBrief(adventure, manifest);
  }
}

main();
