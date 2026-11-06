(() => {
  'use strict';
  const config = window.PROPOSTA_CONFIG || {};
  const sections = [...document.querySelectorAll('main > section')];
  const links = [...document.querySelectorAll('.main-nav a')];
  const previous = document.querySelector('#previous');
  const next = document.querySelector('#next');
  let current = 0;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const go = (index) => sections[Math.max(0, Math.min(index, sections.length - 1))].scrollIntoView({ behavior: motion.matches ? 'instant' : 'smooth' });
  previous.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));
  function update() {
    const reference = innerHeight * .38;
    let closest = 0;
    sections.forEach((section, index) => { if (section.getBoundingClientRect().top <= reference) closest = index; });
    if (closest !== current || !document.body.dataset.ready) {
      current = closest;
      document.body.dataset.ready = 'true';
      links.forEach((link, index) => index === current ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current'));
      previous.disabled = current === 0;
      next.disabled = current === sections.length - 1;
      document.querySelector('#page-count').innerHTML = `0${current + 1} <span>/ 04</span>`;
    }
    const range = document.documentElement.scrollHeight - innerHeight;
    document.querySelector('#progress').style.transform = `scaleX(${range > 0 ? scrollY / range : 0})`;
  }
  let scheduled = false;
  addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(() => { update(); scheduled = false; }); } }, { passive: true });
  addEventListener('resize', update);
  update();
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  sections.forEach(section => observer.observe(section));
  if (config.designerLogo) document.querySelector('#designer-logo').src = config.designerLogo;
  const clientLogo = document.querySelector('#client-logo');
  const placeholder = document.querySelector('#client-placeholder');
  if (config.clientLogo) {
    clientLogo.addEventListener('load', () => { clientLogo.hidden = false; placeholder.hidden = true; });
    clientLogo.addEventListener('error', () => { clientLogo.hidden = true; placeholder.hidden = false; });
    clientLogo.src = config.clientLogo;
  }
  document.querySelector('#client-name').textContent = config.clientName || 'Sua marca aqui';
  const contact = document.querySelector('#whatsapp-button');
  const dialog = document.querySelector('#contact-dialog');
  let validContact = false;
  try { const url = new URL(config.whatsappUrl); validContact = url.protocol === 'https:' && ['wa.me','api.whatsapp.com','web.whatsapp.com'].includes(url.hostname); } catch {}
  if (validContact) { contact.href = config.whatsappUrl; contact.target = '_blank'; contact.rel = 'noopener noreferrer'; }
  else { contact.setAttribute('aria-haspopup', 'dialog'); contact.addEventListener('click', event => { event.preventDefault(); dialog.showModal(); }); }
  document.querySelectorAll('.close-dialog,.close-contact').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
})();
