/* ============================================================
   EDITING PRO — Xeno AI Assistant
   ============================================================ */

'use strict';

const XenoAI = (() => {
  let isOpen = false;
  let messageCount = 0;

  // ── Scripted AI Responses ─────────────────────────────────
  const responses = {
    greeting: [
      "Hi! I'm **Xeno**, your AI editing assistant. 🤖 I can help you with color grading, filters, transitions, audio mixing, and so much more. What would you like to create today?",
      "Hey there! **Xeno** here, ready to supercharge your editing workflow! ✨ Ask me anything about video editing, photo retouching, or just what tools to use.",
    ],
    color: [
      "For cinematic color grading, I recommend starting with the **LUT panel** → try 'Teal & Orange' for that Hollywood look. Then adjust **Shadows** to -15 and **Highlights** to +10. Want me to apply this automatically?",
      "Great choice! Try the **Color Wheels** under Color Grading. For a warm tone: Shadows=cool blue, Midtones=neutral, Highlights=warm orange. The **Temperature** slider at +20 works wonders for portraits!",
    ],
    filter: [
      "For trending filters right now: **Cinematic Noir**, **Golden Hour**, and **Moody Blue** are super popular! I'd suggest **Golden Hour** for outdoor shots. Find them under the Filters panel on the left. 🎨",
      "My top filter picks: 🎬 **Film Grain** for vintage vibes, 🌅 **Sunset LUT** for landscapes, 💜 **Neon Dreams** for urban content. Swipe the filter gallery to preview each one!",
    ],
    stabilize: [
      "Great news — **Video Stabilization** is completely **FREE** in Editing Pro! 🎉 Find it under Video Tools → Stabilization. It uses AI motion analysis to smooth out shaky footage in seconds.",
      "The Stabilize tool is in your **Video Tools** panel (left sidebar). It's free for all users! Just click it and I'll auto-analyze your clip. For best results, use **Smooth** mode for walking shots.",
    ],
    noise: [
      "**Noise Reduction** is FREE too! 🎉 Go to Video Tools → Noise Reduce. Use the slider: 30-50% for mild grain, 60-80% for heavy noise. I recommend starting at 40% to preserve sharpness.",
      "For noise reduction, head to the Audio Tools tab for background hiss, or Video Tools for visual grain. Both are free! The AI denoise engine will analyze your media first.",
    ],
    export: [
      "For export quality: **1080p 60fps** is free and perfect for most platforms! If you need 4K 120fps (our highest quality), that's the Premium Export at $22. You can export in MP4, MOV, WebM formats.",
      "My export recommendation for social media: **1080p at 60fps** for Reels/TikTok, **720p 60fps** for quick uploads. Want 4K 120fps? Upgrade to Legend plan or purchase it for $22.",
    ],
    upscale: [
      "Photo upscaling uses **5 tokens** per use. You currently have tokens available. The AI will enhance resolution 2x or 4x with detail preservation. Find it under Photo Tools → AI Upscale! ✨",
      "The upscaling AI uses a deep learning model to add detail, not just pixels. Each upscale costs 5 tokens. Tip: always upscale *after* your other edits for best results!",
    ],
    transition: [
      "Transitions are in the left panel → Transitions tab. My favorites: **Smooth Zoom** for energetic cuts, **Lens Flare Wipe** for cinematic feels, **Glitch** for edgy content. Drag and drop between clips! 🎬",
      "For seamless transitions, try **Cross Dissolve** for natural cuts, **Spin** for YouTube vlogs, or **Morphing Cuts** if your clips share similar subjects. Set duration between 0.3s–0.8s for best results.",
    ],
    text: [
      "For text overlays: go to Text & Titles in the left panel. I recommend **Cinematic Title** or **Lower Third** presets. Enable **Auto-Subtitle** to have me transcribe your audio automatically! 📝",
      "Text animations I love: **Typewriter** for reveals, **Glitch** for tech content, **Fade Up** for elegant titles. You can also add **Animated Stickers** for extra flair. Find them all in the Text panel!",
    ],
    audio: [
      "For audio mixing: your track is showing in the timeline. Try the **Equalizer** (cut 200-400Hz for clarity), add **Reverb** lightly for warmth, and use **Auto-Duck** to lower music under speech automatically! 🎵",
      "Audio tips: set your main audio at -6dB to leave headroom, use the **Noise Gate** to cut background noise between lines, and the **Beat Sync** feature will auto-cut your video to music beats!",
    ],
    default: [
      "I can help you with that! Tell me more about what you're trying to achieve and I'll suggest the best tools and settings. 🤖",
      "Great question! Check the left sidebar for all available tools. I can guide you step-by-step through any editing task. What's your main goal for this project?",
      "Absolutely! Editing Pro has everything you need for that. Let me pull up the right tools for you. Could you tell me more about your footage or what style you're going for?",
      "That's a great editing choice! Here's my suggestion: start with the basic adjustments (Brightness, Contrast, Saturation), then layer in effects. I'll walk you through each step if you'd like! ✨",
    ],
    xeno: [
      "I'm **Xeno**, Editing Pro's built-in AI assistant! 🤖 I'm trained to help with every aspect of video and photo editing — from basic cuts to advanced color science. I'm always learning new techniques!",
    ],
    resolution: [
      "Our resolution tiers: **Free** — 1080p 60/120fps, 720p 60/120fps, 360p 30/60fps. **Paid** — 4K 120fps Export ($22). **Legend plan** includes 4K export. Overlay, Ultra & Super-Ultra resolutions are paid add-ons.",
    ],
    pricing: [
      "**Editing Pro plans:**\n• **Normal** — Free forever\n• **Pro** — $15/month (14-day free trial)\n• **Legend** — $40/month (14-day free trial + 4K export)\n\nTokens for upscaling: 90 free on signup, then $14/50 tokens, $35/150, $55/300.",
    ],
    pro: [
      "**Pro plan ($15/mo)** gives you: advanced filters, priority rendering, HD export, multi-track timeline up to 20 tracks, remove watermark, advanced transitions, team sharing, and more. 14-day free trial! ⚡",
    ],
    legend: [
      "**Legend plan ($40/mo)** includes everything in Pro PLUS: 4K 120fps export, Overlay & Ultra resolution, priority AI processing, unlimited projects, commercial license, dedicated support, and early access to new features. 👑",
    ],
  };

  function getResponse(input) {
    const text = input.toLowerCase();
    if (text.includes('xeno') || text.includes('who are you') || text.includes('what are you'))   return pick(responses.xeno);
    if (text.includes('color') || text.includes('grade') || text.includes('lut') || text.includes('colour')) return pick(responses.color);
    if (text.includes('filter'))            return pick(responses.filter);
    if (text.includes('stabiliz'))          return pick(responses.stabilize);
    if (text.includes('noise') || text.includes('denoise') || text.includes('grain')) return pick(responses.noise);
    if (text.includes('export') || text.includes('download') || text.includes('render')) return pick(responses.export);
    if (text.includes('upscal') || text.includes('resolution') || text.includes('enhance photo')) return pick(responses.upscale);
    if (text.includes('transition'))        return pick(responses.transition);
    if (text.includes('text') || text.includes('subtitle') || text.includes('caption') || text.includes('title')) return pick(responses.text);
    if (text.includes('audio') || text.includes('sound') || text.includes('music') || text.includes('voice')) return pick(responses.audio);
    if (text.includes('resolution') || text.includes('4k') || text.includes('1080'))   return pick(responses.resolution);
    if (text.includes('price') || text.includes('cost') || text.includes('plan') || text.includes('paid') || text.includes('free')) return pick(responses.pricing);
    if (text.includes('pro'))               return pick(responses.pro);
    if (text.includes('legend'))            return pick(responses.legend);
    return pick(responses.default);
  }

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  // ── Build Chat UI ──────────────────────────────────────────
  function buildPanel() {
    const panel = document.createElement('div');
    panel.id = 'xeno-panel';
    panel.className = 'xeno-panel';
    panel.innerHTML = `
      <div class="xeno-panel-header">
        <div class="xeno-avatar">🤖</div>
        <div class="xeno-info">
          <div class="xeno-name">Xeno AI</div>
          <div class="xeno-status">
            <div class="xeno-status-dot"></div>
            Online & Ready
          </div>
        </div>
        <button class="xeno-close" onclick="XenoAI.toggle()" title="Close">✕</button>
      </div>
      <div class="xeno-messages" id="xeno-messages">
        <div class="xeno-msg bot">
          <div class="msg-avatar">🤖</div>
          <div class="msg-bubble">${formatMsg(pick(responses.greeting))}</div>
        </div>
      </div>
      <div class="xeno-suggestions" id="xeno-suggestions">
        <button class="xeno-suggestion" onclick="XenoAI.quickSend('How do I color grade?')">🎨 Color grade</button>
        <button class="xeno-suggestion" onclick="XenoAI.quickSend('Show me popular filters')">✨ Filters</button>
        <button class="xeno-suggestion" onclick="XenoAI.quickSend('How does video stabilization work?')">📷 Stabilize</button>
        <button class="xeno-suggestion" onclick="XenoAI.quickSend('What are the export options?')">📤 Export</button>
        <button class="xeno-suggestion" onclick="XenoAI.quickSend('Tell me about token upscaling')">🪙 Tokens</button>
        <button class="xeno-suggestion" onclick="XenoAI.quickSend('What are the pricing plans?')">💰 Pricing</button>
      </div>
      <div class="xeno-input-row">
        <input class="xeno-input" id="xeno-input" placeholder="Ask Xeno anything..." onkeydown="if(event.key==='Enter')XenoAI.send()">
        <button class="xeno-send" onclick="XenoAI.send()" title="Send">➤</button>
      </div>
    `;
    return panel;
  }

  function buildButton() {
    const wrap = document.createElement('div');
    wrap.className = 'xeno-float';
    wrap.innerHTML = `
      <div class="xeno-pulse"></div>
      <button class="xeno-btn" onclick="XenoAI.toggle()" title="Chat with Xeno AI">🤖</button>
      <div class="xeno-dot"></div>
    `;
    return wrap;
  }

  function formatMsg(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  function addMessage(text, type = 'bot') {
    const container = document.getElementById('xeno-messages');
    if (!container) return;
    const msg = document.createElement('div');
    msg.className = `xeno-msg ${type}`;
    msg.innerHTML = `
      <div class="msg-avatar">${type === 'bot' ? '🤖' : '👤'}</div>
      <div class="msg-bubble">${type === 'bot' ? formatMsg(text) : text}</div>
    `;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
  }

  function addTyping() {
    const container = document.getElementById('xeno-messages');
    if (!container) return null;
    const typing = document.createElement('div');
    typing.className = 'xeno-msg bot';
    typing.id = 'xeno-typing';
    typing.innerHTML = `
      <div class="msg-avatar">🤖</div>
      <div class="msg-bubble">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
    return typing;
  }

  // ── Public API ─────────────────────────────────────────────
  function init() {
    if (document.getElementById('xeno-panel')) return;
    document.body.appendChild(buildPanel());
    document.body.appendChild(buildButton());
  }

  function toggle() {
    const panel = document.getElementById('xeno-panel');
    if (!panel) return;
    isOpen = !isOpen;
    panel.classList.toggle('open', isOpen);
    if (isOpen) {
      setTimeout(() => document.getElementById('xeno-input')?.focus(), 300);
    }
  }

  function send() {
    const input = document.getElementById('xeno-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    quickSend(text);
  }

  function quickSend(text) {
    addMessage(text, 'user');
    messageCount++;

    const typing = addTyping();
    const delay = 800 + Math.random() * 800;

    setTimeout(() => {
      typing?.remove();
      addMessage(getResponse(text), 'bot');
    }, delay);
  }

  return { init, toggle, send, quickSend };
})();

// ── Initialize on DOM Ready ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  XenoAI.init();
});
