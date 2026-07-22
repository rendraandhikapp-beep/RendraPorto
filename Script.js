// ================= NAV: hamburger mobile =================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Tutup menu mobile setiap kali link diklik
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ================= THEME TOGGLE (dark/light) =================
const themeToggle = document.getElementById('themeToggle');
const iconMoon = document.getElementById('iconMoon');
const iconSun = document.getElementById('iconSun');
const root = document.documentElement;

function applyTheme(theme){
  root.setAttribute('data-theme', theme);
  iconMoon.style.display = theme === 'dark' ? 'none' : 'block';
  iconSun.style.display = theme === 'dark' ? 'block' : 'none';
  localStorage.setItem('portfolio-theme', theme);
}

const savedTheme = localStorage.getItem('portfolio-theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(current);
});

// ================= FLOATING CARD: toggle archetype =================
const archetypeBtn = document.getElementById('archetypeBtn');
const archetypeHeading = document.getElementById('archetypeHeading');
const archetypeDesc = document.getElementById('archetypeDesc');

const archetypes = {
  dev: {
    heading: 'Sisi Frontend Developer',
    desc: 'Fokus pada performa, struktur kode yang rapi, dan interaksi yang halus di setiap komponen.',
    buttonLabel: 'Ganti ke UI/UX Designer →'
  },
  design: {
    heading: 'Sisi UI/UX Designer',
    desc: 'Fokus pada alur pengguna, tipografi, dan tampilan yang enak dipandang sekaligus mudah dipakai.',
    buttonLabel: 'Ganti ke Frontend Developer →'
  }
};

let currentArchetype = 'dev';
archetypeBtn.addEventListener('click', () => {
  currentArchetype = currentArchetype === 'dev' ? 'design' : 'dev';
  const data = archetypes[currentArchetype];
  archetypeHeading.textContent = data.heading;
  archetypeDesc.textContent = data.desc;
  archetypeBtn.textContent = data.buttonLabel;
});

// ================= PROJECT FILTER =================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

// ================= SKILL BARS: animate on scroll =================
const skillBars = document.querySelectorAll('.bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const fill = entry.target;
      fill.style.width = fill.dataset.level + '%';
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.4 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ================= SCROLL REVEAL =================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ================= CONTACT FORM VALIDATION =================
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function setError(fieldName, message){
  const row = document.getElementById(fieldName).closest('.form-row');
  const errorEl = form.querySelector(`[data-error-for="${fieldName}"]`);
  if (message){
    row.classList.add('error');
    errorEl.textContent = message;
  } else {
    row.classList.remove('error');
    errorEl.textContent = '';
  }
}

function validateForm(){
  let valid = true;
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name.length < 2){
    setError('name', 'Nama minimal 2 karakter.');
    valid = false;
  } else setError('name', '');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)){
    setError('email', 'Masukkan email yang valid.');
    valid = false;
  } else setError('email', '');

  if (message.length < 10){
    setError('message', 'Pesan minimal 10 karakter.');
    valid = false;
  } else setError('message', '');

  return valid;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formSuccess.classList.remove('show');

  if (validateForm()){
    formSuccess.classList.add('show');
    form.reset();
    setTimeout(() => formSuccess.classList.remove('show'), 4000);
  }
});

// ================= BACK TO TOP =================
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ================= FOOTER YEAR =================
document.getElementById('year').textContent = new Date().getFullYear();