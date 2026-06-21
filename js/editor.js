/* ============================================================
   EDITING PRO — Main Editor Workspace Orchestrator
   ============================================================ */

'use strict';

const Editor = (() => {
  let editorMode = 'video'; // video | photo
  let leftTab = 'video';    // video | photo | filters | audio | ai
  let rightTab = 'props';   // props | export
  let uploadedFile = null;

  function init() {
    // Build left sidebar content
    buildLeftSidebar();

    // Build right panel content
    buildRightPanel();

    // Build timeline
    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer) Timeline.render(timelineContainer);

    // Init Xeno
    XenoAI.init();

    // Canvas upload area
    initCanvasUpload();

    // Keyboard shortcuts
    initKeyboardShortcuts();

    // Project name
    const nameInput = document.getElementById('project-name');
    if (nameInput) {
      nameInput.addEventListener('change', () => {
        EP.editor.projectName = nameInput.value || 'Untitled Project';
        toast.info(`Project renamed to "${EP.editor.projectName}"`);
      });
    }

    // Update topbar token display
    updateTokenDisplay();
  }

  function buildLeftSidebar() {
    const sidebar = document.getElementById('left-sidebar-content');
    if (!sidebar) return;

    // Render video tools by default
    ToolsPanel.render(sidebar, editorMode);
  }

  function buildRightPanel() {
    const panel = document.getElementById('right-panel-content');
    if (!panel) return;

    // Default: show basic adjust controls
    panel.innerHTML = `
      <div class="prop-group">
        <div class="prop-group-title">Transform</div>
        <div class="prop-row">
          <span class="prop-label">Position X</span>
          <span class="prop-value" id="val-px">0</span>
        </div>
        <input type="range" class="prop-slider" min="-500" max="500" value="0" oninput="document.getElementById('val-px').textContent=this.value">
        <div class="prop-row">
          <span class="prop-label">Position Y</span>
          <span class="prop-value" id="val-py">0</span>
        </div>
        <input type="range" class="prop-slider" min="-500" max="500" value="0" oninput="document.getElementById('val-py').textContent=this.value">
        <div class="prop-row">
          <span class="prop-label">Scale</span>
          <span class="prop-value" id="val-sc">100%</span>
        </div>
        <input type="range" class="prop-slider" min="10" max="300" value="100" oninput="document.getElementById('val-sc').textContent=this.value+'%'">
        <div class="prop-row">
          <span class="prop-label">Rotation</span>
          <span class="prop-value" id="val-rt">0°</span>
        </div>
        <input type="range" class="prop-slider" min="-180" max="180" value="0" oninput="document.getElementById('val-rt').textContent=this.value+'°'">
        <div class="prop-row">
          <span class="prop-label">Opacity</span>
          <span class="prop-value" id="val-op">100%</span>
        </div>
        <input type="range" class="prop-slider" min="0" max="100" value="100" oninput="document.getElementById('val-op').textContent=this.value+'%'">
      </div>

      <div class="prop-group">
        <div class="prop-group-title">Color Adjust</div>
        <div class="prop-row">
          <span class="prop-label">Brightness</span>
          <span class="prop-value" id="val-br">0</span>
        </div>
        <input type="range" class="prop-slider" min="-100" max="100" value="0" oninput="document.getElementById('val-br').textContent=this.value">
        <div class="prop-row">
          <span class="prop-label">Contrast</span>
          <span class="prop-value" id="val-co">0</span>
        </div>
        <input type="range" class="prop-slider" min="-100" max="100" value="0" oninput="document.getElementById('val-co').textContent=this.value">
        <div class="prop-row">
          <span class="prop-label">Saturation</span>
          <span class="prop-value" id="val-sa">0</span>
        </div>
        <input type="range" class="prop-slider" min="-100" max="100" value="0" oninput="document.getElementById('val-sa').textContent=this.value">
        <div class="prop-row">
          <span class="prop-label">Exposure</span>
          <span class="prop-value" id="val-ex">0</span>
        </div>
        <input type="range" class="prop-slider" min="-100" max="100" value="0" oninput="document.getElementById('val-ex').textContent=this.value">
      </div>

      <div class="prop-group">
        <div class="prop-group-title">Clip Info</div>
        <div class="prop-row">
          <span class="prop-label">Duration</span>
          <span class="prop-value">0:30</span>
        </div>
        <div class="prop-row">
          <span class="prop-label">Resolution</span>
          <span class="prop-value">1920×1080</span>
        </div>
        <div class="prop-row">
          <span class="prop-label">FPS</span>
          <span class="prop-value">60fps</span>
        </div>
        <div class="prop-row">
          <span class="prop-label">Codec</span>
          <span class="prop-value">H.264</span>
        </div>
      </div>

      <div class="upgrade-prompt">
        <span class="upgrade-prompt-icon">⚡</span>
        <div class="upgrade-prompt-text">
          Unlock <strong>AI tools</strong> &amp; advanced effects with <strong>Pro</strong>
        </div>
        <button class="upgrade-prompt-btn" onclick="openUpgradeModal('Pro features')">Upgrade</button>
      </div>
    `;
  }

  // ── Sidebar Tab Switching ──────────────────────────────────
  function switchLeftTab(tab) {
    leftTab = tab;
    document.querySelectorAll('.sidebar-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tab);
    });

    const content = document.getElementById('left-sidebar-content');
    if (!content) return;
    content.innerHTML = '';

    const searchWrapper = document.getElementById('sidebar-search-wrapper');

    if (tab === 'video') {
      if (searchWrapper) searchWrapper.style.display = '';
      ToolsPanel.render(content, 'video');
    } else if (tab === 'photo') {
      if (searchWrapper) searchWrapper.style.display = '';
      ToolsPanel.render(content, 'photo');
    } else if (tab === 'filters') {
      if (searchWrapper) searchWrapper.style.display = 'none';
      FilterGallery.render(content);
    } else if (tab === 'audio') {
      if (searchWrapper) searchWrapper.style.display = '';
      ToolsPanel.render(content, 'video');
      // Scroll to audio section
      setTimeout(() => {
        const audioSection = content.querySelector('[data-cat="Audio Tools"]');
        audioSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (tab === 'ai') {
      if (searchWrapper) searchWrapper.style.display = 'none';
      renderAIToolsPanel(content);
    }
  }

  function renderAIToolsPanel(container) {
    container.innerHTML = `
      <div style="padding:12px 0;">
        <div style="text-align:center;margin-bottom:16px;">
          <div style="font-size:2rem;margin-bottom:6px;">🤖</div>
          <div style="font-family:var(--font-display);font-weight:700;font-size:0.95rem;color:var(--purple-light);">Xeno AI Tools</div>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Powered by Xeno AI</div>
        </div>
        ${[
          { icon:'🧹', name:'BG Remove',      desc:'Remove video/photo background',  free: true, action:'ai_bg' },
          { icon:'📝', name:'Auto Subtitle',  desc:'AI speech transcription',        free: false, action:'ai_sub' },
          { icon:'🎨', name:'AI Color Grade', desc:'One-click cinematic color',      free: false, action:'ai_color' },
          { icon:'🎬', name:'Smart Cut',      desc:'AI removes silence & filler',    free: false, action:'ai_cut' },
          { icon:'🪄', name:'Object Remove',  desc:'Remove unwanted objects',        free: false, action:'ai_obj' },
          { icon:'☁️', name:'Sky Replace',    desc:'Replace sky with AI',            free: false, action:'ai_sky' },
          { icon:'🔬', name:'Photo Upscale',  desc:'4x upscale (5 tokens)',          token: 5, action:'ph_upscale' },
          { icon:'👁️', name:'Eye Contact',    desc:'Fix eye contact in videos',      free: false, action:'ai_eye' },
          { icon:'💄', name:'Skin Retouch',   desc:'AI beauty retouching',           free: false, action:'ai_skin' },
          { icon:'🎵', name:'Music Generate', desc:'AI background music',            free: false, action:'ai_music' },
          { icon:'🌫️', name:'Denoise Video', desc:'Remove video noise (FREE)',       free: true, action:'noise_r' },
          { icon:'📷', name:'Stabilize',      desc:'AI stabilization (FREE)',        free: true, action:'stabilize' },
        ].map(t => `
          <div onclick="ToolsPanel.activate('${t.action}', ${!t.free && !t.token}, ${t.token || 0})"
               style="display:flex;align-items:center;gap:10px;padding:10px 8px;border-radius:var(--radius-md);cursor:pointer;transition:background 0.15s;margin-bottom:4px;"
               onmouseover="this.style.background='var(--bg-card-hover)'" onmouseout="this.style.background=''">
            <span style="font-size:1.4rem;">${t.icon}</span>
            <div style="flex:1;">
              <div style="font-size:0.82rem;font-weight:600;">${t.name}</div>
              <div style="font-size:0.68rem;color:var(--text-muted);">${t.desc}</div>
            </div>
            ${t.free ? '<span style="font-size:0.6rem;padding:2px 5px;background:rgba(16,185,129,0.15);color:var(--green);border-radius:3px;font-weight:700;">FREE</span>' : ''}
            ${t.token ? `<span style="font-size:0.6rem;padding:2px 5px;background:rgba(251,191,36,0.15);color:var(--gold);border-radius:3px;font-weight:700;">🪙${t.token}</span>` : ''}
            ${!t.free && !t.token ? '<span style="font-size:0.65rem;color:var(--gold);">🔒</span>' : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // ── Right Panel Tab Switching ──────────────────────────────
  function switchRightTab(tab) {
    rightTab = tab;
    document.querySelectorAll('.right-panel-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tab);
    });

    const content = document.getElementById('right-panel-content');
    if (!content) return;

    if (tab === 'export') {
      ExportPanel.renderSidebarPanel(content);
    } else {
      buildRightPanel();
    }
  }

  // ── Canvas Upload ──────────────────────────────────────────
  function initCanvasUpload() {
    const placeholder = document.getElementById('canvas-placeholder');
    if (!placeholder) return;

    placeholder.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'video/*,image/*';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        handleFileUpload(file);
      };
      input.click();
    });

    // Drag & Drop
    const canvasArea = document.getElementById('canvas-area');
    if (canvasArea) {
      canvasArea.addEventListener('dragover', (e) => { e.preventDefault(); canvasArea.style.background = 'rgba(124,58,237,0.05)'; });
      canvasArea.addEventListener('dragleave', () => { canvasArea.style.background = ''; });
      canvasArea.addEventListener('drop', (e) => {
        e.preventDefault();
        canvasArea.style.background = '';
        const file = e.dataTransfer.files[0];
        if (file) handleFileUpload(file);
      });
    }
  }

  function handleFileUpload(file) {
    uploadedFile = file;
    const isVideo = file.type.startsWith('video/');
    const isPhoto = file.type.startsWith('image/');
    if (!isVideo && !isPhoto) { toast.error('Unsupported file format'); return; }

    const url = URL.createObjectURL(file);
    const placeholder = document.getElementById('canvas-placeholder');
    const canvas = document.getElementById('main-canvas');

    if (!canvas) return;

    if (isVideo) {
      canvas.innerHTML = `
        <video id="preview-video" style="width:100%;height:100%;object-fit:contain;"
               src="${url}" loop muted playsinline></video>
        <div style="position:absolute;top:10px;left:10px;padding:4px 10px;background:rgba(0,0,0,0.6);border-radius:4px;font-size:0.7rem;display:flex;align-items:center;gap:5px;">
          🎬 ${file.name}
        </div>
      `;
      // Update play button to control video
      const playBtn = document.getElementById('main-play-btn');
      if (playBtn) {
        playBtn.onclick = () => {
          const video = document.getElementById('preview-video');
          if (!video) return;
          if (video.paused) { video.play(); playBtn.textContent = '⏸'; }
          else { video.pause(); playBtn.textContent = '▶'; }
        };
      }
    } else if (isPhoto) {
      canvas.innerHTML = `
        <img id="canvas-preview-img" src="${url}" style="width:100%;height:100%;object-fit:contain;"
             alt="Preview" draggable="false">
        <div style="position:absolute;top:10px;left:10px;padding:4px 10px;background:rgba(0,0,0,0.6);border-radius:4px;font-size:0.7rem;display:flex;align-items:center;gap:5px;">
          🖼️ ${file.name}
        </div>
      `;
    }

    EP.editor.mode = isVideo ? 'video' : 'photo';
    toast.success(`✅ Loaded: ${file.name}`);

    // Auto-switch to appropriate tab
    if (isPhoto) switchLeftTab('photo');
  }

  // ── Zoom Controls ──────────────────────────────────────────
  function zoomIn() {
    EP.editor.zoom = Math.min(EP.editor.zoom + 10, 200);
    document.getElementById('zoom-level-display').textContent = EP.editor.zoom + '%';
  }

  function zoomOut() {
    EP.editor.zoom = Math.max(EP.editor.zoom - 10, 25);
    document.getElementById('zoom-level-display').textContent = EP.editor.zoom + '%';
  }

  function resetZoom() {
    EP.editor.zoom = 100;
    document.getElementById('zoom-level-display').textContent = '100%';
  }

  // ── Undo / Redo ────────────────────────────────────────────
  function undo() {
    toast.info('↩ Undo (Demo)');
  }
  function redo() {
    toast.info('↪ Redo (Demo)');
  }

  // ── Keyboard Shortcuts ─────────────────────────────────────
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Don't interfere with text inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && e.key === 'z') { e.preventDefault(); undo(); }
      if (ctrl && e.key === 'y') { e.preventDefault(); redo(); }
      if (ctrl && e.key === 's') { e.preventDefault(); saveProject(); }
      if (ctrl && e.key === 'e') { e.preventDefault(); ExportPanel.openExportModal(); }
      if (e.key === ' ' && !ctrl) { e.preventDefault(); Timeline.togglePlay(); }
      if (e.key === 'ArrowLeft') Timeline.stepBack();
      if (e.key === 'ArrowRight') Timeline.stepForward();
    });
  }

  // ── Token Display ──────────────────────────────────────────
  function updateTokenDisplay() {
    document.querySelectorAll('.token-count').forEach(el => {
      el.textContent = EP.user.tokens;
    });
  }

  // ── Save Project ───────────────────────────────────────────
  function saveProject() {
    toast.success(`💾 Project saved: "${EP.editor.projectName}"`);
  }

  return {
    init,
    switchLeftTab,
    switchRightTab,
    zoomIn,
    zoomOut,
    resetZoom,
    undo,
    redo,
    saveProject,
    updateTokenDisplay,
  };
})();

// ── DOM Ready ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Editor.init();
});
