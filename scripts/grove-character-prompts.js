#!/usr/bin/env node
/**
 * Print character sheet prompts from assets/characters/manifest.json.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT, 'assets', 'characters', 'manifest.json');

function main() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('Missing', MANIFEST_PATH);
    process.exit(1);
  }
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const suffix = manifest.sheetPromptSuffix || '';

  if (manifest.styleSheetPrompt) {
    console.log('=== Style reference ===');
    console.log('Save as:', manifest.styleRef);
    console.log(manifest.styleSheetPrompt);
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

  console.log('Full doc:', manifest.promptsDoc || 'assets/characters/CHARACTER-SHEET-PROMPTS.md');
}

main();
