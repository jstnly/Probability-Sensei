// Figure out the correct relative path prefix given the current page's URL.
// index.html, practice.html, cheatsheet.html live in repo root.
// sections/*.html live one level deep.
function pathPrefix() {
  const path = window.location.pathname.replace(/\\/g, '/');
  if (path.includes('/sections/')) return '../';
  return './';
}

const REL = pathPrefix();

const LINKS = [
  { href: `${REL}index.html`, label: 'Home' },
  { href: `${REL}sections/6-1-joint-distributions.html`, label: '6.1 Joint' },
  { href: `${REL}sections/6-2-independence.html`, label: '6.2 Indep' },
  { href: `${REL}sections/6-3-sums-independent.html`, label: '6.3 Sums' },
  { href: `${REL}sections/6-4-conditional-pmf.html`, label: '6.4 Cond PMF' },
  { href: `${REL}sections/6-5-conditional-density.html`, label: '6.5 Cond PDF' },
  { href: `${REL}sections/6-6-change-of-variables.html`, label: '6.6 Change' },
  { href: `${REL}sections/review-discrete.html`, label: 'Ch4 Review' },
  { href: `${REL}sections/review-continuous.html`, label: 'Ch5 Review' },
  { href: `${REL}practice.html`, label: 'Practice' },
  { href: `${REL}cheatsheet.html`, label: 'Cheat Sheet' },
];

export function mountNav() {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (header && !header.dataset.mounted) {
    header.dataset.mounted = 'true';
    const currentPath = window.location.pathname.replace(/\\/g, '/');
    const linksHtml = LINKS.map((link) => {
      const linkPath = new URL(link.href, window.location.href).pathname.replace(/\\/g, '/');
      const active = currentPath.endsWith(linkPath.split('/').pop()) ? ' class="active"' : '';
      return `<a href="${link.href}"${active}>${link.label}</a>`;
    }).join('');

    header.innerHTML = `
      <div class="wrap">
        <a class="brand" href="${REL}index.html">Probability Sensei</a>
        <nav>${linksHtml}</nav>
      </div>
    `;
  }

  if (footer && !footer.dataset.mounted) {
    footer.dataset.mounted = 'true';
    footer.innerHTML = `
      Probability Sensei · Built for Math 130B midterm (2026-04-24) · No AI, just notes.
    `;
  }
}

export function relPath(p = '') {
  return REL + p;
}
