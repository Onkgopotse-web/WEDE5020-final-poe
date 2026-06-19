document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------
     1. DYNAMIC CONTENT — Footer year
     ------------------------------------------------------------------ */
  const yearSpan = document.querySelector('[data-current-year]');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     2. DYNAMIC CONTENT — Greeting based on time of day
     ------------------------------------------------------------------ */
  const greetingEl = document.querySelector('[data-greeting]');
  if (greetingEl) {
    const hour = new Date().getHours();
    let greeting = 'Welcome';
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 18) greeting = 'Good Afternoon';
    else greeting = 'Good Evening';
    greetingEl.textContent = `${greeting}, friend!`;
  }

  /* ------------------------------------------------------------------
     3. SEARCH FEATURE — Product search/filter
     ------------------------------------------------------------------ */
  const searchInput = document.querySelector('#search');
  const items = document.querySelectorAll('.searchable-item');

  if (searchInput && items.length > 0) {
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.toLowerCase().trim();
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(term) ? 'block' : 'none';
      });
    });
  }

  /* ------------------------------------------------------------------
     5. GALLERY LIGHTBOX
     ------------------------------------------------------------------ */
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

  if (lightboxTriggers.length > 0) {
    const lightboxImages = Array.from(lightboxTriggers).map(el => ({
      src: el.getAttribute('data-full') || el.src,
      alt: el.alt || ''
    }));

    let currentIndex = 0;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Image viewer');
    overlay.innerHTML = `
      <button type="button" class="lightbox-close" aria-label="Close image viewer">&times;</button>
      <button type="button" class="lightbox-prev" aria-label="Previous image">&#8249;</button>
      <img class="lightbox-image" src="" alt="">
      <button type="button" class="lightbox-next" aria-label="Next image">&#8250;</button>
      <p class="lightbox-caption"></p>
    `;
    document.body.appendChild(overlay);

    const lightboxImg = overlay.querySelector('.lightbox-image');
    const lightboxCaption = overlay.querySelector('.lightbox-caption');
    const closeBtn = overlay.querySelector('.lightbox-close');
    const prevBtn = overlay.querySelector('.lightbox-prev');
    const nextBtn = overlay.querySelector('.lightbox-next');

    const showImage = index => {
      currentIndex = (index + lightboxImages.length) % lightboxImages.length;
      const item = lightboxImages[currentIndex];
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
      lightboxCaption.textContent = item.alt;
    };

    const openLightbox = index => {
      showImage(index);
      overlay.classList.add('is-open');
      document.body.classList.add('lightbox-active');
    };

    const closeLightbox = () => {
      overlay.classList.remove('is-open');
      document.body.classList.remove('lightbox-active');
    };

    lightboxTriggers.forEach((trigger, index) => {
      trigger.style.cursor = 'zoom-in';
      trigger.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

    overlay.addEventListener('click', event => {
      if (event.target === overlay) closeLightbox();
    });

    document.addEventListener('keydown', event => {
      if (!overlay.classList.contains('is-open')) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (event.key === 'ArrowRight') showImage(currentIndex + 1);
    });
  }

  /* ------------------------------------------------------------------
     6. ACTIVE NAV LINK
     ------------------------------------------------------------------ */
  const navLinks = document.querySelectorAll('.nav-list a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) link.classList.add('is-active');
  });
});
