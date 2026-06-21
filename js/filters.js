/* ============================================================
   EDITING PRO — Filter Gallery Data & Logic
   ============================================================ */

'use strict';

const FiltersDB = {
  categories: [
    {
      id: 'cinematic',
      name: '🎬 Cinematic',
      filters: [
        { id: 'c1', name: 'Teal & Orange', emoji: '🧡', css: 'hue-rotate(15deg) saturate(1.3)', gradient: 'linear-gradient(135deg,#1a3a3a,#8b4500)', paid: false },
        { id: 'c2', name: 'Noir', emoji: '⬛', css: 'grayscale(0.8) contrast(1.2)', gradient: 'linear-gradient(135deg,#1a1a1a,#4a4a4a)', paid: false },
        { id: 'c3', name: 'Epic Blue', emoji: '💙', css: 'hue-rotate(200deg) saturate(1.4)', gradient: 'linear-gradient(135deg,#001833,#0047ab)', paid: false },
        { id: 'c4', name: 'Golden Hour', emoji: '🌅', css: 'sepia(0.4) brightness(1.1) saturate(1.3)', gradient: 'linear-gradient(135deg,#8b4500,#ffd700)', paid: false },
        { id: 'c5', name: 'Blockbuster', emoji: '🎥', css: 'contrast(1.15) saturate(1.2) hue-rotate(-5deg)', gradient: 'linear-gradient(135deg,#2d0000,#8b0000)', paid: false },
        { id: 'c6', name: 'Overcast', emoji: '🌫️', css: 'brightness(0.9) saturate(0.7)', gradient: 'linear-gradient(135deg,#808080,#a0a0a0)', paid: false },
        { id: 'c7', name: 'HDR Ultra', emoji: '⚡', css: 'contrast(1.3) saturate(1.5)', gradient: 'linear-gradient(135deg,#002244,#ff6600)', paid: true },
        { id: 'c8', name: 'Film Burn', emoji: '🔥', css: 'sepia(0.6) hue-rotate(-20deg) contrast(1.2)', gradient: 'linear-gradient(135deg,#8b2500,#ff8c00)', paid: true },
      ]
    },
    {
      id: 'vintage',
      name: '📷 Vintage',
      filters: [
        { id: 'v1', name: 'Kodak 400', emoji: '🟤', css: 'sepia(0.5) saturate(0.9) brightness(1.05)', gradient: 'linear-gradient(135deg,#8b6914,#d4a017)', paid: false },
        { id: 'v2', name: 'Polaroid', emoji: '📸', css: 'sepia(0.3) brightness(1.1) contrast(0.9)', gradient: 'linear-gradient(135deg,#d4c5a9,#f5f0e8)', paid: false },
        { id: 'v3', name: 'VHS', emoji: '📼', css: 'saturate(1.4) hue-rotate(10deg) brightness(0.85)', gradient: 'linear-gradient(135deg,#1a0040,#400060)', paid: false },
        { id: 'v4', name: '70s Grain', emoji: '🎞️', css: 'sepia(0.7) saturate(1.2) hue-rotate(-15deg)', gradient: 'linear-gradient(135deg,#8b5e3c,#d4890a)', paid: false },
        { id: 'v5', name: 'Faded', emoji: '☁️', css: 'brightness(1.15) contrast(0.85) saturate(0.8)', gradient: 'linear-gradient(135deg,#b0a090,#d0c0b0)', paid: false },
        { id: 'v6', name: 'Super 8', emoji: '🎬', css: 'sepia(0.4) contrast(1.1) brightness(0.95)', gradient: 'linear-gradient(135deg,#5c3a1e,#a0620a)', paid: false },
      ]
    },
    {
      id: 'portrait',
      name: '🤳 Portrait',
      filters: [
        { id: 'p1', name: 'Soft Skin', emoji: '🌸', css: 'brightness(1.1) saturate(0.9) contrast(0.95)', gradient: 'linear-gradient(135deg,#ffb6c1,#ffc0cb)', paid: false },
        { id: 'p2', name: 'Beauty', emoji: '💄', css: 'brightness(1.15) saturate(1.1) contrast(0.92)', gradient: 'linear-gradient(135deg,#ff69b4,#ff1493)', paid: false },
        { id: 'p3', name: 'Warm Glow', emoji: '✨', css: 'brightness(1.1) sepia(0.2) saturate(1.2)', gradient: 'linear-gradient(135deg,#ffa07a,#ff7f50)', paid: false },
        { id: 'p4', name: 'Studio', emoji: '🎭', css: 'contrast(1.1) brightness(1.05) saturate(1.15)', gradient: 'linear-gradient(135deg,#ffffff,#e0e0e0)', paid: false },
        { id: 'p5', name: 'Matte Skin', emoji: '🪞', css: 'contrast(0.9) brightness(1.1) saturate(0.8)', gradient: 'linear-gradient(135deg,#d4b8a8,#c4a898)', paid: false },
        { id: 'p6', name: 'Dreamy', emoji: '💭', css: 'brightness(1.2) saturate(0.85) contrast(0.88)', gradient: 'linear-gradient(135deg,#e8d5f5,#d5e8f5)', paid: true },
      ]
    },
    {
      id: 'landscape',
      name: '🏔️ Landscape',
      filters: [
        { id: 'l1', name: 'Nature', emoji: '🌿', css: 'saturate(1.4) hue-rotate(-10deg) brightness(1.05)', gradient: 'linear-gradient(135deg,#228b22,#006400)', paid: false },
        { id: 'l2', name: 'Sunset', emoji: '🌇', css: 'hue-rotate(-20deg) saturate(1.5) brightness(1.05)', gradient: 'linear-gradient(135deg,#ff4500,#ff8c00)', paid: false },
        { id: 'l3', name: 'Blue Sky', emoji: '☀️', css: 'hue-rotate(190deg) saturate(1.3)', gradient: 'linear-gradient(135deg,#00bfff,#1e90ff)', paid: false },
        { id: 'l4', name: 'Misty', emoji: '🌁', css: 'brightness(1.05) saturate(0.7) contrast(0.9)', gradient: 'linear-gradient(135deg,#b0c4d0,#90a4b0)', paid: false },
        { id: 'l5', name: 'Vibrant', emoji: '🎆', css: 'saturate(1.8) contrast(1.1)', gradient: 'linear-gradient(135deg,#ff0080,#7700ff)', paid: false },
        { id: 'l6', name: 'Autumn', emoji: '🍂', css: 'sepia(0.3) hue-rotate(-30deg) saturate(1.4)', gradient: 'linear-gradient(135deg,#8b0000,#d4560a)', paid: false },
      ]
    },
    {
      id: 'food',
      name: '🍕 Food',
      filters: [
        { id: 'f1', name: 'Tasty', emoji: '😋', css: 'saturate(1.5) contrast(1.1) brightness(1.05)', gradient: 'linear-gradient(135deg,#ff6b35,#f7c59f)', paid: false },
        { id: 'f2', name: 'Warm Food', emoji: '🍜', css: 'sepia(0.25) saturate(1.4) brightness(1.08)', gradient: 'linear-gradient(135deg,#c8860a,#f5c842)', paid: false },
        { id: 'f3', name: 'Fresh', emoji: '🥗', css: 'saturate(1.6) brightness(1.1) contrast(1.05)', gradient: 'linear-gradient(135deg,#52b788,#40916c)', paid: false },
        { id: 'f4', name: 'Restaurant', emoji: '🍽️', css: 'contrast(1.15) brightness(1.03) saturate(1.25)', gradient: 'linear-gradient(135deg,#2c1503,#7b3f00)', paid: false },
      ]
    },
    {
      id: 'fashion',
      name: '👗 Fashion',
      filters: [
        { id: 'fa1', name: 'Vogue', emoji: '👠', css: 'contrast(1.2) brightness(1.05) saturate(1.1)', gradient: 'linear-gradient(135deg,#000000,#333333)', paid: false },
        { id: 'fa2', name: 'Editorial', emoji: '📰', css: 'grayscale(0.3) contrast(1.15)', gradient: 'linear-gradient(135deg,#1a1a1a,#5a5a5a)', paid: false },
        { id: 'fa3', name: 'Pastel', emoji: '🎀', css: 'brightness(1.2) saturate(0.9) contrast(0.88)', gradient: 'linear-gradient(135deg,#ffb3ba,#baffc9)', paid: false },
        { id: 'fa4', name: 'High End', emoji: '💎', css: 'contrast(1.25) brightness(1.02)', gradient: 'linear-gradient(135deg,#2c3e50,#4ca1af)', paid: true },
      ]
    },
    {
      id: 'bw',
      name: '⬛ B&W',
      filters: [
        { id: 'bw1', name: 'Classic', emoji: '🖤', css: 'grayscale(1) contrast(1.1)', gradient: 'linear-gradient(135deg,#000000,#888888)', paid: false },
        { id: 'bw2', name: 'High Contrast', emoji: '◼', css: 'grayscale(1) contrast(1.4) brightness(0.95)', gradient: 'linear-gradient(135deg,#000000,#ffffff)', paid: false },
        { id: 'bw3', name: 'Soft B&W', emoji: '🌫️', css: 'grayscale(1) brightness(1.1) contrast(0.85)', gradient: 'linear-gradient(135deg,#888888,#cccccc)', paid: false },
        { id: 'bw4', name: 'Silver', emoji: '🪙', css: 'grayscale(0.9) brightness(1.15) contrast(0.95)', gradient: 'linear-gradient(135deg,#909090,#c0c0c0)', paid: false },
        { id: 'bw5', name: 'Dramatic', emoji: '⚫', css: 'grayscale(1) contrast(1.5) brightness(0.85)', gradient: 'linear-gradient(135deg,#000000,#555555)', paid: false },
      ]
    },
    {
      id: 'neon',
      name: '🌈 Neon',
      filters: [
        { id: 'n1', name: 'Neon Pink', emoji: '💗', css: 'hue-rotate(300deg) saturate(2) brightness(1.1)', gradient: 'linear-gradient(135deg,#ff00ff,#ff69b4)', paid: false },
        { id: 'n2', name: 'Cyber Blue', emoji: '💠', css: 'hue-rotate(180deg) saturate(2) brightness(1.1)', gradient: 'linear-gradient(135deg,#00ffff,#0080ff)', paid: false },
        { id: 'n3', name: 'Neon Green', emoji: '💚', css: 'hue-rotate(80deg) saturate(2) brightness(1.1)', gradient: 'linear-gradient(135deg,#00ff00,#00cc00)', paid: false },
        { id: 'n4', name: 'Purple Rain', emoji: '💜', css: 'hue-rotate(270deg) saturate(1.8)', gradient: 'linear-gradient(135deg,#7b00d4,#b000ff)', paid: false },
        { id: 'n5', name: 'Neon Dreams', emoji: '🌃', css: 'hue-rotate(220deg) saturate(1.9) brightness(1.05)', gradient: 'linear-gradient(135deg,#120038,#6600ff)', paid: false },
        { id: 'n6', name: 'Synthwave', emoji: '🎹', css: 'hue-rotate(280deg) saturate(1.7) contrast(1.1)', gradient: 'linear-gradient(135deg,#2d0054,#ff0080)', paid: true },
      ]
    },
    {
      id: 'filmgrain',
      name: '🎞️ Film Grain',
      filters: [
        { id: 'fg1', name: 'Light Grain', emoji: '✦', css: 'contrast(1.05) brightness(0.98)', gradient: 'linear-gradient(135deg,#3a3a3a,#5a5a5a)', paid: false },
        { id: 'fg2', name: 'Heavy Grain', emoji: '▦', css: 'contrast(1.1) brightness(0.92) saturate(0.9)', gradient: 'linear-gradient(135deg,#1a1a1a,#404040)', paid: false },
        { id: 'fg3', name: 'Fuji Film', emoji: '🎞', css: 'sepia(0.15) saturate(1.1) contrast(1.05)', gradient: 'linear-gradient(135deg,#1e5828,#ff5733)', paid: false },
      ]
    },
    {
      id: 'dreamy',
      name: '💫 Dreamy',
      filters: [
        { id: 'd1', name: 'Soft Dream', emoji: '☁️', css: 'brightness(1.25) saturate(0.8) contrast(0.85)', gradient: 'linear-gradient(135deg,#e8d5f5,#d5e8f5)', paid: false },
        { id: 'd2', name: 'Fairy Tale', emoji: '🧚', css: 'hue-rotate(260deg) brightness(1.2) saturate(0.9)', gradient: 'linear-gradient(135deg,#d8b4fe,#a78bfa)', paid: false },
        { id: 'd3', name: 'Pastel Sky', emoji: '🌤️', css: 'brightness(1.3) saturate(0.75) contrast(0.88)', gradient: 'linear-gradient(135deg,#bfdbfe,#ddd6fe)', paid: false },
        { id: 'd4', name: 'Cloud Nine', emoji: '🌈', css: 'brightness(1.2) saturate(1.1) contrast(0.9)', gradient: 'linear-gradient(135deg,#fbcfe8,#a5f3fc)', paid: true },
      ]
    },
    {
      id: 'urban',
      name: '🏙️ Urban',
      filters: [
        { id: 'u1', name: 'Street', emoji: '🛣️', css: 'contrast(1.2) saturate(1.1) brightness(0.95)', gradient: 'linear-gradient(135deg,#2c2c2c,#555555)', paid: false },
        { id: 'u2', name: 'City Night', emoji: '🌉', css: 'brightness(0.8) saturate(1.5) hue-rotate(190deg)', gradient: 'linear-gradient(135deg,#000033,#003366)', paid: false },
        { id: 'u3', name: 'Grunge', emoji: '🔩', css: 'contrast(1.25) saturate(0.75) brightness(0.9)', gradient: 'linear-gradient(135deg,#1a1205,#3d2b05)', paid: false },
        { id: 'u4', name: 'Industrial', emoji: '🏭', css: 'grayscale(0.4) contrast(1.2) brightness(0.92)', gradient: 'linear-gradient(135deg,#3d3d3d,#6d6d6d)', paid: false },
      ]
    },
    {
      id: 'moody',
      name: '🌑 Moody',
      filters: [
        { id: 'm1', name: 'Dark Mood', emoji: '🖤', css: 'brightness(0.8) contrast(1.2) saturate(0.9)', gradient: 'linear-gradient(135deg,#0a0a0a,#2a2a3a)', paid: false },
        { id: 'm2', name: 'Deep Blue', emoji: '🌊', css: 'hue-rotate(200deg) brightness(0.75) contrast(1.15)', gradient: 'linear-gradient(135deg,#001133,#003366)', paid: false },
        { id: 'm3', name: 'Rainy Day', emoji: '🌧️', css: 'brightness(0.85) saturate(0.6) contrast(1.1)', gradient: 'linear-gradient(135deg,#404040,#606070)', paid: false },
        { id: 'm4', name: 'Void', emoji: '⬛', css: 'brightness(0.7) contrast(1.3) saturate(0.5)', gradient: 'linear-gradient(135deg,#000000,#1a1a2e)', paid: false },
        { id: 'm5', name: 'Crimson Dark', emoji: '🔴', css: 'hue-rotate(350deg) brightness(0.75) saturate(1.5)', gradient: 'linear-gradient(135deg,#1a0000,#4a0000)', paid: true },
      ]
    },
  ],

  getAll() {
    return this.categories.flatMap(c => c.filters);
  },

  getById(id) {
    return this.getAll().find(f => f.id === id);
  },

  getCategoryById(id) {
    return this.categories.find(c => c.id === id);
  }
};

// ── Filter Gallery Renderer ────────────────────────────────────
const FilterGallery = (() => {
  let activeFilter = null;
  let activeCategory = 'all';

  function renderCategoryTabs(container) {
    const tabs = document.createElement('div');
    tabs.className = 'filter-cat-tabs';
    tabs.style.cssText = 'display:flex;gap:6px;overflow-x:auto;padding-bottom:8px;margin-bottom:12px;';

    const allBtn = createTab('all', 'All', activeCategory === 'all');
    tabs.appendChild(allBtn);

    FiltersDB.categories.forEach(cat => {
      tabs.appendChild(createTab(cat.id, cat.name, activeCategory === cat.id));
    });
    container.appendChild(tabs);
  }

  function createTab(id, name, active) {
    const btn = document.createElement('button');
    btn.style.cssText = `
      padding:5px 12px;border-radius:999px;border:1px solid ${active ? 'var(--purple)' : 'var(--border-subtle)'};
      background:${active ? 'rgba(124,58,237,0.2)' : 'var(--bg-card)'};
      color:${active ? 'var(--purple-light)' : 'var(--text-secondary)'};
      font-size:0.72rem;font-weight:600;cursor:pointer;white-space:nowrap;
      font-family:var(--font-display);transition:all 0.15s;
    `;
    btn.textContent = name;
    btn.onclick = () => {
      activeCategory = id;
      const parent = btn.closest('.sidebar-content') || btn.closest('.filter-panel');
      if (parent) renderFilters(parent, true);
    };
    return btn;
  }

  function renderFilters(container, refresh = false) {
    if (refresh) container.innerHTML = '';
    if (!refresh) renderCategoryTabs(container);

    const filters = activeCategory === 'all'
      ? FiltersDB.getAll()
      : (FiltersDB.getCategoryById(activeCategory)?.filters || []);

    const grid = document.createElement('div');
    grid.className = 'filter-gallery';

    filters.forEach(f => {
      const item = document.createElement('div');
      item.className = `filter-thumb ${f.id === activeFilter ? 'active' : ''} ${f.paid ? 'paid-filter' : ''}`;
      item.dataset.filterId = f.id;
      item.innerHTML = `
        <div class="filter-thumb-preview" style="background:${f.gradient};">
          <span style="font-size:1.6rem;">${f.emoji}</span>
          ${f.paid ? '<div style="position:absolute;top:4px;right:4px;font-size:0.6rem;padding:2px 5px;background:rgba(251,191,36,0.3);border:1px solid rgba(251,191,36,0.4);border-radius:3px;color:var(--gold);">PRO</div>' : ''}
        </div>
        <div class="filter-thumb-name">${f.name}</div>
      `;
      item.addEventListener('click', () => applyFilter(f));
      grid.appendChild(item);
    });

    container.appendChild(grid);
  }

  function applyFilter(filter) {
    if (filter.paid && EP.user.plan === 'normal' && !EP.user.trialActive) {
      openUpgradeModal(`the "${filter.name}" filter`);
      return;
    }

    activeFilter = filter.id;

    // Visual feedback
    document.querySelectorAll('.filter-thumb').forEach(el => {
      el.classList.toggle('active', el.dataset.filterId === filter.id);
    });

    // Apply to preview canvas
    const canvas = document.querySelector('.main-canvas, .canvas-preview-img');
    if (canvas) {
      canvas.style.filter = filter.css;
    }

    EP.editor.activeFilter = filter;
    toast.success(`Filter applied: ${filter.name} ✨`);
  }

  function resetFilter() {
    activeFilter = null;
    const canvas = document.querySelector('.main-canvas, .canvas-preview-img');
    if (canvas) canvas.style.filter = '';
    document.querySelectorAll('.filter-thumb').forEach(el => el.classList.remove('active'));
    toast.info('Filter reset');
  }

  return { render: renderFilters, apply: applyFilter, reset: resetFilter };
})();
