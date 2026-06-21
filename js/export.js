/* ============================================================
   EDITING PRO — Export Options & Quality Selector
   ============================================================ */

'use strict';

const ExportPanel = (() => {
  const videoQualities = [
    {
      id: 'q_4k_120',
      name: '4K 120fps',
      desc: '3840×2160 · 120fps · Ultra Premium',
      paid: true,
      price: '$22',
      icon: '👑',
      badge: 'PREMIUM'
    },
    {
      id: 'q_4k_60',
      name: '4K 60fps',
      desc: '3840×2160 · 60fps',
      paid: true,
      price: 'Legend Plan',
      icon: '⚡',
      badge: 'PRO'
    },
    {
      id: 'q_1080_120',
      name: '1080p 120fps',
      desc: '1920×1080 · 120fps · HD',
      paid: false,
      icon: '🎬',
      badge: 'FREE'
    },
    {
      id: 'q_1080_60',
      name: '1080p 60fps',
      desc: '1920×1080 · 60fps · HD',
      paid: false,
      icon: '🎬',
      badge: 'FREE'
    },
    {
      id: 'q_720_120',
      name: '720p 120fps',
      desc: '1280×720 · 120fps',
      paid: false,
      icon: '▶️',
      badge: 'FREE'
    },
    {
      id: 'q_720_60',
      name: '720p 60fps',
      desc: '1280×720 · 60fps',
      paid: false,
      icon: '▶️',
      badge: 'FREE'
    },
    {
      id: 'q_360_60',
      name: '360p 60fps',
      desc: '640×360 · 60fps · Mobile',
      paid: false,
      icon: '📱',
      badge: 'FREE'
    },
    {
      id: 'q_360_30',
      name: '360p 30fps',
      desc: '640×360 · 30fps · Mobile',
      paid: false,
      icon: '📱',
      badge: 'FREE'
    },
  ];

  const photoQualities = [
    {
      id: 'ph_original',
      name: 'Original Quality',
      desc: 'Export at original resolution',
      paid: false,
      icon: '📸',
      badge: 'FREE'
    },
    {
      id: 'ph_hd',
      name: 'HD Quality',
      desc: 'Up to 1920×1080',
      paid: false,
      icon: '🖼️',
      badge: 'FREE'
    },
    {
      id: 'ph_ultra',
      name: 'Ultra Resolution',
      desc: 'AI-enhanced ultra quality',
      paid: true,
      price: 'Pro Plan',
      icon: '🔬',
      badge: 'PRO'
    },
    {
      id: 'ph_super_ultra',
      name: 'Super Ultra Res',
      desc: 'Maximum quality AI upscale',
      paid: true,
      price: 'Legend Plan',
      icon: '🚀',
      badge: 'LEGEND'
    },
  ];

  const formats = {
    video: ['MP4 (H.264)', 'MP4 (H.265)', 'MOV (ProRes)', 'WebM (VP9)', 'AVI', 'GIF', 'WEBP Animated'],
    photo: ['JPEG', 'PNG (Lossless)', 'WebP', 'TIFF', 'RAW', 'HEIC'],
  };

  let selectedQuality = 'q_1080_60';
  let selectedFormat = 'MP4 (H.264)';
  let exportMode = 'video';

  function renderSidebarPanel(container) {
    container.innerHTML = `
      <div class="prop-group">
        <div class="prop-group-title">📤 Export Quality</div>
        <div class="export-format-tabs" style="margin-bottom:12px;">
          <button class="export-format-tab ${exportMode === 'video' ? 'active' : ''}" onclick="ExportPanel.setMode('video', this)">🎬 Video</button>
          <button class="export-format-tab ${exportMode === 'photo' ? 'active' : ''}" onclick="ExportPanel.setMode('photo', this)">📸 Photo</button>
        </div>
        <div id="quality-list" class="export-quality-grid"></div>
      </div>
      <div class="prop-group" id="format-group">
        <div class="prop-group-title">Format</div>
        <select class="prop-select" id="format-select" onchange="ExportPanel.setFormat(this.value)">
          ${(formats[exportMode] || formats.video).map(f => `<option ${f === selectedFormat ? 'selected' : ''}>${f}</option>`).join('')}
        </select>
      </div>
      <div class="prop-group" id="advanced-group">
        <div class="prop-group-title">Advanced Settings</div>
        <div class="prop-row">
          <span class="prop-label">Bitrate</span>
          <select class="prop-select" style="width:120px;">
            <option>Auto (Recommended)</option>
            <option>High (50 Mbps)</option>
            <option>Ultra (100 Mbps)</option>
            <option>Custom</option>
          </select>
        </div>
        <div class="prop-row">
          <span class="prop-label">Color Space</span>
          <select class="prop-select" style="width:120px;">
            <option>sRGB</option>
            <option>Rec.709</option>
            <option>Rec.2020</option>
          </select>
        </div>
        <div class="prop-row">
          <span class="prop-label">HDR</span>
          <label class="toggle"><input type="checkbox"><span class="toggle-slider"></span></label>
        </div>
      </div>
      <button class="btn btn-primary w-full" onclick="ExportPanel.openExportModal()" style="justify-content:center;margin-top:8px;">
        📤 Export Now
      </button>
    `;

    renderQualityList();
  }

  function renderQualityList() {
    const list = document.getElementById('quality-list');
    if (!list) return;

    const qualities = exportMode === 'video' ? videoQualities : photoQualities;
    list.innerHTML = qualities.map(q => {
      const isLocked = q.paid && EP.user.plan === 'normal' && !EP.user.trialActive;
      const isSelected = selectedQuality === q.id;
      const badgeColors = {
        FREE: 'rgba(16,185,129,0.2)',
        PRO: 'rgba(124,58,237,0.2)',
        PREMIUM: 'rgba(251,191,36,0.2)',
        LEGEND: 'rgba(251,191,36,0.2)',
      };
      const badgeTextColors = {
        FREE: 'var(--green)',
        PRO: 'var(--purple-light)',
        PREMIUM: 'var(--gold)',
        LEGEND: 'var(--gold)',
      };

      return `
        <div class="quality-option ${isSelected ? 'selected' : ''} ${isLocked ? 'locked' : ''}"
             onclick="ExportPanel.selectQuality('${q.id}', ${q.paid})">
          <div class="quality-radio"></div>
          <div style="font-size:1.1rem;">${q.icon}</div>
          <div class="quality-info">
            <div class="quality-name">${q.name}</div>
            <div class="quality-desc">${q.desc}${q.price ? ` · <span style="color:var(--gold)">${q.price}</span>` : ''}</div>
          </div>
          <span style="font-size:0.65rem;padding:2px 7px;border-radius:3px;font-weight:700;background:${badgeColors[q.badge]||badgeColors.FREE};color:${badgeTextColors[q.badge]||badgeTextColors.FREE};">${q.badge}</span>
          ${isLocked ? '<span class="quality-lock">🔒</span>' : ''}
        </div>
      `;
    }).join('');
  }

  function selectQuality(id, isPaid) {
    if (isPaid && EP.user.plan === 'normal' && !EP.user.trialActive) {
      const q = videoQualities.concat(photoQualities).find(q => q.id === id);
      if (id === 'q_4k_120') {
        // Special purchase flow
        openPremiumExportModal();
      } else {
        openUpgradeModal(q ? `"${q.name}" export quality` : 'premium export quality');
      }
      return;
    }
    selectedQuality = id;
    renderQualityList();
  }

  function setMode(mode, btn) {
    exportMode = mode;
    selectedQuality = mode === 'video' ? 'q_1080_60' : 'ph_original';
    selectedFormat  = mode === 'video' ? 'MP4 (H.264)' : 'JPEG';
    document.querySelectorAll('.export-format-tab').forEach(b => b.classList.remove('active'));
    btn?.classList.add('active');
    const formatSelect = document.getElementById('format-select');
    if (formatSelect) {
      formatSelect.innerHTML = (formats[mode] || formats.video).map(f => `<option>${f}</option>`).join('');
    }
    renderQualityList();
  }

  function setFormat(fmt) {
    selectedFormat = fmt;
  }

  function openPremiumExportModal() {
    modal.create(`
      <div style="text-align:center;margin-bottom:24px;">
        <div style="font-size:2.5rem;margin-bottom:12px;">👑</div>
        <h2 style="font-family:var(--font-display);font-size:1.4rem;font-weight:800;margin-bottom:8px;">4K 120fps Premium Export</h2>
        <p style="color:var(--text-secondary);font-size:0.9rem;">The highest quality export option in Editing Pro</p>
      </div>
      <div style="background:rgba(251,191,36,0.05);border:1px solid rgba(251,191,36,0.2);border-radius:var(--radius-lg);padding:16px;margin-bottom:20px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
          <span style="font-size:1.5rem;">🎬</span>
          <div>
            <div style="font-weight:700;">4K 120fps · H.265/H.264</div>
            <div style="font-size:0.8rem;color:var(--text-muted);">3840×2160 · Ultra Premium Quality</div>
          </div>
          <div style="margin-left:auto;font-family:var(--font-display);font-size:1.5rem;font-weight:900;color:var(--gold);">$22</div>
        </div>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:6px;font-size:0.8rem;color:var(--text-secondary);">
          <li>✅ One-time purchase per export</li>
          <li>✅ Available for this project only</li>
          <li>✅ Includes all color grading</li>
          <li>✅ HDR support</li>
        </ul>
      </div>
      <button onclick="ExportPanel.purchasePremiumExport()" class="btn btn-gold w-full btn-lg" style="justify-content:center;margin-bottom:10px;">
        💳 Purchase & Export — $22
      </button>
      <p style="font-size:0.75rem;color:var(--text-muted);text-align:center;margin-bottom:16px;">Secure payment · Instant download</p>
      <div style="text-align:center;">
        <span style="font-size:0.8rem;color:var(--text-muted);">Or upgrade to </span>
        <span onclick="upgradePlan('legend');modal.close();" style="font-size:0.8rem;color:var(--gold);font-weight:700;cursor:pointer;">Legend Plan ($40/mo)</span>
        <span style="font-size:0.8rem;color:var(--text-muted);"> for unlimited 4K exports</span>
      </div>
      <button data-modal-close style="position:absolute;top:16px;right:16px;width:30px;height:30px;border-radius:50%;background:var(--bg-card);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">✕</button>
    `);
  }

  function purchasePremiumExport() {
    modal.close();
    simulateExport('4K 120fps', true);
  }

  function openExportModal() {
    if (!EP.user.loggedIn) { openAuth('login'); return; }

    const q = videoQualities.concat(photoQualities).find(q => q.id === selectedQuality);
    modal.create(`
      <h2 style="font-family:var(--font-display);font-size:1.4rem;font-weight:800;margin-bottom:6px;">📤 Export Project</h2>
      <p style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:20px;">Project: <strong>${EP.editor.projectName}</strong></p>
      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:14px;margin-bottom:16px;display:flex;align-items:center;gap:12px;">
        <span style="font-size:1.5rem;">${q?.icon || '📤'}</span>
        <div>
          <div style="font-weight:700;">${q?.name || '1080p 60fps'}</div>
          <div style="font-size:0.8rem;color:var(--text-muted);">${q?.desc || ''} · ${selectedFormat}</div>
        </div>
        <span style="margin-left:auto;font-size:0.75rem;padding:3px 8px;border-radius:3px;background:rgba(16,185,129,0.15);color:var(--green);font-weight:700;">${q?.badge || 'FREE'}</span>
      </div>
      <div id="export-progress-area" style="display:none;margin-bottom:16px;">
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:8px;" id="export-status">Preparing export...</div>
        <div class="progress-bar"><div class="progress-fill" id="export-progress" style="width:0%"></div></div>
      </div>
      <button onclick="ExportPanel.startExport()" id="export-start-btn" class="btn btn-primary w-full btn-lg" style="justify-content:center;margin-bottom:10px;">
        📤 Start Export
      </button>
      <button data-modal-close class="btn btn-secondary w-full" style="justify-content:center;">Cancel</button>
      <button data-modal-close style="position:absolute;top:16px;right:16px;width:30px;height:30px;border-radius:50%;background:var(--bg-card);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">✕</button>
    `);
  }

  function startExport() {
    const q = videoQualities.concat(photoQualities).find(q => q.id === selectedQuality);
    document.getElementById('export-start-btn')?.remove();
    simulateExport(q?.name || '1080p 60fps', false, true);
  }

  function simulateExport(qualityName, directDownload = false, inModal = false) {
    if (inModal) {
      const progressArea = document.getElementById('export-progress-area');
      const statusEl = document.getElementById('export-status');
      const progressEl = document.getElementById('export-progress');

      if (progressArea) progressArea.style.display = 'block';

      const steps = [
        { msg: '🔄 Analyzing timeline...', pct: 15 },
        { msg: '🎨 Applying color grading...', pct: 30 },
        { msg: '✨ Processing effects...', pct: 50 },
        { msg: '🎬 Encoding video...', pct: 70 },
        { msg: '🎵 Mixing audio...', pct: 85 },
        { msg: '📦 Finalizing...', pct: 95 },
        { msg: '✅ Export complete!', pct: 100 },
      ];

      let i = 0;
      const interval = setInterval(() => {
        if (i >= steps.length) {
          clearInterval(interval);
          setTimeout(() => {
            modal.close();
            toast.success(`🎉 "${qualityName}" export complete! Download started.`, 4000);
          }, 500);
          return;
        }
        if (statusEl) statusEl.textContent = steps[i].msg;
        if (progressEl) progressEl.style.width = steps[i].pct + '%';
        i++;
      }, 600);
    } else {
      toast.success(`🎉 "${qualityName}" export complete! (Demo mode)`, 4000);
    }
  }

  return { renderSidebarPanel, selectQuality, setMode, setFormat, openExportModal, startExport, openPremiumExportModal, purchasePremiumExport };
})();
