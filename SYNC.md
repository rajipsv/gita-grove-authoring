# Sync with littleepicminds (app repo)

**gita-grove-authoring** is the source of truth for Grove v2 content and authoring tooling.  
**littleepicminds** is the product app — it receives **content only** via sync.

## What to sync (content → app)

| From (this repo) | To (littleepicminds) |
|------------------|----------------------|
| `docs/gita-grove-*.md` | `docs/` |
| `docs/character-bible.md` | `docs/` |
| `docs/universe-bible.md` | `docs/` |
| `docs/book-format-spec.md` | `docs/` |
| `docs/books/*` (`.md`, `*.story.json`, hooks) | `docs/books/` |
| `scripts/data/gita-grove-curriculum.json` | `scripts/data/` |

Run:

```powershell
.\scripts\sync-to-app.ps1
```

Target branch in app repo: **`feature/gita-grove`** (not `main`).

## What stays in this repo only (do not sync)

| Path | Why |
|------|-----|
| `scripts/lib/grove-manuscript/` | Parse, validate, compile, loadAdventure |
| `scripts/lib/grove-kdp/` | KDP DOCX render |
| `scripts/export-grove-manuscript-kdp.js` | Export CLI |
| `scripts/grove-validate-manuscript.js` | Validation |
| `scripts/grove-compile-manuscript.js` | Markdown preview |
| `scripts/generate-grove-story.js` | Generation scaffold |
| `output/kdp/` | Generated DOCX (local) |

Optional one-time copy to app repo for convenience (not via sync script):

- `.cursor/skills/` — so agents work if you open littleepicminds directly
- `.cursor/rules/gita-grove-authoring.mdc`

## Authoring workflow (this repo)

```bash
npm install
npm run grove:validate -- --id=gv01_a1
npm run grove:compile -- --id=gv01_a1
npm run grove:export-kdp -- --file=docs/books/gv01_a1-the-fair-before-the-drum.md --format=book
.\scripts\sync-to-app.ps1
```

## Git workflow

1. Work in **gita-grove-authoring** (stories, JSON, export)
2. **Sync** content to littleepicminds when app needs updated curriculum/manuscripts
3. Commit in both repos separately

## Do not sync

- Legacy `gita-theme-stories-authored.json` overwrite from here
- Auto-seed npm scripts — Grove v2 is agent-authored until app import pipeline exists
- KDP tooling into app repo (keeps littleepicminds focused on runtime)
