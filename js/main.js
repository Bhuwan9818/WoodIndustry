// WoodCraft Pallets – Main JS

document.addEventListener('DOMContentLoaded', function () {

  // Nav handled by enhanced.js

  // Products and animations handled by enhanced.js

});

// ── PRODUCT CARD BUILDER ─────────────────────────────
function buildProductCard(p) {
  const categoryLabel = {
    pallet: 'Pallet',
    crate: 'Crate / Box',
    custom: 'Custom Solution'
  }[p.category] || p.category;

  const specEntries = Object.entries(p.specs).slice(0, 3);
  const chips = specEntries.map(([k, v]) => `<span class="meta-chip">${v}</span>`).join('');

  return `
    <article class="product-card fade-in" data-id="${p.id}" data-category="${p.category}" data-tags="${p.tags.join(',')}" itemscope itemtype="https://schema.org/Product">
      <div class="product-visual">
        <div class="product-illustration">
          <span class="product-emoji" aria-hidden="true">${p.emoji}</span>
        </div>
        <div class="product-category-badge">${categoryLabel}</div>
      </div>
      <div class="product-card-body">
        <h3 itemprop="name">${p.name}</h3>
        <p itemprop="description">${p.shortDesc}</p>
        <div class="product-card-meta">${chips}</div>
        <div class="product-card-actions">
          <button class="btn-sm-outline" onclick="openProductModal(${p.id})">View Details</button>
          <a href="contact.html?product=${encodeURIComponent(p.name)}" class="btn btn-primary">Enquire Now</a>
        </div>
      </div>
    </article>
  `;
}

// ── ATTACH CARD EVENTS ───────────────────────────────
function attachCardEvents(container) {
  // Re-init fade-in for newly added cards
  const fadeEls = container.querySelectorAll('.fade-in');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
  fadeEls.forEach(el => io.observe(el));
}

// ── PRODUCT MODAL ────────────────────────────────────
function openProductModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!overlay || !content) return;

  const specsHTML = Object.entries(p.specs).map(([k, v]) => `
    <div class="spec-item">
      <div class="spec-key">${k}</div>
      <div class="spec-val">${v}</div>
    </div>
  `).join('');

  const featuresHTML = p.features.map(f => `<li>${f}</li>`).join('');

  const categoryLabel = {
    pallet: 'Pallet',
    crate: 'Crate / Box',
    custom: 'Custom Solution'
  }[p.category] || p.category;

  content.innerHTML = `
    <div class="modal-visual" aria-hidden="true">${p.emoji}</div>
    <div class="modal-header">
      <span class="section-tag">${categoryLabel}</span>
      <h2 id="modal-title">${p.name}</h2>
    </div>
    <p class="modal-desc">${p.description}</p>
    <div class="modal-specs">
      <h4>Specifications</h4>
      <div class="specs-grid">${specsHTML}</div>
    </div>
    <div class="modal-features">
      <h4>Key Features</h4>
      <ul>${featuresHTML}</ul>
    </div>
    <div class="modal-actions">
      <a href="contact.html?product=${encodeURIComponent(p.name)}" class="btn btn-primary">Send Enquiry for This Product</a>
      <a href="contact.html" class="btn-sm-outline">General Enquiry</a>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Focus trap
  overlay.querySelector('.modal-close')?.focus();
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Expose globally
window.openProductModal = openProductModal;

// Modal close button
document.addEventListener('DOMContentLoaded', function () {
  const closeBtn = document.getElementById('modal-close');
  const overlay = document.getElementById('modal-overlay');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
});

// ── CONTACT PAGE: PRE-FILL PRODUCT ──────────────────
document.addEventListener('DOMContentLoaded', function () {
  const productSelect = document.getElementById('product');
  if (productSelect) {
    const params = new URLSearchParams(window.location.search);
    const preselect = params.get('product');
    if (preselect) {
      const option = [...productSelect.options].find(o => o.value === preselect);
      if (option) productSelect.value = preselect;
    }
  }
});
