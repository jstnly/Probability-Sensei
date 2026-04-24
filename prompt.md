# Probability-Sensei Build Prompt

## Goal
Static web app to study Ross Ch 6 (joint/conditional/transform) for a Math 130B midterm on 2026-04-24. Opens by double-clicking `index.html`. No build, no backend, no AI, no secrets. KaTeX via CDN. Progress via `localStorage`.

## Audience
Beginner student; took the prerequisite probability course long ago. EVERY symbol, subscript, and piece of notation must be explained inline. Default to plain-English-first, math-second.

## Deliverables
1. `index.html` (dashboard), `cheatsheet.html` (printable), `practice.html` (browser)
2. 8 section pages under `sections/` (6.1–6.6, `review-discrete`, `review-continuous`)
3. Shared JS modules in `assets/js/` (`lectures.js`, `problems.js`, views, storage)
4. CSS design system in `assets/css/`
5. Printable 1-sheet cheat sheet (letter, front+back, `@media print`)
6. 34 practice problems with progressive hints + full solutions

## Constraints
- Vanilla HTML/CSS/ES6 modules only. No framework, no bundler, no npm.
- All equations via KaTeX auto-render (`$...$` inline, `$$...$$` block).
- `localStorage` key: `"probsensei:v1"`.
- Works from `file://` (test by double-clicking `index.html`).
- No network calls other than CDN for KaTeX.

## Three-Agent Build Plan
- **Agent C (Coordinator)**: schema, CSS tokens, nav, cheat sheet, integration. Runs FIRST (phase 0) and LAST (phase 2).
- **Agent A (Lecture Builder)**: `lectures.js` — 8 entries (6.1–6.6 + 2 reviews).
- **Agent B (Problem Builder)**: `problems.js` — 34 entries with hints + solutions.
A + B run in parallel during phase 1. C sets the shared schema BEFORE A/B start so they stay compatible.

## Problem List (from schedule)
- **Ch 6 Problems** (25): 1, 2, 6, 7, 8, 10, 19, 21, 13, 15, 20, 23, 48, 22, 40, 45, 9, 34, 38, 41, 42, 55, 56, 58, 65
- **Self-Test** (6): 5, 6, 11, 15, 14, 16
- **Theory** (3): 6, 20, 21

## Chapter 6 Content Areas (exam focus)
- 6.1 Joint Distributions (CDF, PMF, PDF, marginals)
- 6.2 Independence (factorization, rectangular-support trap)
- 6.3 Sums of Independent RVs (convolution, famous sums, MGF trick)
- 6.4 Conditional PMFs
- 6.5 Conditional Densities
- 6.6 Change of Variables (Jacobian) + Order Statistics

## Practice Midterm Archetypes (format to match)
1. `joint-density-region` — normalize, marginal, probability, independence
2. `jacobian-transform` — uniform on non-rectangular region, E[f(X,Y)]
3. `discrete-joint-constrained` — triangular-support PMF, conditional expectation
4. `cdf-pdf-expectation` — given CDF → derive PDF → compute E[X]

## Source Material (read-only, in `Data/`)
- `6aa.pdf`–`6gg.pdf` — Chapter 6 lectures
- `6rr.pdf` — multivariable calc review
- `4rr.pdf`, `5rr.pdf` — discrete/continuous review (scanned images)
- `A-First-Course-in-Probability.pdf` — textbook
- `Practice Midterm 1 Key.pdf` — format reference
- `Screenshot 2026-04-24 000609.png` — schedule

## Success Criteria
- Open `index.html` → dashboard loads, navigate every section, math renders (no raw `$...$`)
- Print preview `cheatsheet.html` → clean 2-page front+back, no clipping
- Mark a problem solved → reload → still solved
- Every Greek letter/symbol has a visible definition on the page using it
