const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const STYLE_MANIFEST_PATH = path.join(ROOT, 'assets', 'style', 'manifest.json');
const CHARACTER_MANIFEST_PATH = path.join(ROOT, 'assets', 'characters', 'manifest.json');

function loadStyleManifest() {
  if (!fs.existsSync(STYLE_MANIFEST_PATH)) {
    return { locations: [], seriesFallback: null, defaultLocation: 'Blossom Meadow' };
  }
  return JSON.parse(fs.readFileSync(STYLE_MANIFEST_PATH, 'utf8'));
}

function locationByName(manifest, locationName) {
  const normalized = (locationName || '').trim().toLowerCase();
  return (manifest.locations || []).find((loc) => loc.name.toLowerCase() === normalized) || null;
}

function resolveStyleRefForLocation(locationName, options = {}) {
  const manifest = options.manifest || loadStyleManifest();
  const loc = locationByName(manifest, locationName);
  if (loc) {
    const fullPath = path.join(ROOT, loc.file);
    if (fs.existsSync(fullPath)) return { ...loc, fullPath, exists: true };
    return { ...loc, fullPath, exists: false };
  }
  const fallback = manifest.seriesFallback;
  if (fallback) {
    const fullPath = path.join(ROOT, fallback);
    return {
      id: 'series-fallback',
      name: manifest.defaultLocation || 'Blossom Meadow',
      file: fallback,
      fullPath,
      exists: fs.existsSync(fullPath),
    };
  }
  return null;
}

function resolveStyleRefForAdventure(adventureId, options = {}) {
  const { loadCurriculumEntry } = require('./grove-manuscript/validate');
  const entry = loadCurriculumEntry(adventureId);
  const locationName = entry?.location || loadStyleManifest().defaultLocation;
  return resolveStyleRefForLocation(locationName, options);
}

function loadCharacterManifest() {
  if (!fs.existsSync(CHARACTER_MANIFEST_PATH)) {
    return { characters: [] };
  }
  return JSON.parse(fs.readFileSync(CHARACTER_MANIFEST_PATH, 'utf8'));
}

module.exports = {
  ROOT,
  STYLE_MANIFEST_PATH,
  loadStyleManifest,
  locationByName,
  resolveStyleRefForLocation,
  resolveStyleRefForAdventure,
  loadCharacterManifest,
};
