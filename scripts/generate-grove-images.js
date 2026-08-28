#!/usr/bin/env node
/**
 * Print image-generation briefs from *.story.json + asset manifests.
 * Does not call an image API — paste prompts into Midjourney, Leonardo, etc.
 */

const fs = require('fs');
const path = require('path');
const { loadAdventure, findManuscriptById, loadCurriculumEntry } = require('./lib/grove-manuscript');
const { loadCharacterManifest, resolveStyleRefForAdventure, resolveStyleRefForLocation } = require('./lib/grove-style');

const ROOT = path.resolve(__dirname, '..');

function loadManifest() {
  return loadCharacterManifest();
}

function parseArgs(argv) {
  const out = { id: null, all: false, location: null };
  for (const arg of argv) {
    if (arg === '--all') out.all = true;
    else if (arg.startsWith('--id=')) out.id = arg.slice('--id='.length);
    else if (arg.startsWith('--location=')) out.location = arg.slice('--location='.length);
  }
  return out;
}

function refsForPrompt(manifest) {
  return (manifest.characters || []).filter((c) => {
    const p = path.join(ROOT, c.primaryRef);
    return c.status === 'approved' && fs.existsSync(p);
  });
}

function buildFullPrompt(page, adventure, manifest) {
  const suffix = adventure.storyDefaults?.styleSuffix || manifest.styleSuffixBase || '';
  return [page.imagePrompt, suffix].filter(Boolean).join(', ');
}

function printBrief(adventure, manifest, opts = {}) {
  const refs = refsForPrompt(manifest);
  const curriculum = loadCurriculumEntry(adventure.adventureId);
  const locationName = opts.location || curriculum?.location;
  const style = opts.location
    ? resolveStyleRefForLocation(opts.location)
    : resolveStyleRefForAdventure(adventure.adventureId);

  console.log(`\n=== ${adventure.adventureId} ===`);
  console.log('Story JSON:', adventure.storyPath || '(none)');
  if (locationName) console.log('Location:', locationName);
  if (style) {
    const label = style.exists ? style.file : `${style.file} (missing)`;
    console.log('Style ref:', label);
    if (style.lighting) console.log('  lighting:', style.lighting);
  } else {
    console.log('Style ref: (none — add assets/style/manifest.json)');
  }
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
    console.error('       node scripts/generate-grove-images.js --id=gv01_a1 --location="Courage Hill"');
    process.exit(1);
  }

  for (const id of ids) {
    const mdPath = findManuscriptById(id);
    if (!mdPath) {
      console.error('No manuscript for', id);
      process.exit(1);
    }
    const adventure = loadAdventure(mdPath);
    printBrief(adventure, manifest, opts);
  }
}

main();
