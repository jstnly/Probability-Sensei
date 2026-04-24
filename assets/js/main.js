import { mountNav } from './nav.js';
import { renderMath, waitForKatex } from './katex-loader.js';
import { storage } from './storage.js';

async function route() {
  mountNav();

  const page = document.body.dataset.page;
  try {
    if (page === 'home') {
      const m = await import('./home-view.js');
      m.mount();
    } else if (page === 'lecture') {
      const m = await import('./lecture-view.js');
      m.mount();
    } else if (page === 'practice') {
      const m = await import('./practice-view.js');
      m.mount();
    } else if (page === 'cheat') {
      // Static HTML already rendered server-side in the file; we only need math render.
    }
  } catch (err) {
    console.error('[probsensei] route error', err);
    const root = document.getElementById('app');
    if (root) {
      root.innerHTML = `
        <div class="callout callout--warn">
          <div class="callout__title">Render error</div>
          <p>Something went wrong loading this page. Check the browser console for details.</p>
          <pre>${String(err && err.message)}</pre>
        </div>
      `;
    }
  }

  await waitForKatex();
  renderMath(document.body);

  storage.setLastPage(window.location.pathname + window.location.hash);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', route);
} else {
  route();
}
