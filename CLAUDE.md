# CLAUDE.md — Probability-Sensei

## What this repo is
Static study app for Ross Ch 6 probability midterm. Zero build tools. Open `index.html` directly in a browser. See `prompt.md` for the original build spec.

## Run / test
- **Open**: double-click `index.html` (or drag into Chrome/Edge).
- **Hard refresh** after edits: `Ctrl+Shift+R` (`file://` caches aggressively).
- **Print cheat sheet**: open `cheatsheet.html` → `Ctrl+P` → "Save as PDF" or print. Should be exactly 2 pages (front + back).
- **Clear progress**: `practice.html` → "Clear progress" link, OR DevTools → Application → Local Storage → delete key `probsensei:v1`.

## Architecture (one-liner)
Every HTML page is a shell with `<body data-page="...">` and optional `data-lecture-id`. `assets/js/main.js` reads those attrs and dispatches to a view module, which reads content from `lectures.js` / `problems.js` and renders into `#app`. KaTeX auto-renders after DOM injection.

```
Page  → <body data-page="X"> → main.js dispatch
                                 ├─ home-view.js    → renders dashboard
                                 ├─ lecture-view.js → reads lectures.js
                                 ├─ practice-view.js→ reads problems.js
                                 └─ cheat           → static HTML only
```

## Key files
- `assets/js/lectures.js` — all lecture content (add/edit sections here)
- `assets/js/problems.js` — all practice problems (add/edit problems here)
- `assets/js/main.js` — page router
- `assets/js/glossary.js` — symbol → plain-English definition map
- `assets/css/tokens.css` — design tokens (brand colors, spacing, type scale)
- `assets/css/print.css` — cheat-sheet print rules
- `cheatsheet.html` — printable; uses `print.css`

## Adding content
- **New lecture**: append object to `lectures.js` matching the `Lecture` schema in the top-of-file JSDoc, then copy an existing `sections/*.html` shell and change `data-lecture-id`.
- **New problem**: append object to `problems.js` matching the `Problem` schema.
- **New symbol**: add to `assets/js/glossary.js` so tooltips work everywhere.

## Conventions
- **Math**: `$inline$`, `$$display$$`. Inside LaTeX, use `\\\\` for newlines in `align` environments.
- **Never write raw HTML inside `lecture.body`** — use the block schema (`type: 'prose'|'formula'|'example'|…`) so the renderer wraps it properly.
- **Status badges**: `solved` / `attempted` / `skipped` only. No custom statuses.
- **Colors**: use CSS vars from `tokens.css`. Never hardcode hex values in components.
- **KaTeX delimiters**: only `$…$` (inline) and `$$…$$` (block). Do not use `\(`/`\)`.

## Known trade-offs (exam-day build)
- No bundler → each module is a separate `<script type="module">` import. OK for ~20 files; don't grow unboundedly.
- `file://` forbids some module features in older Firefox; Chrome/Edge tested.
- Progress is local only; clearing browser data wipes it.
- `4rr.pdf` / `5rr.pdf` in `Data/` are scanned images — cannot be auto-extracted. Review pages use content derived from Ross Ch 4/5 + standard probability knowledge.

## If resuming this session
1. Read `prompt.md` and this file.
2. Open `index.html`, click every nav link, confirm KaTeX renders.
3. If a section is missing content, check `lectures.js` for that `id`.
4. If adding problems, follow the tag conventions already in `problems.js`.
5. Exam is on **2026-04-24**. If that date is already past and nothing has been updated, assume the student is preparing for a future exam using the same material.

## Source material (read-only, `Data/`)
- `6aa.pdf` – `6gg.pdf` — Ch 6 lectures (joint through change-of-variables)
- `6rr.pdf` — multivariable calc review
- `4rr.pdf`, `5rr.pdf` — Ch 4/5 review (scanned)
- `A-First-Course-in-Probability.pdf` — Ross textbook
- `Practice Midterm 1 Key.pdf` — format reference
- `Screenshot 2026-04-24 000609.png` — schedule with problem list
