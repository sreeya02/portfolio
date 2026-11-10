// Mobile menu, current year, and nav highlighting. No need to edit.
document.getElementById('year').textContent = new Date().getFullYear();

const btn = document.querySelector('.menu-btn');
const links = document.getElementById('links');
if (btn) {
  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Close' : 'Menu';
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Menu';
  }));
}

// Highlight the nav link for the section on screen
const navMap = {};
links.querySelectorAll('a[href^="#"]').forEach(a => { navMap[a.getAttribute('href').slice(1)] = a; });
const watched = Object.keys(navMap).map(id => document.getElementById(id)).filter(Boolean);
if ('IntersectionObserver' in window && watched.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        Object.values(navMap).forEach(a => a.classList.remove('active'));
        navMap[e.target.id].classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  watched.forEach(s => io.observe(s));
}
