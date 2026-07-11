/* ============================================================
   EDITING PRO — All Editing Tools Definitions & Logic
   ============================================================ */

'use strict';

const ToolsDB = {
  video: [
    {
      category: 'Basic Editing',
      tools: [
        { id: 'trim',       name: 'Trim',          icon: '✂️',  paid: false, desc: 'Trim clip in/out points' },
        { id: 'cut',        name: 'Cut',            icon: '🔪',  paid: false, desc: 'Cut clip at playhead' },
        { id: 'split',      name: 'Split',          icon: '⚡',  paid: false, desc: 'Split into two clips' },
        { id: 'merge',      name: 'Merge',          icon: '🔗',  paid: false, desc: 'Merge selected clips' },
        { id: 'duplicate',  name: 'Duplicate',      icon: '📋',  paid: false, desc: 'Duplicate selected clip' },
        { id: 'delete',     name: 'Delete',         icon: '🗑️',  paid: false, desc: 'Delete selected clip' },
      ]
    },
    {
      category: 'Speed & Motion',
      tools: [
        { id: 'speed',      name: 'Speed',          icon: '⚡',  paid: false, desc: '0.1x to 16x speed' },
        { id: 'reverse',    name: 'Reverse',        icon: '⏪',  paid: false, desc: 'Reverse clip direction' },
        { id: 'loop',       name: 'Loop',           icon: '🔄',  paid: false, desc: 'Loop clip N times' },
        { id: 'freeze',     name: 'Freeze Frame',   icon: '❄️',  paid: false, desc: 'Freeze frame at point' },
        { id: 'slowmo',     name: 'Slow Motion',    icon: '🐢',  paid: false, desc: 'Ultra smooth slow motion' },
        { id: 'hyperlapse', name: 'Hyperlapse',     icon: '💨',  paid: true,  desc: 'Smooth time-lapse effect' },
      ]
    },
    {
      category: 'Stabilization & Noise',
      tools: [
        { id: 'stabilize',  name: 'Stabilize',      icon: '📷',  paid: false, free: true, desc: 'AI video stabilization (FREE)' },
        { id: 'noise_r',    name: 'Noise Reduce',   icon: '🔇',  paid: false, free: true, desc: 'AI video noise reduction (FREE)' },
        { id: 'horizon',    name: 'Auto-Level',     icon: '📐',  paid: false, desc: 'Auto-level horizon' },
        { id: 'shake',      name: 'Shake Effect',   icon: '📳',  paid: false, desc: 'Add camera shake effect' },
      ]
    },
    {
      category: 'Color & Grading',
      tools: [
        { id: 'color_basic',name: 'Basic Adjust',   icon: '🎛️',  paid: false, desc: 'Brightness, contrast, etc.' },
        { id: 'color_wheel',name: 'Color Wheels',   icon: '🎨',  paid: false, desc: 'Shadow/mid/highlight wheels' },
        { id: 'curves',     name: 'Curves',         icon: '📈',  paid: false, desc: 'RGB curves editor' },
        { id: 'lut',        name: 'LUT Import',     icon: '🔷',  paid: false, desc: 'Import .cube LUT files' },
        { id: 'scopes',     name: 'Video Scopes',   icon: '📊',  paid: true,  desc: 'Waveform, vectorscope' },
        { id: 'hsl',        name: 'HSL Selective',  icon: '🌈',  paid: false, desc: 'Selective color adjustment' },
      ]
    },
    {
      category: 'Transitions',
      tools: [
        { id: 'trans_fade',    name: 'Cross Fade',   icon: '🌫️', paid: false, desc: 'Classic cross dissolve' },
        { id: 'trans_zoom',    name: 'Zoom',         icon: '🔍', paid: false, desc: 'Smooth zoom transition' },
        { id: 'trans_slide',   name: 'Slide',        icon: '↔️', paid: false, desc: 'Directional slide' },
        { id: 'trans_glitch',  name: 'Glitch',       icon: '⚡', paid: false, desc: 'Digital glitch effect' },
        { id: 'trans_spin',    name: 'Spin',         icon: '🌀', paid: false, desc: '360° spin transition' },
        { id: 'trans_morph',   name: 'Morph Cut',    icon: '🔀', paid: true,  desc: 'AI-powered morph cut' },
        { id: 'trans_wipe',    name: 'Wipe',         icon: '🖐️', paid: false, desc: 'Classic wipe transition' },
        { id: 'trans_split',   name: 'Split',        icon: '🔢', paid: false, desc: 'Split screen transition' },
      ]
    },
    {
      category: 'Visual Effects',
      tools: [
        { id: 'fx_blur',    name: 'Blur',           icon: '💫', paid: false, desc: 'Gaussian/Motion blur' },
        { id: 'fx_glow',    name: 'Glow',           icon: '✨', paid: false, desc: 'Cinematic glow effect' },
        { id: 'fx_vignette',name: 'Vignette',       icon: '⚫', paid: false, desc: 'Dark edge vignette' },
        { id: 'fx_grain',   name: 'Film Grain',     icon: '🎞️', paid: false, desc: 'Add film grain noise' },
        { id: 'fx_chroma',  name: 'Chroma Key',     icon: '💚', paid: false, desc: 'Green screen removal' },
        { id: 'fx_lens',    name: 'Lens Flare',     icon: '🌟', paid: false, desc: 'Add lens flare effect' },
        { id: 'fx_bokeh',   name: 'Bokeh',          icon: '🔵', paid: true,  desc: 'Cinematic depth of field' },
        { id: 'fx_3d',      name: '3D Effects',     icon: '🧊', paid: true,  desc: '3D rotation and depth' },
      ]
    },
    {
      category: 'Text & Titles',
      tools: [
        { id: 'text_add',   name: 'Add Text',       icon: '📝', paid: false, desc: 'Add text overlay' },
        { id: 'text_title', name: 'Title Card',     icon: '🎬', paid: false, desc: 'Animated title templates' },
        { id: 'text_lower', name: 'Lower Third',    icon: '📺', paid: false, desc: 'Lower third overlay' },
        { id: 'text_sub',   name: 'Auto Subtitle',  icon: '💬', paid: true,  desc: 'AI auto-subtitles' },
        { id: 'text_anim',  name: 'Text Animate',   icon: '🎭', paid: false, desc: 'Animated text effects' },
        { id: 'text_cred',  name: 'Credits',        icon: '📜', paid: false, desc: 'Rolling credits template' },
      ]
    },
    {
      category: 'Audio Tools',
      tools: [
        { id: 'aud_vol',    name: 'Volume',         icon: '🔊', paid: false, desc: 'Adjust volume levels' },
        { id: 'aud_fade',   name: 'Fade In/Out',    icon: '📻', paid: false, desc: 'Audio fade effects' },
        { id: 'aud_eq',     name: 'Equalizer',      icon: '🎚️', paid: false, desc: '10-band EQ' },
        { id: 'aud_noise',  name: 'Audio Denoise',  icon: '🔇', paid: false, free: true, desc: 'Remove background noise (FREE)' },
        { id: 'aud_beat',   name: 'Beat Sync',      icon: '🥁', paid: false, desc: 'Sync cuts to music beats' },
        { id: 'aud_duck',   name: 'Auto Duck',      icon: '🦆', paid: false, desc: 'Auto lower music under voice' },
        { id: 'aud_reverb', name: 'Reverb',         icon: '🎵', paid: false, desc: 'Add reverb effect' },
        { id: 'aud_vocal',  name: 'Vocal Isolate',  icon: '🎤', paid: true,  desc: 'AI vocal isolation' },
      ]
    },
    {
      category: 'Stickers & Media',
      tools: [
        { id: 'stk_add',    name: 'Stickers',       icon: '🎊', paid: false, desc: '1000+ animated stickers' },
        { id: 'stk_gif',    name: 'GIF Insert',     icon: '🎮', paid: false, desc: 'Insert GIFs' },
        { id: 'stk_emoji',  name: 'Emoji',          icon: '😀', paid: false, desc: 'Animated emoji overlay' },
        { id: 'stk_shape',  name: 'Shapes',         icon: '🔷', paid: false, desc: 'Vector shape overlays' },
      ]
    },
    {
      category: 'AI Features',
      tools: [
        { id: 'ai_bg',      name: 'BG Remove',      icon: '🧹', paid: false, desc: 'AI background removal' },
        { id: 'ai_object',  name: 'Object Remove',  icon: '🪄', paid: true,  desc: 'AI object removal' },
        { id: 'ai_enhance', name: 'AI Enhance',     icon: '🤖', paid: true,  desc: 'AI video enhancement' },
        { id: 'ai_color',   name: 'AI Colorize',    icon: '🎨', paid: true,  desc: 'AI auto colorization' },
        { id: 'ai_super',   name: 'Super Res',      icon: '🔬', paid: true,  desc: 'AI super resolution' },
        { id: 'ai_sky',     name: 'Sky Replace',    icon: '☁️', paid: true,  desc: 'AI sky replacement' },
      ]
    },
    {
      category: 'Advanced',
      tools: [
        { id: 'kf',         name: 'Keyframe',       icon: '🔑', paid: false, desc: 'Keyframe animation' },
        { id: 'mask',       name: 'Masking',        icon: '🎭', paid: false, desc: 'Shape & path masking' },
        { id: 'blend',      name: 'Blend Mode',     icon: '🖼️', paid: false, desc: 'Layer blend modes' },
        { id: 'pip',        name: 'Picture-in-Pic', icon: '📺', paid: false, desc: 'Picture-in-picture layout' },
        { id: 'overlay',    name: 'Overlay',        icon: '🎨', paid: true,  desc: 'Paid: Resolution overlay' },
        { id: 'motion_b',   name: 'Motion Blur',    icon: '💨', paid: false, desc: 'Directional motion blur' },
      ]
    }
  ],

  photo: [
    {
      category: 'Basic Adjustments',
      tools: [
        { id: 'ph_crop',    name: 'Crop',           icon: '✂️',  paid: false, desc: 'Crop and straighten' },
        { id: 'ph_rotate',  name: 'Rotate',         icon: '🔄',  paid: false, desc: 'Rotate & flip' },
        { id: 'ph_bright',  name: 'Brightness',     icon: '☀️',  paid: false, desc: 'Adjust brightness' },
        { id: 'ph_contrast',name: 'Contrast',       icon: '⬛',  paid: false, desc: 'Adjust contrast' },
        { id: 'ph_sat',     name: 'Saturation',     icon: '🎨',  paid: false, desc: 'Color saturation' },
        { id: 'ph_sharp',   name: 'Sharpness',      icon: '🔪',  paid: false, desc: 'Sharpen details' },
        { id: 'ph_temp',    name: 'Temperature',    icon: '🌡️',  paid: false, desc: 'Warm/cool tones' },
        { id: 'ph_tint',    name: 'Tint',           icon: '🌈',  paid: false, desc: 'Green/magenta tint' },
      ]
    },
    {
      category: 'Retouching',
      tools: [
        { id: 'ph_heal',    name: 'Heal',           icon: '🩹',  paid: false, desc: 'Healing brush tool' },
        { id: 'ph_clone',   name: 'Clone',          icon: '👥',  paid: false, desc: 'Clone stamp tool' },
        { id: 'ph_smooth',  name: 'Skin Smooth',    icon: '💆',  paid: false, desc: 'AI skin smoothing' },
        { id: 'ph_teeth',   name: 'Teeth Whiten',   icon: '😁',  paid: false, desc: 'AI teeth whitening' },
        { id: 'ph_eyes',    name: 'Eye Enhance',    icon: '👁️',  paid: false, desc: 'Eye brightening' },
        { id: 'ph_slim',    name: 'Slim Face',      icon: '💃',  paid: true,  desc: 'Face slimming tool' },
      ]
    },
    {
      category: 'AI Photo Tools',
      tools: [
        { id: 'ph_upscale', name: 'AI Upscale',     icon: '🔬', paid: false, token: 5, desc: '5 tokens • AI upscaling 2x/4x' },
        { id: 'ph_bg_rem',  name: 'BG Remove',      icon: '🧹', paid: false, desc: 'Remove photo background' },
        { id: 'ph_obj_rem', name: 'Object Remove',  icon: '🪄', paid: true,  desc: 'AI object/person removal' },
        { id: 'ph_enhance', name: 'AI Enhance',     icon: '✨', paid: false, desc: 'One-click AI enhancement' },
        { id: 'ph_dehaze',  name: 'Dehaze',         icon: '🌫️', paid: false, desc: 'Remove haze/fog' },
        { id: 'ph_colorize',name: 'AI Colorize',    icon: '🎨', paid: true,  desc: 'Colorize B&W photos' },
      ]
    },
    {
      category: 'Advanced Photo',
      tools: [
        { id: 'ph_hdr',     name: 'HDR',            icon: '💡', paid: false, desc: 'HDR enhancement' },
        { id: 'ph_depth',   name: 'Depth Effect',   icon: '🔵', paid: false, desc: 'Portrait depth of field' },
        { id: 'ph_shadow',  name: 'Shadows/High',   icon: '🌑', paid: false, desc: 'Shadow/highlight control' },
        { id: 'ph_clarity', name: 'Clarity',        icon: '💎', paid: false, desc: 'Midtone contrast/clarity' },
        { id: 'ph_vibrance',name: 'Vibrance',       icon: '🌟', paid: false, desc: 'Smart saturation boost' },
        { id: 'ph_batch',   name: 'Batch Edit',     icon: '📦', paid: true,  desc: 'Apply edits to 100s of photos' },
      ]
    },
    {
      category: 'Photo Resolution',
      tools: [
        { id: 'res_ultra',  name: 'Ultra Res',      icon: '🎯', paid: true,  desc: 'Ultra resolution output' },
        { id: 'res_supra',  name: 'Super Ultra',    icon: '🚀', paid: true,  desc: 'Super ultra resolution' },
        { id: 'res_overlay',name: 'Overlay',        icon: '🎨', paid: true,  desc: 'Resolution overlay' },
        { id: 'res_hd',     name: 'HD Export',      icon: '📤', paid: false, desc: 'Standard HD photo export' },
      ]
    }
  ]
};

// ── Tools Panel Renderer ───────────────────────────────────────
const ToolsPanel = (() => {
  let activeToolId = null;
  let activeTabMode = 'video';

  function render(container, mode = 'video') {
    activeTabMode = mode;
    container.innerHTML = '';

    const categories = ToolsDB[mode] || ToolsDB.video;

    categories.forEach(cat => {
      const catEl = document.createElement('div');
      catEl.className = 'tool-category open';
      catEl.dataset.cat = cat.category;

      catEl.innerHTML = `
        <div class="tool-category-header" onclick="this.parentElement.classList.toggle('open')">
          <span>${cat.category}</span>
          <span class="chevron">›</span>
        </div>
        <div class="tool-items">
          ${cat.tools.map(t => renderToolItem(t)).join('')}
        </div>
      `;

      container.appendChild(catEl);
    });
  }

  function renderToolItem(tool) {
    const isPaid = tool.paid && EP.user.plan === 'normal' && !EP.user.trialActive;
    const isToken = tool.token;
    const isFree = tool.free;

    return `
      <div class="tool-item ${isPaid ? 'paid-tool' : ''} ${isFree ? 'free-tool' : ''}"
           data-tool="${tool.id}"
           onclick="ToolsPanel.activate('${tool.id}', ${tool.paid}, ${isToken ? tool.token : 0})"
           title="${tool.desc}"
           data-tip="${tool.desc}">
        <span class="tool-icon">${tool.icon}</span>
        <span class="tool-name">${tool.name}</span>
        ${isFree ? '<span class="tool-badge" style="font-size:0.5rem;background:rgba(16,185,129,0.2);color:var(--green);border-radius:3px;padding:1px 4px;">FREE</span>' : ''}
        ${isToken ? `<span class="tool-badge" style="font-size:0.5rem;background:rgba(251,191,36,0.2);color:var(--gold);border-radius:3px;padding:1px 4px;">🪙${tool.token}</span>` : ''}
        ${isPaid ? '<span style="position:absolute;bottom:3px;right:3px;font-size:0.65rem;">🔒</span>' : ''}
      </div>
    `;
  }

  function activate(toolId, isPaid, tokenCost = 0) {
    // Check paid
    if (isPaid && EP.user.plan === 'normal' && !EP.user.trialActive) {
      const tool = findTool(toolId);
      openUpgradeModal(tool ? `"${tool.name}"` : 'this feature');
      return;
    }

    // Check token cost
    if (tokenCost > 0) {
      if (!EP.user.loggedIn) { openAuth('register'); return; }
      if (EP.user.tokens < tokenCost) {
        toast.error(`⚠️ Not enough tokens! You need ${tokenCost} tokens. You have ${EP.user.tokens}.`, 4000);
        setTimeout(() => openTokenShop(), 1000);
        return;
      }
      EP.user.tokens -= tokenCost;
      document.querySelectorAll('.token-count').forEach(el => el.textContent = EP.user.tokens);
      toast.info(`🪙 Used ${tokenCost} tokens. Remaining: ${EP.user.tokens}`);
    }

    // Update active state
    document.querySelectorAll('.tool-item').forEach(el => el.classList.remove('active'));
    document.querySelector(`[data-tool="${toolId}"]`)?.classList.add('active');

    activeToolId = toolId;
    EP.editor.activeTool = toolId;

    // Show tool properties in right panel
    showToolProperties(toolId);
    simulateToolEffect(toolId);
  }

  function findTool(id) {
    for (const cat of [...ToolsDB.video, ...ToolsDB.photo]) {
      const found = cat.tools?.find(t => t.id === id);
      if (found) return found;
    }
    return null;
  }

  function showToolProperties(toolId) {
    const panel = document.getElementById('right-panel-content');
    if (!panel) return;

    const tool = findTool(toolId);
    if (!tool) return;

    const props = getToolProperties(toolId);
    panel.innerHTML = `
      <div class="prop-group-title">${tool.icon} ${tool.name}</div>
      <p style="font-size:0.78rem;color:var(--text-muted);margin-bottom:16px;">${tool.desc}</p>
      ${props}
    `;
  }

  function getToolProperties(id) {
    const propTemplates = {
      'speed': `
        <div class="prop-row"><span class="prop-label">Speed</span><span class="prop-value" id="speed-val">1.0x</span></div>
        <input type="range" class="prop-slider" min="10" max="1600" value="100" oninput="document.getElementById('speed-val').textContent=(this.value/100).toFixed(1)+'x'">
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-top:10px;">
          ${['0.25x','0.5x','1x','2x','4x'].map(s=>`<button onclick="document.querySelector('input.prop-slider').value=${parseFloat(s)*100};document.getElementById('speed-val').textContent='${s}'" style="padding:5px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:5px;color:var(--text-secondary);font-size:0.7rem;cursor:pointer;">${s}</button>`).join('')}
        </div>`,
      'color_basic': `
        ${['Brightness','Contrast','Saturation','Sharpness','Temperature','Tint'].map(p=>`
          <div class="prop-row"><span class="prop-label">${p}</span><span class="prop-value" id="val-${p.toLowerCase()}">0</span></div>
          <input type="range" class="prop-slider" min="-100" max="100" value="0" oninput="document.getElementById('val-${p.toLowerCase()}').textContent=this.value">
        `).join('')}`,
      'ph_upscale': `
        <div style="padding:12px;background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.2);border-radius:10px;margin-bottom:16px;">
          <div style="font-size:0.8rem;color:var(--gold);font-weight:700;margin-bottom:4px;">🪙 Token Cost: 5 tokens</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">Your balance: ${EP.user.tokens} tokens</div>
        </div>
        <div class="prop-row"><span class="prop-label">Scale</span></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
          <button onclick="toast.info('2x upscale applied! 🔬')" style="padding:10px;background:rgba(124,58,237,0.1);border:1px solid var(--purple);border-radius:8px;color:var(--purple-light);font-weight:700;cursor:pointer;">2x</button>
          <button onclick="toast.info('4x upscale applied! 🔬')" style="padding:10px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:8px;color:var(--text-secondary);font-weight:700;cursor:pointer;">4x</button>
        </div>
        <div class="prop-row"><span class="prop-label">AI Model</span></div>
        <select class="prop-select" style="width:100%;">
          <option>Real-ESRGAN (Recommended)</option>
          <option>EDSR Ultra Sharp</option>
          <option>SwinIR Balanced</option>
        </select>`,
      'trim': `
        <div class="prop-row"><span class="prop-label">In Point</span><span class="prop-value">0:00</span></div>
        <input type="range" class="prop-slider" min="0" max="100" value="0">
        <div class="prop-row"><span class="prop-label">Out Point</span><span class="prop-value">0:30</span></div>
        <input type="range" class="prop-slider" min="0" max="100" value="100">
        <div class="prop-row" style="margin-top:10px;">
          <button class="btn btn-primary btn-sm">Apply Trim</button>
        </div>`,
      'fx_blur': `
        <div class="prop-row"><span class="prop-label">Blur Amount</span><span class="prop-value" id="blur-val">5</span></div>
        <input type="range" class="prop-slider" min="0" max="50" value="5" oninput="document.getElementById('blur-val').textContent=this.value">
        <div class="prop-row"><span class="prop-label">Type</span></div>
        <select class="prop-select">
          <option>Gaussian</option><option>Motion</option><option>Radial</option><option>Lens Tilt-Shift</option>
        </select>`,
      'aud_eq': `
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;height:100px;align-items:end;margin-bottom:10px;">
          ${['60Hz','250Hz','1kHz','4kHz','16kHz'].map((f,i)=>`
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
              <input type="range" min="-12" max="12" value="${[3,-2,5,-1,2][i]}" style="writing-mode:vertical-lr;-webkit-appearance:slider-vertical;height:80px;width:22px;" title="${f}">
              <span style="font-size:0.55rem;color:var(--text-muted);">${f}</span>
            </div>
          `).join('')}
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          ${['Flat','Boost Bass','Vocal Clear','Bright','Podcast'].map(p=>`<button style="padding:4px 8px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:4px;color:var(--text-secondary);font-size:0.65rem;cursor:pointer;">${p}</button>`).join('')}
        </div>`,
    };

    return propTemplates[id] || `
      <div style="display:flex;flex-direction:column;gap:12px;">
        ${['Intensity','Smoothness','Feather'].map(p=>`
          <div>
            <div class="prop-row"><span class="prop-label">${p}</span><span class="prop-value" id="val-${p}">50</span></div>
            <input type="range" class="prop-slider" min="0" max="100" value="50" oninput="document.getElementById('val-${p}').textContent=this.value">
          </div>
        `).join('')}
      </div>
    `;
  }

  function simulateToolEffect(toolId) {
    const messages = {
      'stabilize': '📷 Analyzing motion vectors... Stabilization applied!',
      'noise_r':   '🔇 AI noise reduction complete! Video quality improved.',
      'aud_noise': '🎵 Background noise removed from audio track.',
      'ai_bg':     '🧹 Background removed successfully!',
      'ph_enhance':'✨ AI enhancement applied to your photo!',
      'ph_upscale':'🔬 Processing upscale... Costs 5 tokens.',
      'fx_chroma': '💚 Green screen key applied!',
    };
    if (messages[toolId]) toast.info(messages[toolId]);
  }

  return { render, activate };
})();
