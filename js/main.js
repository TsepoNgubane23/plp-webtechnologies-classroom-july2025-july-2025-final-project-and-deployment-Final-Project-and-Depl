/* main.js
   Responsible for:
   - header nav toggle (mobile)
   - updating year in footer
   - contact form validation & feedback
   - accessible focus handling (small helpers)
*/

// NAV TOGGLE
const navToggle = document.querySelectorAll('#navToggle');
const mainNavs = document.querySelectorAll('#mainNav');

navToggle.forEach(btn => {
  btn.addEventListener('click', () => {
    // there are multiple pages referencing the same script; find the nav in same header
    const header = btn.closest('.header-inner');
    const nav = header ? header.querySelector('#mainNav') : document.getElementById('mainNav');
    if (!nav) return;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? '' : 'flex';
  });
});

// UPDATE YEAR ON ALL FOOTERS
document.querySelectorAll('#year, #year2, #year3').forEach(el => {
  if (el) el.textContent = new Date().getFullYear();
});

/* ---------------------------
   Contact form validation
   --------------------------- */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop actual sending (demo)
    const name = document.getElementById('fullname');
    const email = document.getElementById('email');
    const msg = document.getElementById('messageField');
    const feedback = document.getElementById('formFeedback');

    // simple validation functions (reusable)
    function isNotEmpty(field) { return field && field.value.trim().length > 0; }
    function isEmail(val) {
      // small, pragmatic regex
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }

    // check
    if (!isNotEmpty(name) || !isNotEmpty(email) || !isNotEmpty(msg)) {
      feedback.textContent = '⚠️ Please fill in all fields.';
      feedback.style.color = 'crimson';
      return;
    }
    if (!isEmail(email.value)) {
      feedback.textContent = '⚠️ Please enter a valid email address.';
      feedback.style.color = 'crimson';
      return;
    }

    // success — mimic sending
    feedback.textContent = '✅ Message sent! I will reply as soon as possible.';
    feedback.style.color = 'green';

    // reset after brief pause
    setTimeout(() => {
      form.reset();
    }, 900);
  });
}
