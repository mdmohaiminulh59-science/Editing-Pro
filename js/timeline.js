/* ============================================================
   EDITING PRO — Timeline Component
   ============================================================ */

'use strict';

const Timeline = (() => {
  let zoom = 100;   // pixels per second
  let duration = 30; // seconds total
  let currentTime = 0;
  let playing = false;
  let playInterval = null;
  let isDraggingPlayhead = false;

  const tracks = [
    { id: 'video1',  type: 'video',  label: '📹 Video 1',  clips: [
      { id: 'cl1', name: 'Clip 1.mp4', start: 0,   end: 8,   type: 'video' },
      { id: 'cl2', name: 'Clip 2.mp4', start: 9,   end: 18,  type: 'video' },
      { id: 'cl3', name: 'Intro.mp4',  start: 20,  end: 28,  type: 'video' },
    ]},
    { id: 'audio1',  type: 'audio',  label: '🎵 Audio 1',  clips: [
      { id: 'cl4', name: 'Background Music.mp3', start: 0, end: 30, type: 'audio' },
    ]},
    { id: 'text1',   type: 'text',   label: '📝 Text',     clips: [
      { id: 'cl5', name: 'Title Card', start: 0,  end: 4,  type: 'text' },
      { id: 'cl6', name: 'Lower Third', start: 10, end: 15, type: 'text' },
    ]},
    { id: 'effect1', type: 'effect', label: '✨ Effects',  clips: [
      { id: 'cl7', name: 'Color Grade', start: 0, end: 30, type: 'effect' },
    ]},
    { id: 'audio2',  type: 'audio',  label: '🎙️ Voice',   clips: [
      { id: 'cl8', name: 'Voiceover.wav', start: 2, end: 25, type: 'audio' },
    ]},
  ];

  function render(container) {
    container.innerHTML = `
      <div class="timeline-header">
        <div class="playback-controls">
          <button class="tl-btn" onclick="Timeline.skipToStart()" title="Skip to Start">⏮</button>
          <button class="tl-btn" onclick="Timeline.stepBack()" title="Step Back">⏪</button>
          <button id="tl-play-btn" class="tl-btn" onclick="Timeline.togglePlay()" title="Play/Pause">▶</button>
          <button class="tl-btn" onclick="Timeline.stepForward()" title="Step Forward">⏩</button>
          <button class="tl-btn" onclick="Timeline.skipToEnd()" title="Skip to End">⏭</button>
        </div>
        <span class="time-display" id="tl-time-display">0:00 / ${formatTime(duration)}</span>
        <div style="display:flex;gap:6px;margin-left:12px;">
          <button class="tl-btn" onclick="Timeline.addTrack()" title="Add Track">+ Track</button>
          <button class="tl-btn" onclick="Timeline.splitAtPlayhead()" title="Split">✂ Split</button>
          <button class="tl-btn" style="color:var(--rose);" onclick="Timeline.deleteSelected()" title="Delete">🗑</button>
        </div>
        <div class="timeline-zoom" style="margin-left:auto;">
          <span class="timeline-zoom-label">Zoom:</span>
          <input type="range" class="timeline-zoom-slider" min="50" max="400" value="${zoom}" oninput="Timeline.setZoom(this.value)">
          <span class="timeline-zoom-label" id="tl-zoom-label">${zoom}%</span>
        </div>
      </div>
      <div class="timeline-scroll-area">
        <div class="timeline-tracks-wrapper">
          <div class="timeline-track-labels" id="tl-track-labels">
            ${tracks.map(renderTrackLabel).join('')}
            <button class="add-track-btn" onclick="Timeline.addTrack()">
              <span style="font-size:1.1rem;">+</span> Add Track
            </button>
          </div>
          <div class="timeline-canvas" id="tl-canvas">
            <div id="tl-inner" style="min-width:${duration * zoom + 200}px;">
              <div class="timeline-ruler" id="tl-ruler"></div>
              <div class="timeline-tracks" id="tl-tracks">
                ${tracks.map(renderTrack).join('')}
              </div>
              <div class="playhead" id="tl-playhead" style="left:${timeToPixel(currentTime)}px;"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    renderRuler();
    initDrag();
    initPlayheadDrag();
  }

  function renderTrackLabel(track) {
    return `
      <div class="track-label">
        <span class="track-label-icon">${track.label.split(' ')[0]}</span>
        <span class="track-label-name">${track.label.split(' ').slice(1).join(' ')}</span>
      </div>
    `;
  }

  function renderTrack(track) {
    const clips = track.clips.map(c => renderClip(c)).join('');
    return `<div class="track-row" data-track="${track.id}">${clips}</div>`;
  }

  function renderClip(clip) {
    const left   = timeToPixel(clip.start);
    const width  = timeToPixel(clip.end - clip.start);
    return `
      <div class="clip ${clip.type}-clip"
           data-clip="${clip.id}"
           style="left:${left}px;width:${Math.max(width, 30)}px;"
           title="${clip.name}">
        <div class="clip-handle left"></div>
        <span style="pointer-events:none;overflow:hidden;text-overflow:ellipsis;">${clip.name}</span>
        <div class="clip-handle right"></div>
      </div>
    `;
  }

  function renderRuler() {
    const ruler = document.getElementById('tl-ruler');
    if (!ruler) return;
    ruler.innerHTML = '';
    const totalWidth = duration * zoom + 200;
    const step = zoom > 150 ? 1 : zoom > 80 ? 2 : 5;

    for (let t = 0; t <= duration; t += 0.5) {
      const x = timeToPixel(t);
      const isMajor = t % step === 0;
      const tick = document.createElement('div');
      tick.className = `ruler-tick ${isMajor ? 'major' : 'minor'}`;
      tick.style.left = x + 'px';
      ruler.appendChild(tick);
      if (isMajor) {
        const label = document.createElement('div');
        label.className = 'ruler-label';
        label.style.left = x + 'px';
        label.textContent = formatTime(t);
        ruler.appendChild(label);
      }
    }
  }

  function timeToPixel(t) { return t * zoom; }
  function pixelToTime(px) { return px / zoom; }

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  function updatePlayhead() {
    const ph = document.getElementById('tl-playhead');
    if (ph) ph.style.left = timeToPixel(currentTime) + 'px';
    const display = document.getElementById('tl-time-display');
    if (display) display.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    EP.editor.currentTime = currentTime;
  }

  function initPlayheadDrag() {
    const ruler = document.getElementById('tl-ruler');
    const tracksEl = document.getElementById('tl-tracks');
    const canvas = document.getElementById('tl-canvas');

    function onMouseMove(e) {
      if (!isDraggingPlayhead) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left + canvas.scrollLeft;
      currentTime = Math.max(0, Math.min(duration, pixelToTime(x)));
      updatePlayhead();
    }

    [ruler, tracksEl].forEach(el => {
      if (!el) return;
      el.addEventListener('mousedown', e => {
        isDraggingPlayhead = true;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left + canvas.scrollLeft;
        currentTime = Math.max(0, Math.min(duration, pixelToTime(x)));
        updatePlayhead();
      });
    });

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', () => { isDraggingPlayhead = false; });
  }

  function initDrag() {
    // Simple clip selection highlight
    document.querySelectorAll('.clip').forEach(clip => {
      clip.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.clip').forEach(c => c.style.outline = '');
        clip.style.outline = '2px solid var(--cyan)';
      });
    });
    document.addEventListener('click', () => {
      document.querySelectorAll('.clip').forEach(c => c.style.outline = '');
    });
  }

  // ── Public API ─────────────────────────────────────────────
  function togglePlay() {
    playing = !playing;
    const btn = document.getElementById('tl-play-btn');
    if (btn) btn.textContent = playing ? '⏸' : '▶';

    if (playing) {
      playInterval = setInterval(() => {
        currentTime += 0.1;
        if (currentTime >= duration) {
          currentTime = 0;
          playing = false;
          if (btn) btn.textContent = '▶';
          clearInterval(playInterval);
        }
        updatePlayhead();

        // Auto-scroll timeline
        const canvas = document.getElementById('tl-canvas');
        if (canvas) {
          const playheadX = timeToPixel(currentTime);
          const viewRight = canvas.scrollLeft + canvas.clientWidth;
          if (playheadX > viewRight - 80) {
            canvas.scrollLeft = playheadX - 80;
          }
        }
      }, 100);
    } else {
      clearInterval(playInterval);
    }
  }

  function skipToStart() { currentTime = 0; updatePlayhead(); }
  function skipToEnd() { currentTime = duration; updatePlayhead(); }
  function stepBack() { currentTime = Math.max(0, currentTime - 1); updatePlayhead(); }
  function stepForward() { currentTime = Math.min(duration, currentTime + 1); updatePlayhead(); }

  function setZoom(val) {
    zoom = parseInt(val);
    document.getElementById('tl-zoom-label').textContent = zoom + '%';
    document.getElementById('tl-inner').style.minWidth = (duration * zoom + 200) + 'px';
    renderRuler();
    document.querySelectorAll('.clip').forEach(clipEl => {
      const id = clipEl.dataset.clip;
      const track = tracks.find(t => t.clips.some(c => c.id === id));
      const clip = track?.clips.find(c => c.id === id);
      if (clip) {
        clipEl.style.left = timeToPixel(clip.start) + 'px';
        clipEl.style.width = Math.max(timeToPixel(clip.end - clip.start), 30) + 'px';
      }
    });
    updatePlayhead();
  }

  function addTrack() {
    const types = ['video', 'audio', 'text', 'effect'];
    const type = types[tracks.length % types.length];
    const labels = { video: '📹 Video', audio: '🎵 Audio', text: '📝 Text', effect: '✨ Effect' };
    const newTrack = {
      id: 'track_' + Date.now(),
      type,
      label: labels[type] + ' ' + (tracks.filter(t => t.type === type).length + 2),
      clips: []
    };
    tracks.push(newTrack);

    const labelsEl = document.getElementById('tl-track-labels');
    const tracksEl = document.getElementById('tl-tracks');
    if (labelsEl) {
      const addBtn = labelsEl.querySelector('.add-track-btn');
      const labelDiv = document.createElement('div');
      labelDiv.innerHTML = renderTrackLabel(newTrack);
      labelsEl.insertBefore(labelDiv.firstChild, addBtn);
    }
    if (tracksEl) {
      const rowDiv = document.createElement('div');
      rowDiv.innerHTML = renderTrack(newTrack);
      tracksEl.appendChild(rowDiv.firstChild);
    }
    toast.success(`Added new ${type} track`);
  }

  function splitAtPlayhead() {
    toast.info(`Split at ${formatTime(currentTime)}`);
  }

  function deleteSelected() {
    const selected = document.querySelector('.clip[style*="outline"]');
    if (selected) {
      selected.style.animation = 'fadeIn 0.2s ease reverse';
      setTimeout(() => selected.remove(), 200);
      toast.success('Clip deleted');
    } else {
      toast.warning('No clip selected. Click a clip first.');
    }
  }

  return { render, togglePlay, skipToStart, skipToEnd, stepBack, stepForward, setZoom, addTrack, splitAtPlayhead, deleteSelected };
})();
