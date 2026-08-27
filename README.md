# Gita Grove Authoring Kit

**Story generation engine** for Gita Grove (`gv##_a#` adventures) and future Little Epic Minds story lines.  
Generate, validate, compile, and export here — then sync **content** to the product app.

| Repo | Role |
|------|------|
| **gita-grove-authoring** (this) | **Engine** — story generation, validation, KDP export, Cursor skills |
| **[littleepicminds](https://github.com/rajipsv/littleepicminds)** | **Product** — hosts synced content; app, audio, website for external users |

The engine is intentionally **separate from the app** so we can reuse it for other story generations later (new series, formats, or audiences) without touching production runtime.

Portable **agent memory + tooling** — clone on any laptop; skills and rules travel with the project.

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
| `scripts/lib/grove-manuscript/` | loadAdventure, validate, compile, story generation prompts |
| `scripts/lib/grove-kdp/` | KDP DOCX export (book + draft) |
| `SYNC.md` | Copy **content only** into `littleepicminds` when ready |

---

## Authoring workflow (summary)

1. **Design order:** Grove Power → sub-skill → location → flaw → scenario → story → **ślokas last**
2. **Hybrid files:** `docs/books/*.story.json` (story) + `*.md` (back matter)
3. **English-first** — Telugu via translation pass later
4. **Validate & export here:**
   ```bash
   npm run grove:validate -- --id=gv01_a1
   npm run grove:export-kdp -- --file=docs/books/gv01_a1-the-fair-before-the-drum.md --format=book
   ```
5. **Sync content to app:** `.\scripts\sync-to-app.ps1` (docs + curriculum only)
6. **Update** `scripts/data/gita-grove-curriculum.json` after each manuscript

## KDP / Word export (this repo)

```bash
npm install
npm run grove:export-kdp -- --file=docs/books/gv01_a1-the-fair-before-the-drum.md --format=book
```

Skill: `.cursor/skills/gita-grove-kdp-export/` · Output: `output/kdp/*.docx`

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
