import { getLecture, lectures } from './lectures.js';
import { glossary } from './glossary.js';
import { storage } from './storage.js';

function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Replace [[symbol]] tokens with glossary-wrapped spans.
function applyGlossary(text) {
  if (!text) return '';
  return text.replace(/\[\[([^\]]+)\]\]/g, (_, sym) => {
    const tip = glossary[sym];
    if (!tip) return sym;
    const escaped = String(tip).replace(/"/g, '&quot;');
    return `<span class="glossary-term" data-tip="${escaped}">${sym}</span>`;
  });
}

function renderBlock(block) {
  switch (block.type) {
    case 'heading':
      return `<h2>${esc(block.title || '')}</h2>`;

    case 'prose':
      return `<div class="prose-block">${applyGlossary(block.body || '')}</div>`;

    case 'symbol-key':
      if (!block.symbols || !block.symbols.length) return '';
      return `
        <div class="math-block__title">${esc(block.title || 'Symbol Key')}</div>
        <dl class="symbol-key">
          ${block.symbols.map(s => `
            <dt>${s.symbol.startsWith('$') ? s.symbol : `$${s.symbol}$`}</dt>
            <dd>${applyGlossary(s.meaning)}</dd>
          `).join('')}
        </dl>
      `;

    case 'definition':
      return `
        <div class="definition">
          <div class="definition__label">${esc(block.title || 'Definition')}</div>
          ${applyGlossary(block.body || '')}
        </div>
      `;

    case 'theorem':
      return `
        <div class="theorem">
          <div class="theorem__label">${esc(block.title || 'Theorem')}</div>
          ${applyGlossary(block.body || '')}
        </div>
      `;

    case 'formula':
      return `
        <div class="math-block">
          ${block.title ? `<div class="math-block__title">${esc(block.title)}</div>` : ''}
          $$${block.latex}$$
        </div>
      `;

    case 'example':
      return `
        <div class="example">
          <div class="example__label">${esc(block.title || 'Example')}</div>
          <div class="example__body">${applyGlossary(block.body || '')}</div>
        </div>
      `;

    case 'callout': {
      const variant = block.variant || 'info';
      const cls = variant === 'warn' ? 'callout--warn' : variant === 'tip' ? 'callout--tip' : '';
      return `
        <div class="callout ${cls}">
          ${block.title ? `<div class="callout__title">${esc(block.title)}</div>` : ''}
          ${applyGlossary(block.body || '')}
        </div>
      `;
    }

    case 'table': {
      const headers = block.headers || [];
      const rows = block.rows || [];
      return `
        <div class="table-wrap">
          <table>
            <thead><tr>${headers.map(h => `<th>${applyGlossary(h)}</th>`).join('')}</tr></thead>
            <tbody>
              ${rows.map(r => `<tr>${r.map(cell => `<td>${applyGlossary(cell)}</td>`).join('')}</tr>`).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    default:
      return '';
  }
}

function renderKeyTerms(terms) {
  if (!terms || !terms.length) return '';
  return `
    <section class="card card--accent" style="margin-bottom: var(--s-5);">
      <h3 style="margin-top:0;">Key Terms — plain English first</h3>
      <dl class="symbol-key">
        ${terms.map(t => `
          <dt>${t.latex ? `$${t.latex}$` : esc(t.term)}</dt>
          <dd><strong>${esc(t.term)}.</strong> ${applyGlossary(t.def)}</dd>
        `).join('')}
      </dl>
    </section>
  `;
}

function renderExamTips(tips) {
  if (!tips || !tips.length) return '';
  return `
    <div class="callout callout--tip">
      <div class="callout__title">Exam Playbook</div>
      <ul style="margin:0 0 0 var(--s-4);">
        ${tips.map(t => `<li>${applyGlossary(t)}</li>`).join('')}
      </ul>
    </div>
  `;
}

function renderRelatedProblems(ids) {
  if (!ids || !ids.length) return '';
  const links = ids.map(id => `<a href="../practice.html#${id}">${id}</a>`).join(' · ');
  return `
    <section class="card" style="margin-top: var(--s-5);">
      <h3 style="margin-top:0;">Related Practice Problems</h3>
      <div>${links}</div>
    </section>
  `;
}

function renderLecture(lecture) {
  const root = document.getElementById('app');
  if (!root) return;

  const blocks = (lecture.blocks || []).map(renderBlock).join('');

  root.innerHTML = `
    <article>
      <div class="text-sm text-muted">${esc(lecture.rossRef || '')}</div>
      <h1>${esc(lecture.title)}</h1>
      <p class="prose" style="font-size: var(--fs-lg); color: var(--text-muted);">
        ${applyGlossary(lecture.summary || '')}
      </p>

      ${renderKeyTerms(lecture.keyTerms)}

      <div class="prose stack-lg">
        ${blocks}
      </div>

      ${renderExamTips(lecture.examTips)}
      ${renderRelatedProblems(lecture.relatedProblems)}

      <nav class="cluster" style="margin-top: var(--s-6);">
        ${renderNeighborLinks(lecture.id)}
      </nav>
    </article>
  `;
}

function renderNeighborLinks(id) {
  const ordered = lectures.map(l => l);
  const idx = ordered.findIndex(l => l.id === id);
  if (idx < 0) return '';
  const prev = idx > 0 ? ordered[idx - 1] : null;
  const next = idx < ordered.length - 1 ? ordered[idx + 1] : null;
  const parts = [];
  if (prev) parts.push(`<a class="btn" href="${prev.slug}.html">← ${esc(prev.title)}</a>`);
  parts.push(`<a class="btn btn--ghost" href="../index.html">Home</a>`);
  if (next) parts.push(`<a class="btn btn--primary" href="${next.slug}.html">${esc(next.title)} →</a>`);
  return parts.join('');
}

function renderMissing(id) {
  const root = document.getElementById('app');
  if (!root) return;
  root.innerHTML = `
    <article>
      <div class="text-sm text-muted">Lecture id: <code>${esc(id)}</code></div>
      <h1>Content coming soon</h1>
      <p>This lecture has not been filled in yet. Agent A is responsible for creating it in <code>assets/js/lectures.js</code>.</p>
      <p><a class="btn" href="../index.html">Back to home</a></p>
    </article>
  `;
}

export function mount() {
  const id = document.body.dataset.lectureId;
  if (!id) {
    renderMissing('(none)');
    return;
  }
  const lecture = getLecture(id);
  if (!lecture) {
    renderMissing(id);
    return;
  }
  storage.markLectureVisited(id);
  renderLecture(lecture);
}
