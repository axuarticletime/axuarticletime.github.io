// search.js - client-side search with highlighting + thumbnails
const postsIndex = JSON.parse(document.getElementById('__posts_index').textContent || '[]');

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[m]));
}

// highlight query terms inside text (case-insensitive)
function highlight(text, query) {
  if (!query) return escapeHTML(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig");
  return escapeHTML(text).replace(regex, '<mark>$1</mark>');
}

function doSearch(q) {
  q = q.trim().toLowerCase();
  const results = postsIndex.filter(p => {
    return p.title.toLowerCase().includes(q) ||
           p.content.toLowerCase().includes(q) ||
           (p.tags || []).join(' ').toLowerCase().includes(q);
  }).slice(0, 10);

  const out = document.getElementById('search-results');
  if (!out) return;
  if (!q) { out.innerHTML = ''; return; }
  if (results.length === 0) { out.innerHTML = '<div class="small">No results</div>'; return; }

  out.innerHTML = results.map(r => `
    <div class="article">
      ${r.image ? `<img src="${escapeHTML(r.image)}" alt="${escapeHTML(r.title)}">` : ''}
      <div class="article-content">
        <h3><a href="${escapeHTML(r.url)}">${highlight(r.title, q)}</a></h3>
        <div class="small">By ${escapeHTML(r.author)} — ${escapeHTML(r.date)}</div>
        <p class="excerpt">${highlight(r.excerpt, q)}</p>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.searchbar input');
  if (input) {
    let timeout;
    input.addEventListener('input', e => {
      clearTimeout(timeout);
      timeout = setTimeout(() => doSearch(e.target.value), 200); // debounce
    });
  }
});


