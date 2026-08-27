# Sync with littleepicminds (app repo)

This authoring kit can live **standalone**. When manuscripts should appear in the app repo, copy them over.

## What to sync

| From (this repo) | To (littleepicminds) |
|------------------|----------------------|
| `docs/gita-grove-*.md` | `docs/` |
| `docs/character-bible.md` | `docs/` |
| `docs/universe-bible.md` | `docs/` |
| `docs/book-format-spec.md` | `docs/` |
| `docs/books/*` | `docs/books/` |
| `scripts/data/gita-grove-curriculum.json` | `scripts/data/` |
| `.cursor/skills/gita-grove-manuscript/` | `.cursor/skills/gita-grove-manuscript/` (optional) |
| `.cursor/rules/gita-grove-authoring.mdc` | `.cursor/rules/` (optional) |

## PowerShell (Windows)

Edit `$AppRepo` in `scripts/sync-to-app.ps1`, then:

```powershell
.\scripts\sync-to-app.ps1
```

## Git workflow options

**Option A — authoring is source of truth**

1. Work in `gita-grove-authoring`
2. Sync to `littleepicminds` before app/import work
3. Commit in both repos

**Option B — submodule**

In littleepicminds:

```bash
git submodule add git@github.com:YOU/gita-grove-authoring.git grove-authoring
```

**Option C — copy kit into monorepo**

Merge this repo into `littleepicminds/docs/grove/` later if you prefer one repo.

## Do not sync

- Legacy `gita-theme-stories-authored.json` overwrite from here
- Auto-seed npm scripts — Grove v2 is manual/agent-authored until import pipeline exists
