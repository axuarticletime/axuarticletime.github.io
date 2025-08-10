// main.js - small site helpers
function toggleMobileNav(){
  const n = document.querySelector('.nav');
  if(!n) return;
  n.style.display = n.style.display === 'flex' ? 'none' : 'flex';
}
