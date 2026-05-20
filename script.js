/* NAV scroll effect */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* Hamburger */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* Typed effect */
const phrases = [
  'SEO Specialist',
  'GEO / AEO Strategist',
  'App Developer',
  'WordPress Developer',
  'React Native Dev',
  'Digital Growth Partner',
];
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 60 : 90);
}
type();

/* Intersection Observer fade-in */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.skill-card, .service-card, .project-card, .cert-card, .why-item, .about-grid, .contact-grid, .result-card, .github-card'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

/* Contact form — Formsubmit.co (free, no signup) */
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const btn    = document.getElementById('submitBtn');
  const btnTxt = document.getElementById('btnText');
  const result = document.getElementById('formResult');

  btnTxt.textContent = 'Sending…';
  btn.disabled = true;
  result.className = 'form-result';
  result.textContent = '';

  const data = new FormData(this);

  try {
    const res = await fetch('https://formsubmit.co/ajax/osiamarlon101@gmail.com', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    });
    const json = await res.json();

    if (json.success === 'true' || json.success === true) {
      result.className = 'form-result success';
      result.textContent = '✓ Message sent! I\'ll get back to you soon.';
      this.reset();
    } else {
      throw new Error('Submission failed');
    }
  } catch {
    result.className = 'form-result error';
    result.textContent = '✗ Something went wrong. Please email me directly at osiamarlon101@gmail.com';
  } finally {
    btnTxt.textContent = 'Send Message';
    btn.disabled = false;
  }
});

/* Smooth active nav link highlight */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
});
