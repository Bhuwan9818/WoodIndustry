/* =============================================
   WoodCraft Pallets – Enhanced JS (Optimized)
   Performance: lazy images, throttled cursor,
   RAF parallax, passive listeners
   ============================================= */

(function () {
  'use strict';

  /* ─── PAGE LOADER ──────────────────────────── */
  window.addEventListener('load', function () {
    setTimeout(function () {
      var loader = document.getElementById('page-loader');
      if (loader) loader.classList.add('loaded');
    }, 1200);
  });

  /* ─── CUSTOM CURSOR (throttled, RAF) ────────── */
  (function () {
    if (window.matchMedia('(hover: none)').matches) return;
    var cursor   = document.getElementById('cursor');
    var follower = document.getElementById('cursor-follower');
    if (!cursor || !follower) return;

    var mx = -200, my = -200, fx = -200, fy = -200;
    var moved = false;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY; moved = true;
    }, { passive: true });

    (function loop() {
      if (moved) {
        cursor.style.transform = 'translate(' + (mx - 5) + 'px,' + (my - 5) + 'px)';
        moved = false;
      }
      fx += (mx - fx) * 0.1;
      fy += (my - fy) * 0.1;
      follower.style.transform = 'translate(' + (fx - 18) + 'px,' + (fy - 18) + 'px)';
      requestAnimationFrame(loop);
    })();

    // Grow on hover — use event delegation instead of per-element listeners
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest('a, button, .product-card')) {
        cursor.style.width  = '16px';
        cursor.style.height = '16px';
        follower.style.borderColor = 'rgba(200,146,42,0.9)';
        follower.style.transform += ' scale(1.5)';
      }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('a, button, .product-card')) {
        cursor.style.width  = '10px';
        cursor.style.height = '10px';
        follower.style.borderColor = 'rgba(200,146,42,0.6)';
      }
    });
  })();

  /* ─── HERO CAROUSEL ─────────────────────────── */
  (function () {
    var slides   = document.querySelectorAll('.carousel-slide');
    var dots     = document.querySelectorAll('.dot');
    var prevBtn  = document.getElementById('carousel-prev');
    var nextBtn  = document.getElementById('carousel-next');
    var pFill    = document.getElementById('carousel-progress-fill');
    if (!slides.length) return;

    var current   = 0;
    var total     = slides.length;
    var timer     = null;
    var pTimer    = null;
    var progress  = 0;
    var busy      = false;
    var DURATION  = 6000;
    var TICK      = 80; // less frequent ticks = less CPU
    var loaded    = [true, false, false, false]; // slide 1 already loaded

    /* Lazy load a slide's background image */
    function lazyLoadSlide(idx) {
      if (loaded[idx]) return;
      var bg = slides[idx] && slides[idx].querySelector('.slide-bg');
      if (!bg) return;
      var src = bg.dataset.src;
      if (!src) return;
      var img = new window.Image();
      img.onload = function () {
        bg.style.backgroundImage = "url('" + src + "')";
        loaded[idx] = true;
      };
      img.src = src;
    }

    /* Pre-load next slide */
    function preloadNext(idx) {
      var next = (idx + 1) % total;
      lazyLoadSlide(next);
    }

    function goTo(idx) {
      if (busy || idx === current) return;
      busy = true;

      var prev = current;
      current = ((idx % total) + total) % total;

      // Lazy-load target slide before showing
      lazyLoadSlide(current);
      preloadNext(current);

      // Fade out old
      slides[prev].classList.add('slide-exit');
      slides[prev].classList.remove('active');

      // Short delay so browser can paint
      setTimeout(function () {
        slides[current].classList.add('active');
        slides[current].classList.remove('slide-enter', 'slide-visible');
        slides[prev].classList.remove('slide-exit');

        // Update dots
        dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
        busy = false;
      }, 900);

      resetProgress();
    }

    function next() { goTo((current + 1) % total); }
    function prev() { goTo((current - 1 + total) % total); }

    function resetProgress() {
      clearInterval(pTimer);
      clearTimeout(timer);
      progress = 0;
      if (pFill) pFill.style.width = '0%';

      pTimer = setInterval(function () {
        progress += (TICK / DURATION) * 100;
        if (pFill) pFill.style.width = Math.min(progress, 100) + '%';
        if (progress >= 100) clearInterval(pTimer);
      }, TICK);

      timer = setTimeout(next, DURATION);
    }

    // Controls
    if (nextBtn) nextBtn.addEventListener('click', function () { clearTimeout(timer); clearInterval(pTimer); next(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { clearTimeout(timer); clearInterval(pTimer); prev(); });
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        clearTimeout(timer); clearInterval(pTimer);
        goTo(parseInt(dot.dataset.dot, 10));
      });
    });

    // Touch swipe
    var txStart = 0;
    var hero = document.getElementById('hero');
    if (hero) {
      hero.addEventListener('touchstart', function (e) { txStart = e.touches[0].clientX; }, { passive: true });
      hero.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].clientX - txStart;
        if (Math.abs(dx) > 60) { clearTimeout(timer); dx < 0 ? next() : prev(); }
      }, { passive: true });
      // Pause on hover/focus — saves CPU when user is interacting
      hero.addEventListener('mouseenter', function () { clearTimeout(timer); clearInterval(pTimer); });
      hero.addEventListener('mouseleave', function () { resetProgress(); });
    }

    // Keyboard
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { clearTimeout(timer); next(); }
      if (e.key === 'ArrowLeft')  { clearTimeout(timer); prev(); }
    });

    // Preload slide 2 after 2s (not immediately)
    setTimeout(function () { lazyLoadSlide(1); }, 2000);

    resetProgress();
  })();

  /* ─── STAT COUNTERS ─────────────────────────── */
  function animCount(el, target, dur) {
    var start = 0, step = target / (dur / 16), raf;
    function tick() {
      start = Math.min(start + step, target);
      el.textContent = Math.floor(start);
      if (start < target) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
  }

  setTimeout(function () {
    document.querySelectorAll('.hstat-num[data-target]').forEach(function (el) {
      animCount(el, parseInt(el.dataset.target, 10), 1800);
    });
  }, 1300);

  var counterIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        animCount(e.target, parseInt(e.target.dataset.target, 10), 1600);
        counterIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter[data-target]').forEach(function (el) { counterIO.observe(el); });

  /* ─── SCROLL ANIMATIONS ─────────────────────── */
  (function () {
    var els = document.querySelectorAll('.anim-fade-up, .anim-slide-left, .anim-slide-right');
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var delay = e.target.style.getPropertyValue('--delay') || '0s';
          e.target.style.transitionDelay = delay;
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ─── PRODUCT CARDS FADE IN ─────────────────── */
  function initCardFade() {
    var cards = document.querySelectorAll('.product-card');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('card-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    cards.forEach(function (card, i) {
      card.style.transitionDelay = (i * 0.07) + 's';
      io.observe(card);
    });
  }
  setTimeout(initCardFade, 400);

  /* ─── PARALLAX — throttled, IntersectionObserver gated ── */
  (function () {
    var bg = document.getElementById('why-parallax');
    if (!bg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var inView = false, ticking = false;
    // Only run scroll handler when section is visible
    var sectionIO = new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView) bg.querySelector('img').style.willChange = 'transform';
      else bg.querySelector('img').style.willChange = 'auto';
    }, { rootMargin: '100px' });
    sectionIO.observe(bg.parentElement || bg);

    window.addEventListener('scroll', function () {
      if (!inView || ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var rect = bg.parentElement.getBoundingClientRect();
        var vh = window.innerHeight;
        var prog = (vh - rect.top) / (vh + rect.height);
        var offset = (prog - 0.5) * 70;
        bg.style.transform = 'translateY(' + offset + 'px)';
        ticking = false;
      });
    }, { passive: true });
  })();

  /* ─── BACK TO TOP ───────────────────────────── */
  (function () {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    var visible = false;
    window.addEventListener('scroll', function () {
      var should = window.scrollY > 500;
      if (should !== visible) { btn.classList.toggle('visible', should); visible = should; }
    }, { passive: true });
    btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  })();

  /* ─── HEADER SCROLL ─────────────────────────── */
  (function () {
    var header = document.getElementById('site-header');
    if (!header) return;
    var scrolled = false;
    window.addEventListener('scroll', function () {
      var should = window.scrollY > 40;
      if (should !== scrolled) { header.classList.toggle('scrolled', should); scrolled = should; }
    }, { passive: true });
  })();

  /* ─── MOBILE NAV ────────────────────────────── */
  (function () {
    var ham  = document.getElementById('hamburger');
    var nav  = document.getElementById('main-nav');
    var hdr  = document.getElementById('site-header');
    if (!ham || !nav) return;
    ham.addEventListener('click', function () {
      var open = ham.classList.toggle('open');
      nav.classList.toggle('open', open);
      ham.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        ham.classList.remove('open'); nav.classList.remove('open');
        ham.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', function (e) {
      if (hdr && !hdr.contains(e.target)) {
        ham.classList.remove('open'); nav.classList.remove('open');
        ham.setAttribute('aria-expanded', 'false');
      }
    });
  })();

  /* ─── HOMEPAGE PRODUCTS ─────────────────────── */
  (function () {
    var grid = document.getElementById('featured-products');
    if (!grid || typeof PRODUCTS === 'undefined') return;
    grid.innerHTML = PRODUCTS.slice(0, 6).map(buildProductCard).join('');
    setTimeout(initCardFade, 200);
  })();

  /* ─── MODAL ─────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    var closeBtn = document.getElementById('modal-close');
    var overlay  = document.getElementById('modal-overlay');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay)  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
  });

  /* ─── CONTACT PRE-FILL ──────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    var sel = document.getElementById('product');
    if (!sel) return;
    var param = new URLSearchParams(window.location.search).get('product');
    if (param) {
      var opt = Array.from(sel.options).find(function (o) { return o.value === param; });
      if (opt) sel.value = param;
    }
  });

})();

/* ─── PRODUCT CARD CSS (inject once) ────────────── */
(function () {
  var style = document.createElement('style');
  style.textContent = [
    '.product-card { opacity: 0; transform: translateY(28px);',
    '  transition: opacity .55s ease, transform .55s cubic-bezier(.16,1,.3,1),',
    '    box-shadow .4s ease, border-color .3s ease; }',
    '.product-card.card-visible { opacity: 1; transform: translateY(0); }'
  ].join('\n');
  document.head.appendChild(style);
})();

/* ─── PRODUCT CARD BUILDER ──────────────────────── */
function buildProductCard(p) {
  var catLabel = { pallet: 'Pallet', crate: 'Crate / Box', custom: 'Custom' }[p.category] || p.category;
  var chips = Object.entries(p.specs).slice(0, 3)
    .map(function (kv) { return '<span class="meta-chip">' + kv[1] + '</span>'; }).join('');
  return '<article class="product-card" data-id="' + p.id + '" data-category="' + p.category +
    '" data-tags="' + p.tags.join(',') + '" itemscope itemtype="https://schema.org/Product">' +
    '<div class="product-visual"><div class="product-illustration">' +
    '<span class="product-emoji" aria-hidden="true">' + p.emoji + '</span></div>' +
    '<div class="product-category-badge">' + catLabel + '</div></div>' +
    '<div class="product-card-body"><h3 itemprop="name">' + p.name + '</h3>' +
    '<p itemprop="description">' + p.shortDesc + '</p>' +
    '<div class="product-card-meta">' + chips + '</div>' +
    '<div class="product-card-actions">' +
    '<button class="btn-sm-outline" onclick="openProductModal(' + p.id + ')">View Details</button>' +
    '<a href="contact.html?product=' + encodeURIComponent(p.name) + '" class="btn-wood">Enquire</a>' +
    '</div></div></article>';
}
window.buildProductCard = buildProductCard;

/* ─── MODAL ─────────────────────────────────────── */
function openProductModal(id) {
  var p = (typeof PRODUCTS !== 'undefined') ? PRODUCTS.find(function (x) { return x.id === id; }) : null;
  if (!p) return;
  var overlay = document.getElementById('modal-overlay');
  var content = document.getElementById('modal-content');
  if (!overlay || !content) return;

  var catLabel = { pallet: 'Pallet', crate: 'Crate / Box', custom: 'Custom Solution' }[p.category] || p.category;
  var specsHTML = Object.entries(p.specs).map(function (kv) {
    return '<div class="spec-item"><div class="spec-key">' + kv[0] + '</div><div class="spec-val">' + kv[1] + '</div></div>';
  }).join('');
  var featHTML = p.features.map(function (f) { return '<li>' + f + '</li>'; }).join('');

  content.innerHTML =
    '<div class="modal-visual" aria-hidden="true">' + p.emoji + '</div>' +
    '<div class="modal-header"><span class="etag">' + catLabel + '</span>' +
    '<h2 id="modal-title">' + p.name + '</h2></div>' +
    '<p class="modal-desc">' + p.description + '</p>' +
    '<div class="modal-specs"><h4>Specifications</h4><div class="specs-grid">' + specsHTML + '</div></div>' +
    '<div class="modal-features"><h4>Key Features</h4><ul>' + featHTML + '</ul></div>' +
    '<div class="modal-actions">' +
    '<a href="contact.html?product=' + encodeURIComponent(p.name) + '" class="btn btn-primary">Send Enquiry</a>' +
    '<a href="contact.html" class="btn-sm-outline">General Enquiry</a></div>';

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  var overlay = document.getElementById('modal-overlay');
  if (overlay) { overlay.classList.remove('active'); document.body.style.overflow = ''; }
}
window.openProductModal = openProductModal;
window.closeModal = closeModal;
