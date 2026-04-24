// Render KaTeX math across a given root. Requires KaTeX autoRender
// and the katex global to already be loaded via the CDN script tags.

const CONFIG = {
  delimiters: [
    { left: '$$', right: '$$', display: true },
    { left: '$', right: '$', display: false },
  ],
  throwOnError: false,
  errorColor: '#b23a48',
  strict: 'ignore',
  trust: false,
};

export function renderMath(root) {
  const target = root || document.body;
  if (typeof window.renderMathInElement === 'function') {
    try {
      window.renderMathInElement(target, CONFIG);
    } catch (err) {
      console.warn('[probsensei] KaTeX render error', err);
    }
  }
}

export function waitForKatex(timeoutMs = 3000) {
  return new Promise((resolve) => {
    if (typeof window.renderMathInElement === 'function') {
      resolve(true);
      return;
    }
    const start = Date.now();
    const timer = setInterval(() => {
      if (typeof window.renderMathInElement === 'function') {
        clearInterval(timer);
        resolve(true);
      } else if (Date.now() - start > timeoutMs) {
        clearInterval(timer);
        console.warn('[probsensei] KaTeX autoRender never loaded');
        resolve(false);
      }
    }, 50);
  });
}
