/* ===== JOWANA POOLS — main.js ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Dynamic copyright year ── */
  const yearEl = document.getElementById('copy-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── NAV hamburger ── */
  const ham = document.getElementById('hamburger');
  const menu = document.getElementById('navMenu');
  const navbar = document.getElementById('navbar');

  if (ham) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      menu.classList.toggle('open');
    });

    document.querySelectorAll('#navMenu a').forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  }

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ── Scroll reveal ── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ── Before/After sliders ── 
     Only drags when pointer starts on the handle/divider zone.
     Touching the image itself scrolls the page normally.
  */
  function initSlider(el) {
    const after = el.querySelector('.ba-after');
    const divider = el.querySelector('.ba-divider');
    let dragging = false;

    function setPos(clientX) {
      const rect = el.getBoundingClientRect();
      const pct = Math.min(Math.max((clientX - rect.left) / rect.width, 0.03), 0.97);
      after.style.clipPath = `inset(0 ${(1 - pct) * 100}% 0 0)`;
      divider.style.left = `${pct * 100}%`;
    }

    /* Mouse: only start drag when clicking ON the divider element */
    divider.addEventListener('mousedown', e => {
      e.preventDefault();
      dragging = true;
      setPos(e.clientX);
    });

    window.addEventListener('mousemove', e => {
      if (dragging) setPos(e.clientX);
    });

    window.addEventListener('mouseup', () => { dragging = false; });

    /* Touch: only start drag when touching the divider element.
       No passive:false on the slider itself — lets normal scroll work. */
    divider.addEventListener('touchstart', e => {
      dragging = true;
      setPos(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', e => {
      if (dragging) {
        e.preventDefault(); // only prevent scroll while actually dragging the handle
        setPos(e.touches[0].clientX);
      }
    }, { passive: false });

    window.addEventListener('touchend', () => { dragging = false; });
  }

  document.querySelectorAll('.ba-slider').forEach(initSlider);

  /* ── Gallery category nav active state ── */
  const catBtns = document.querySelectorAll('.gallery-cat-btn');
  if (catBtns.length) {
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  /* ── Quote form → WhatsApp ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name    = form.querySelector('#name').value.trim();
      const phone   = form.querySelector('#phone').value.trim();
      const service = form.querySelector('#service').value;
      const message = form.querySelector('#message').value.trim();

      if (!name || !phone) {
        alert('Please enter your name and phone number.');
        return;
      }

      let text = `Hi Jowana Pools! 👋\n\n`;
      text += `*Name:* ${name}\n`;
      text += `*Phone:* ${phone}\n`;
      if (service) text += `*Interested In:* ${service}\n`;
      if (message) text += `*Message:* ${message}\n`;
      text += `\nPlease send me a quote!`;

      window.open(`https://wa.me/270822305335?text=${encodeURIComponent(text)}`, '_blank');
    });
  }

});
