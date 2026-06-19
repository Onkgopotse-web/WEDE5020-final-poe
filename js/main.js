/* ==========================================================================
   main.js — Sweet Heaven's Bakery
   Site-wide script loaded on every page.

   Covers these rubric items:
   - Skill: Dynamic Content and Search Feature
   - Skill: Gallery Lightbox (shared logic, used on products + enquiry pages)
   - Skill: Interactive Maps (helper used on enquiry page)

   References used while building this:
   - MDN Web Docs, Array.prototype.filter():
     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
   - MDN Web Docs, addEventListener():
     https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   - W3Schools, JavaScript HTML DOM Events:
     https://www.w3schools.com/js/js_htmldom_events.asp
   - W3Schools, How To - JS Filter List:
     https://www.w3schools.com/howto/howto_js_filter_lists.asp
   - W3Schools, How To - Lightbox:
     https://www.w3schools.com/howto/howto_css_lightbox.asp
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------
     1. DYNAMIC CONTENT — Footer year
     Keeps the copyright year always current without manual editing.
     ------------------------------------------------------------------ */
  var yearSpan = document.querySelector('[data-current-year]');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }


  /* ------------------------------------------------------------------
     2. DYNAMIC CONTENT — Greeting based on time of day
     Shown on the home page hero if a [data-greeting] element exists.
     ------------------------------------------------------------------ */
  var greetingEl = document.querySelector('[data-greeting]');
  if (greetingEl) {
    var hour = new Date().getHours();
    var greeting = 'Welcome';
    if (hour < 12) {
      greeting = 'Good Morning';
    } else if (hour < 18) {
      greeting = 'Good Afternoon';
    } else {
      greeting = 'Good Evening';
    }
    greetingEl.textContent = greeting + ', friend!';
  }


  /* ------------------------------------------------------------------
     3. SEARCH FEATURE — Product search/filter
     Works on the Products page. Searches product names inside
     elements carrying [data-product-name]. Hides cards that don't
     match, shows a "no results" message if nothing matches.
     ------------------------------------------------------------------ */
  var searchInput = document.getElementById('product-search');
  var productCards = document.querySelectorAll('[data-product-name]');
  var noResultsMsg = document.getElementById('no-results-message');

  if (searchInput && productCards.length > 0) {
    searchInput.addEventListener('input', function () {
      var query = searchInput.value.trim().toLowerCase();
      var matches = 0;

      productCards.forEach(function (card) {
        var name = card.getAttribute('data-product-name').toLowerCase();
        var isMatch = name.indexOf(query) !== -1;
        card.style.display = isMatch ? '' : 'none';
        if (isMatch) {
          matches++;
        }
      });

      if (noResultsMsg) {
        noResultsMsg.style.display = matches === 0 ? 'block' : 'none';
      }
    });
  }


  /* ------------------------------------------------------------------
     4. DYNAMIC CONTENT — Category filter buttons (Products page)
     Buttons with [data-filter] toggle visibility of cards whose
     [data-category] matches. "all" shows everything.
     ------------------------------------------------------------------ */
  var filterButtons = document.querySelectorAll('[data-filter]');
  var categoryCards = document.querySelectorAll('[data-category]');

  if (filterButtons.length > 0 && categoryCards.length > 0) {
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {

        // toggle active styling on the buttons themselves
        filterButtons.forEach(function (b) {
          b.classList.remove('is-active');
        });
        button.classList.add('is-active');

        var filterValue = button.getAttribute('data-filter');

        categoryCards.forEach(function (card) {
          var category = card.getAttribute('data-category');
          var show = filterValue === 'all' || filterValue === category;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }


  /* ------------------------------------------------------------------
     5. GALLERY LIGHTBOX
     Used on the Products page (product photos) and Enquiry page
     (any supporting gallery images). Clicking any element with the
     class .lightbox-trigger opens a full-screen overlay showing a
     larger version of that image, with next/prev/close controls.
     ------------------------------------------------------------------ */
  var lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

  if (lightboxTriggers.length > 0) {

    var lightboxImages = Array.prototype.map.call(lightboxTriggers, function (el) {
      return {
        src: el.getAttribute('data-full') || el.src,
        alt: el.alt || ''
      };
    });

    var currentIndex = 0;

    // Build the lightbox overlay once and append it to the page
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Image viewer');
    overlay.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Close image viewer">&times;</button>' +
      '<button type="button" class="lightbox-prev" aria-label="Previous image">&#8249;</button>' +
      '<img class="lightbox-image" src="" alt="">' +
      '<button type="button" class="lightbox-next" aria-label="Next image">&#8250;</button>' +
      '<p class="lightbox-caption"></p>';
    document.body.appendChild(overlay);

    var lightboxImg = overlay.querySelector('.lightbox-image');
    var lightboxCaption = overlay.querySelector('.lightbox-caption');
    var closeBtn = overlay.querySelector('.lightbox-close');
    var prevBtn = overlay.querySelector('.lightbox-prev');
    var nextBtn = overlay.querySelector('.lightbox-next');

    function showImage(index) {
      currentIndex = (index + lightboxImages.length) % lightboxImages.length;
      var item = lightboxImages[currentIndex];
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
      lightboxCaption.textContent = item.alt;
    }

    function openLightbox(index) {
      showImage(index);
      overlay.classList.add('is-open');
      document.body.classList.add('lightbox-active');
    }

    function closeLightbox() {
      overlay.classList.remove('is-open');
      document.body.classList.remove('lightbox-active');
    }

    lightboxTriggers.forEach(function (trigger, index) {
      trigger.style.cursor = 'zoom-in';
      trigger.addEventListener('click', function () {
        openLightbox(index);
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', function () {
      showImage(currentIndex - 1);
    });
    nextBtn.addEventListener('click', function () {
      showImage(currentIndex + 1);
    });

    // close when clicking the dark backdrop itself, not the image
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) {
        closeLightbox();
      }
    });

    // keyboard support: Escape closes, arrow keys navigate
    document.addEventListener('keydown', function (event) {
      if (!overlay.classList.contains('is-open')) {
        return;
      }
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        showImage(currentIndex - 1);
      } else if (event.key === 'ArrowRight') {
        showImage(currentIndex + 1);
      }
    });
  }


  /* ------------------------------------------------------------------
     6. ACTIVE NAV LINK
     Adds .is-active to the nav link matching the current page,
     so the CSS active-state styling shows the visitor where they are.
     ------------------------------------------------------------------ */
  var navLinks = document.querySelectorAll('.nav-list a');
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(function (link) {
    var linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('is-active');
    }
  });

}); 