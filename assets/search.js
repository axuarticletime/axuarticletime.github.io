// search.js - simple client-side search
const postsIndex = JSON.parse(document.getElementById('__posts_index').textContent || '[]');

function doSearch(q){
  q = q.trim().toLowerCase();
  const results = postsIndex.filter(p=>{
    return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q) || (p.tags||[]).join(' ').toLowerCase().includes(q);
  }).slice(0,10);
  const out = document.getElementById('search-results');
  if(!q){ out.innerHTML=''; return; }
  if(results.length===0){ out.innerHTML='<div class="small">No results</div>'; return; }
  out.innerHTML = results.map(r=>`<div class="article"><h3><a href="${r.url}">${r.title}</a></h3><div class="small">By ${r.author} — ${r.date}</div><p class="excerpt">${r.excerpt}</p></div>`).join('');
}

document.addEventListener('DOMContentLoaded', ()=>{
  const input = document.querySelector('.searchbar input');
  if(input){
    input.addEventListener('input', e => doSearch(e.target.value));
  }
});
