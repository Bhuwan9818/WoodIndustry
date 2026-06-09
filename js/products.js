// WoodCraft Pallets – Products Page JS

document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('all-products-grid');
  const countEl = document.getElementById('product-count');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!grid || typeof PRODUCTS === 'undefined') return;

  // Render all products
  PRODUCTS.forEach(p => {
    grid.innerHTML += buildProductCard(p);
  });

  // Re-init fade in
  attachCardEvents(grid);
  updateCount(PRODUCTS.length);

  // Filter logic
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      let visible = 0;
      grid.querySelectorAll('.product-card').forEach(card => {
        const tags = card.dataset.tags?.split(',') || [];
        const cat = card.dataset.category;
        const show = filter === 'all' || tags.includes(filter) || cat === filter;
        card.classList.toggle('hidden', !show);
        if (show) visible++;
      });
      updateCount(visible);
    });
  });

  function updateCount(n) {
    if (countEl) countEl.textContent = `Showing ${n} product${n !== 1 ? 's' : ''}`;
  }
});
