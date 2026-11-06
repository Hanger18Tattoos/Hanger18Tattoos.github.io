(() => {
  'use strict';
  const data = window.H18;
  if (!data) return;
  const directory = document.getElementById('artist-directory');
  const profiles = document.getElementById('artist-profiles');
  const safe = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const artistBooking = (artist) => `mailto:${encodeURIComponent(artist.bookingEmail || data.shopEmail).replace(/%40/g,'@')}?subject=${encodeURIComponent(`Tattoo booking inquiry — ${artist.name}`)}&body=${encodeURIComponent(`Hello ${artist.name},\n\nI'd like to inquire about a tattoo appointment.\n\nMy tattoo idea:\nApproximate size / placement:\nAvailability:\n\nThank you!`)}`;

  data.artists.forEach((artist, i) => {
    const photoHtml = artist.portrait
      ? `<img src="${safe(artist.portrait)}" alt="Portrait of ${safe(artist.name)}" loading="lazy">`
      : `<div class="missing-portrait" aria-label="Photo of ${safe(artist.name)} coming soon"><span class="portrait-monogram" aria-hidden="true">${safe(artist.initials)}</span><span class="portrait-pending">ARTIST PHOTO<br>COMING SOON</span></div>`;

    const card = document.createElement('a');
    card.className = 'artist-card reveal';
    card.href = '#' + artist.id;
    card.innerHTML = `<div class="artist-card-photo">${photoHtml}<span class="artist-card-n">0${i+1}</span></div><div class="artist-card-meta"><div><span>${safe(artist.role)}</span><strong>${safe(artist.name)}</strong></div><span class="artist-arrow" aria-hidden="true">↗</span></div>`;
    directory.appendChild(card);

    const photoSlots = Math.max(3, artist.gallery.length);
    const photos = Array.from({length:photoSlots}, (_,idx) => {
      const gallery = artist.gallery[idx];
      if (!gallery) return `<div class="portfolio-placeholder"><span class="portfolio-placeholder-number">0${idx+1}</span><span>TATTOO PHOTO<br>COMING SOON</span></div>`;
      const file = typeof gallery === 'string' ? gallery : gallery.src;
      const alt = typeof gallery === 'string' ? `${artist.name} tattoo portfolio image ${idx+1}` : (gallery.alt || `${artist.name} tattoo portfolio image ${idx+1}`);
      return `<button type="button" class="gallery-thumb" data-lightbox-src="${safe(file)}" data-lightbox-alt="${safe(alt)}" aria-label="Enlarge tattoo from ${safe(artist.name)}"><img src="${safe(file)}" alt="${safe(alt)}" loading="lazy" decoding="async"><span aria-hidden="true">↗</span></button>`;
    }).join('');

    const section = document.createElement('article');
    section.className = 'artist-profile';
    section.id = artist.id;
    section.innerHTML = `<div class="container profile-grid"><div class="profile-art reveal"><div class="profile-photo">${photoHtml}</div><span class="profile-photo-note">HANGER 18 / ARTIST 0${i+1}</span></div><div class="profile-copy reveal"><div class="profile-top"><span>ARTIST 0${i+1} / 0${data.artists.length}</span><span>${safe(artist.tag)}</span></div><h3>${safe(artist.name)}</h3><span class="profile-role">${safe(artist.role)}</span><div class="profile-bio">${artist.bio.map(p=>`<p>${safe(p)}</p>`).join('')}</div><div class="profile-links"><a class="button button-gold" href="${artistBooking(artist)}">BOOK WITH ${safe(artist.name.split(' ')[0]).toUpperCase()} <span aria-hidden="true">↗</span></a>${artist.instagram ? `<a class="inline-link" target="_blank" rel="noopener noreferrer" href="${safe(artist.instagram)}">INSTAGRAM ↗</a>` : ''}</div><a class="profile-full-link" href="artists/${safe(artist.id)}.html">VIEW FULL ARTIST PORTFOLIO ↗</a><div class="portfolio-heading"><strong>SELECTED WORK</strong><span>PORTFOLIO / 0${i+1}</span></div><div class="portfolio-grid">${photos}</div></div></div>`;
    profiles.appendChild(section);
  });

  // Remote preview images can become unavailable. Display an honest fallback, not a broken icon.
  document.querySelectorAll('.artist-card-photo img, .profile-photo img, .gallery-thumb img, .studio-work-grid img').forEach(image => {
    image.addEventListener('error', () => {
      const wrap = image.parentElement;
      if (!wrap) return;
      if (wrap.classList.contains('gallery-thumb')) {
        wrap.setAttribute('disabled','');
        wrap.removeAttribute('data-lightbox-src');
      }
      image.remove();
      const fallback=document.createElement('div');
      fallback.className='image-unavailable';
      fallback.innerHTML='<span>PHOTO COMING SOON</span><small>See Instagram or ask the artist</small>';
      wrap.prepend(fallback);
    }, {once:true});
  });

  // Mobile navigation.
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('menu-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('nav-open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }));
  }

  document.getElementById('year').textContent = String(new Date().getFullYear());

  // Accessible gallery preview for when real portfolio images are uploaded.
  const lightbox = document.getElementById('lightbox');
  const close = document.getElementById('lightbox-close');
  const img = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  let lastTrigger;
  profiles.addEventListener('click', ev => {
    const trigger = ev.target.closest('[data-lightbox-src]');
    if (!trigger) return;
    lastTrigger = trigger;
    img.src = trigger.dataset.lightboxSrc;
    img.alt = trigger.dataset.lightboxAlt || '';
    caption.textContent = img.alt;
    if (typeof lightbox.showModal === 'function') lightbox.showModal();
  });
  close.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', ev => { if (ev.target === lightbox) lightbox.close(); });
  lightbox.addEventListener('close', () => {img.removeAttribute('src');lastTrigger?.focus();});

  // Small reveal animation, disabled when users prefer reduced motion.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible');o.unobserve(entry.target); }
      });
    }, {threshold:.08,rootMargin:'0px 0px 65px 0px'});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
})();
