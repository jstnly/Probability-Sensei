import { problems } from './problems.js';
import { storage } from './storage.js';
import { renderMath } from './katex-loader.js';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const state = {
  section: 'all',
  kind: 'all',
  difficulty: 'all',
  status: 'all',
  search: '',
};

function matches(p) {
  if (state.section !== 'all' && p.section !== state.section) return false;
  if (state.kind !== 'all' && p.kind !== state.kind) return false;
  if (state.difficulty !== 'all' && p.difficulty !== state.difficulty) return false;
  const cur = storage.getProblemStatus(p.id);
  if (state.status === 'unsolved' && cur === 'solved') return false;
  if (state.status === 'attempted' && cur !== 'attempted') return false;
  if (state.status === 'solved' && cur !== 'solved') return false;
  if (state.search) {
    const hay = (p.statement + ' ' + p.tags.join(' ') + ' ' + p.id).toLowerCase();
    if (!hay.includes(state.search.toLowerCase())) return false;
  }
  return true;
}

function statusBadge(status) {
  if (status === 'solved') return '<span class="badge badge--solved">✓ Solved</span>';
  if (status === 'attempted') return '<span class="badge badge--attempted">Attempted</span>';
  if (status === 'skipped') return '<span class="badge badge--skipped">Skipped</span>';
  return '<span class="badge">Unsolved</span>';
}

function diffBadge(d) {
  return `<span class="badge badge--diff-${d}">${esc(d)}</span>`;
}

function sectionBadge(s) {
  return `<span class="badge badge--section">§${esc(s)}</span>`;
}

function kindLabel(k) {
  if (k === 'self-test') return 'Self-Test';
  if (k === 'theory') return 'Theory';
  return 'Problem';
}

function renderProblemCard(p) {
  const status = storage.getProblemStatus(p.id);
  const solutionRevealed = storage.isSolutionRevealed(p.id);
  const hintsRevealed = storage.getHintsRevealed(p.id);

  const hintsHtml = (p.hints || []).map((hint, i) => `
    <details class="toggle" data-hint-idx="${i}" ${hintsRevealed > i ? 'open' : ''}>
      <summary>Hint ${i + 1}</summary>
      <div class="toggle__body">${hint}</div>
    </details>
  `).join('');

  return `
    <article class="problem-card" id="${p.id}" data-id="${p.id}">
      <div class="problem-card__head">
        <span class="problem-card__id">${esc(p.id)}</span>
        ${sectionBadge(p.section)}
        <span class="badge">${esc(kindLabel(p.kind))} ${p.number}</span>
        ${diffBadge(p.difficulty)}
        ${statusBadge(status)}
        <span class="problem-card__meta">${p.estMinutes ? `~${p.estMinutes} min` : ''}</span>
      </div>
      <div class="problem-card__body">
        <div class="prose">${p.statement}</div>
        ${hintsHtml}
        <details class="toggle toggle--solution" data-solution ${solutionRevealed ? 'open' : ''}>
          <summary>Full solution</summary>
          <div class="toggle__body">${p.solution}</div>
        </details>
        <div class="problem-card__actions">
          <button class="btn btn--small" data-action="attempted" data-id="${p.id}">Mark attempted</button>
          <button class="btn btn--small btn--success" data-action="solved" data-id="${p.id}">Mark solved</button>
          <button class="btn btn--small btn--ghost" data-action="reset" data-id="${p.id}">Reset</button>
        </div>
      </div>
    </article>
  `;
}

function renderList() {
  const listEl = document.getElementById('problem-list');
  const countEl = document.getElementById('filter-count');
  if (!listEl) return;

  const filtered = problems.filter(matches);
  if (!filtered.length) {
    listEl.innerHTML = `
      <div class="card"><p class="text-muted">No problems match these filters. Try <button class="btn btn--small" id="reset-filters-empty">reset filters</button>.</p></div>
    `;
    document.getElementById('reset-filters-empty')?.addEventListener('click', resetFilters);
    if (countEl) countEl.textContent = '0';
    return;
  }

  listEl.innerHTML = filtered.map(renderProblemCard).join('');
  if (countEl) countEl.textContent = String(filtered.length);

  attachCardHandlers(listEl);
  renderMath(listEl);

  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function attachCardHandlers(root) {
  root.querySelectorAll('[data-action]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      if (action === 'reset') {
        storage.setProblemStatus(id, null);
      } else {
        storage.setProblemStatus(id, action);
      }
      updateProgress();
      renderList();
    });
  });

  root.querySelectorAll('details[data-hint-idx]').forEach((det) => {
    det.addEventListener('toggle', () => {
      if (det.open) {
        const id = det.closest('.problem-card')?.dataset.id;
        const idx = Number(det.dataset.hintIdx);
        if (id) storage.setHintsRevealed(id, idx + 1);
      }
    });
  });

  root.querySelectorAll('details[data-solution]').forEach((det) => {
    det.addEventListener('toggle', () => {
      const id = det.closest('.problem-card')?.dataset.id;
      if (id) storage.setSolutionRevealed(id, det.open);
    });
  });
}

function updateProgress() {
  const s = storage.summary(problems.length);
  const barEl = document.getElementById('progress-fill');
  const textEl = document.getElementById('progress-text');
  if (barEl) barEl.style.width = `${s.percent}%`;
  if (textEl) textEl.textContent = `${s.solved} / ${s.total} solved (${s.attempted} attempted)`;
}

function resetFilters() {
  state.section = 'all';
  state.kind = 'all';
  state.difficulty = 'all';
  state.status = 'all';
  state.search = '';
  document.querySelectorAll('.chip[data-filter]').forEach(c => {
    c.classList.toggle('is-active', c.dataset.value === 'all');
  });
  const searchEl = document.getElementById('search-box');
  if (searchEl) searchEl.value = '';
  renderList();
}

function buildFilterBar(root) {
  const sectionOpts = ['all', '6.1', '6.2', '6.3', '6.4', '6.5', '6.6', 'mixed'];
  const kindOpts = ['all', 'problem', 'self-test', 'theory'];
  const diffOpts = ['all', 'easy', 'medium', 'hard'];
  const statusOpts = ['all', 'unsolved', 'attempted', 'solved'];

  const chipGroup = (label, name, opts) => `
    <div class="filter-bar__group">
      <span class="filter-bar__label">${label}</span>
      ${opts.map(v => `
        <span class="chip ${v === 'all' ? 'is-active' : ''}" data-filter="${name}" data-value="${v}">${v}</span>
      `).join('')}
    </div>
  `;

  root.innerHTML = `
    <div class="filter-bar">
      ${chipGroup('Section', 'section', sectionOpts)}
      ${chipGroup('Kind', 'kind', kindOpts)}
      ${chipGroup('Difficulty', 'difficulty', diffOpts)}
      ${chipGroup('Status', 'status', statusOpts)}
      <div class="filter-bar__group">
        <span class="filter-bar__label">Search</span>
        <input type="search" id="search-box" placeholder="keywords, e.g. 'Jacobian'">
        <button class="btn btn--small btn--ghost" id="reset-filters">Reset</button>
      </div>
    </div>
  `;

  root.querySelectorAll('.chip[data-filter]').forEach(chip => {
    chip.addEventListener('click', () => {
      const name = chip.dataset.filter;
      const value = chip.dataset.value;
      state[name] = value;
      root.querySelectorAll(`.chip[data-filter="${name}"]`).forEach(c => {
        c.classList.toggle('is-active', c.dataset.value === value);
      });
      renderList();
    });
  });

  root.querySelector('#search-box')?.addEventListener('input', (e) => {
    state.search = e.target.value;
    renderList();
  });

  root.querySelector('#reset-filters')?.addEventListener('click', resetFilters);
}

export function mount() {
  const root = document.getElementById('app');
  if (!root) return;

  root.innerHTML = `
    <header class="stack">
      <h1>Practice Problems</h1>
      <p class="text-muted">
        ${problems.length} problems from the Math 130B schedule. Use filters to narrow down.
        Your progress is saved locally on this device.
      </p>
    </header>

    <div class="card" style="margin-top: var(--s-4);">
      <div class="cluster" style="justify-content: space-between;">
        <div>
          <strong id="progress-text">0 / 0 solved</strong>
          <span class="text-muted text-sm" id="filter-count-wrap">
            · showing <span id="filter-count">0</span>
          </span>
        </div>
        <div class="cluster">
          <button class="btn btn--small btn--danger" id="clear-progress">Clear progress</button>
        </div>
      </div>
      <div class="progress-bar" style="margin-top: var(--s-2);">
        <div class="progress-bar__fill" id="progress-fill" style="width: 0%;"></div>
      </div>
    </div>

    <div id="filter-bar-root" style="margin-top: var(--s-4);"></div>
    <div id="problem-list"></div>
  `;

  buildFilterBar(document.getElementById('filter-bar-root'));

  document.getElementById('clear-progress')?.addEventListener('click', () => {
    if (confirm('Reset all problem progress? This cannot be undone.')) {
      storage.clearAll();
      updateProgress();
      renderList();
    }
  });

  updateProgress();
  renderList();
}
