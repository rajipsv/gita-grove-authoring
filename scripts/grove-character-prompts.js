#!/usr/bin/env node
/**
 * Print character sheet prompts from assets/characters/manifest.json
 * and location style prompts from assets/style/manifest.json.
 */

const fs = require('fs');
const path = require('path');
const { loadStyleManifest } = require('./lib/grove-style');

const ROOT = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT, 'assets', 'characters', 'manifest.json');

function main() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('Missing', MANIFEST_PATH);
    process.exit(1);
  }
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const suffix = manifest.sheetPromptSuffix || '';
  const styleManifest = loadStyleManifest();

  console.log('=== Style references (per location) ===');
  console.log('Manifest:', manifest.styleManifest || 'assets/style/manifest.json');
  console.log('Prompts doc:', styleManifest.promptsDoc || 'assets/style/STYLE-SHEET-PROMPTS.md');
  console.log('');
  for (const loc of styleManifest.locations || []) {
    console.log(`--- ${loc.name} ---`);
    console.log('Save as:', loc.file);
    console.log('Status:', loc.status || 'pending');
    if (loc.lighting) console.log('Lighting:', loc.lighting);
    console.log(loc.sheetPrompt || '');
    console.log('');
  }
  if (styleManifest.seriesFallback) {
    console.log('Series fallback:', styleManifest.seriesFallback);
    console.log('');
  }

  for (const c of manifest.characters || []) {
    console.log(`=== ${c.name} (${c.id}) ===`);
    console.log('Save as:', c.primaryRef);
    console.log('Status:', c.status || 'pending');
    const full = [c.sheetPrompt, suffix].filter(Boolean).join(' ');
    console.log(full);
    console.log('');
  }

  console.log('Character prompts doc:', manifest.promptsDoc || 'assets/characters/CHARACTER-SHEET-PROMPTS.md');
}

main();
