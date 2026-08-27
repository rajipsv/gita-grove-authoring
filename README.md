# Gita Grove Authoring Kit

Portable **agent memory + architecture** for writing Gita Grove children's books (`gv##_a#` adventures). Use this repo on any laptop and any Cursor account — skills and rules travel with the project.

**App repo (optional):** [littleepicminds](https://github.com/) — UI, audio, legacy `sd*`/`sk*` theme pipeline. This repo is **authoring-only**.

---

## Quick start (new laptop)

1. **Clone this repo**
   ```bash
   git clone https://github.com/rajipsv/gita-grove-authoring.git
   cd gita-grove-authoring
   ```

2. **Open in Cursor** — File → Open Folder → this directory.

3. **Skills load automatically** from `.cursor/skills/` (project scope).

4. **Rule applies automatically** — `.cursor/rules/gita-grove-authoring.mdc` (`alwaysApply: true`).

5. **Start a chat:**  
   *"Read the gita-grove-manuscript skill and draft gv01_a3."*

No personal `~/.cursor` setup required — everything is in the repo.

---

## What's inside

| Path | Purpose |
|------|---------|
| `AGENTS.md` | Architecture — how stories are designed and generated |
| `.cursor/skills/gita-grove-manuscript/` | Main agent skill (workflow, templates, quality bar) |
| `.cursor/rules/gita-grove-authoring.mdc` | Pre-approved Grove story work; no permission nagging |
| `docs/` | Universe bibles, series catalog, format spec, manuscripts |
| `scripts/data/gita-grove-curriculum.json` | Machine-readable adventure index + hooks + Guru Ma lines |
| `SYNC.md` | Copy manuscripts back into `littleepicminds` when ready |

---

## Authoring workflow (summary)

1. **Design order:** Grove Power → sub-skill → location → flaw → scenario → story → **ślokas last**
2. **English-first** — Telugu via translation pass later
3. **25-page module** per adventure — see `docs/book-format-spec.md`
4. **Serial hooks** — page 25 teaser → next adventure (`docs/books/gv01-book-hooks.md` for Book 1)
5. **Remember:** unique **Guru Ma line** per adventure, tied to paired Bhagavad Gita ślokas
6. **Update** `scripts/data/gita-grove-curriculum.json` after each manuscript

---

## Push to GitHub (first time)

```bash
cd gita-grove-authoring
git init
git add .
git commit -m "Gita Grove authoring kit — skills, rules, docs, curriculum"
git remote add origin https://github.com/rajipsv/gita-grove-authoring.git
git push -u origin main
```

On the other laptop: clone and open in Cursor — same behavior.

---

## Optional: sync into littleepicminds

When manuscripts are ready for the app repo:

```bash
# From gita-grove-authoring root (edit paths in scripts/sync-to-app.ps1)
./scripts/sync-to-app.ps1
```

See `SYNC.md`.

---

## Status (2026-08-27)

- Design docs: complete
- Book 1 manuscripts: `gv01_a1`, `gv01_a2` drafted; `gv01_a3`, `gv01_a4` synopsis + hooks
- Curriculum: 65 adventures skeleton + Book 1 hooks
