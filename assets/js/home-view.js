import { lectures } from './lectures.js';
import { problems } from './problems.js';
import { storage } from './storage.js';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const SECTION_META = [
  { id: '6.1', slug: '6-1-joint-distributions', label: '§6.1', fallbackTitle: 'Joint Distributions', fallbackSummary: 'Joint CDFs, PMFs, PDFs, and marginals.' },
  { id: '6.2', slug: '6-2-independence', label: '§6.2', fallbackTitle: 'Independence', fallbackSummary: 'When does the joint factor into marginals?' },
  { id: '6.3', slug: '6-3-sums-independent', label: '§6.3', fallbackTitle: 'Sums of Independent RVs', fallbackSummary: 'Convolution + famous sum identities.' },
  { id: '6.4', slug: '6-4-conditional-pmf', label: '§6.4', fallbackTitle: 'Conditional PMFs', fallbackSummary: 'Discrete conditioning + E[X|Y=y].' },
  { id: '6.5', slug: '6-5-conditional-density', label: '§6.5', fallbackTitle: 'Conditional Densities', fallbackSummary: 'Continuous conditioning + total expectation.' },
  { id: '6.6', slug: '6-6-change-of-variables', label: '§6.6', fallbackTitle: 'Change of Variables', fallbackSummary: 'Jacobian method + order statistics.' },
  { id: 'review-discrete', slug: 'review-discrete', label: 'Ch4', fallbackTitle: 'Discrete Distributions Review', fallbackSummary: 'Bernoulli → Poisson quick reference.', review: true },
  { id: 'review-continuous', slug: 'review-continuous', label: 'Ch5', fallbackTitle: 'Continuous Distributions Review', fallbackSummary: 'Uniform → Beta quick reference.', review: true },
];

function tile(meta) {
  const lec = lectures.find(l => l.id === meta.id);
  const title = lec?.title || meta.fallbackTitle;
  const summary = lec?.summary || meta.fallbackSummary;
  const visited = storage.getLecturesVisited()[meta.id];
  const visitedMark = visited ? '<span class="text-muted text-xs">✓ visited</span>' : '';

  return `
    <a class="section-tile ${meta.review ? 'section-tile--review' : ''}" href="sections/${meta.slug}.html">
      <div class="cluster" style="justify-content: space-between;">
        <span class="section-tile__label">${esc(meta.label)}</span>
        ${visitedMark}
      </div>
      <h2 class="section-tile__title">${esc(title)}</h2>
      <p class="section-tile__summary">${esc(summary)}</p>
    </a>
  `;
}

export function mount() {
  const root = document.getElementById('app');
  if (!root) return;

  const progress = storage.summary(problems.length || 34);

  root.innerHTML = `
    <section>
      <h1>Probability Sensei</h1>
      <p class="text-muted" style="font-size: var(--fs-lg); max-width: 64ch;">
        A focused study companion for the Math 130B midterm on <strong>2026-04-24</strong>.
        Every Greek letter, subscript, and notation is explained in plain English.
      </p>
    </section>

    <section class="card" style="margin: var(--s-5) 0;">
      <div class="cluster" style="justify-content: space-between;">
        <div>
          <strong>Progress</strong>
          <span class="text-muted">· ${progress.solved} / ${progress.total} practice problems solved</span>
        </div>
        <div class="cluster">
          <a class="btn btn--small btn--primary" href="practice.html">Open practice</a>
          <a class="btn btn--small" href="cheatsheet.html">Cheat sheet</a>
        </div>
      </div>
      <div class="progress-bar" style="margin-top: var(--s-2);">
        <div class="progress-bar__fill" style="width: ${progress.percent}%;"></div>
      </div>
    </section>

    <section>
      <h2 style="margin-top: 0;">Chapter 6 (exam focus)</h2>
      <div class="section-grid">
        ${SECTION_META.filter(s => !s.review).map(tile).join('')}
      </div>

      <h2>Review material</h2>
      <div class="section-grid">
        ${SECTION_META.filter(s => s.review).map(tile).join('')}
      </div>
    </section>

    <section class="card" style="margin-top: var(--s-6); border-left: 4px solid var(--warn);">
      <h3 style="margin-top: 0;">How to use this app</h3>
      <ol>
        <li><strong>Read</strong> each Chapter 6 section in order. Symbol keys at the top of every page explain notation.</li>
        <li><strong>Practice</strong> using the Practice page. Filter to whichever section you just studied.</li>
        <li><strong>Print</strong> the cheat sheet (front + back, letter size) and bring it to the exam.</li>
      </ol>
      <p class="text-muted text-sm" style="margin-bottom: 0;">
        All content loads from <code>file://</code> — no network needed after the first load (KaTeX caches from the CDN).
      </p>
    </section>
  `;
}
