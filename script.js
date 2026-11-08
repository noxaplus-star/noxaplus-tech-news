// ===== LANGUAGE TOGGLE =====
const LANG_KEY = 'noxaplus_lang';
let currentLang = localStorage.getItem(LANG_KEY) || 'en';

function applyLang(lang) {
  const html = document.documentElement;
  const toggle = document.getElementById('langToggle');

  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
  document.body.setAttribute('lang', lang);

  toggle.textContent = lang === 'en' ? 'فارسی' : 'English';

  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`) || el.getAttribute('data-en');
  });

  // placeholders
  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    el.placeholder = el.getAttribute(`data-${lang}-placeholder`) || el.getAttribute('data-en-placeholder');
  });

  localStorage.setItem(LANG_KEY, lang);
  currentLang = lang;
}

function toggleLang() {
  applyLang(currentLang === 'en' ? 'fa' : 'en');
}

// ===== MOBILE MENU =====
function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  nav.classList.toggle('open');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  applyLang(currentLang);

  // Close mobile nav on link click
  document.querySelectorAll('.mobile-nav a').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('mobileNav').classList.remove('open');
    });
  });

  // Newsletter form feedback
  const form = document.querySelector('.newsletter form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = document.getElementById('emailInput');
      const btn = form.querySelector('button');
      if (input.value.includes('@')) {
        btn.textContent = currentLang === 'fa' ? '✓ ثبت شد!' : '✓ Subscribed!';
        btn.style.background = '#22c55e';
        input.value = '';
        setTimeout(() => {
          btn.textContent = currentLang === 'fa' ? 'عضویت' : 'Subscribe';
          btn.style.background = '';
        }, 3000);
      }
    });
  }
});
