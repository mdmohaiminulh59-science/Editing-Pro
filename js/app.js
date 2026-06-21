/* ============================================================
   EDITING PRO — Global App State & Utilities
   ============================================================ */

'use strict';

// ── Global State ──────────────────────────────────────────────
window.EP = {
  user: {
    loggedIn: false,
    name: '',
    email: '',
    plan: 'normal',       // normal | pro | legend
    tokens: 0,
    trialDays: 14,
    trialActive: false,
  },
  editor: {
    projectName: 'Untitled Project',
    mode: 'video',        // video | photo
    zoom: 100,
    playing: false,
    currentTime: 0,
    duration: 0,
    history: [],
    historyIdx: -1,
    activeTool: null,
    activeFilter: null,
  }
};

// ── Toast System ──────────────────────────────────────────────
window.toast = (() => {
  let container = null;

  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };

  function getContainer() {
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  function show(message, type = 'info', duration = 3500) {
    const c = getContainer();
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <span class="toast-text">${message}</span>
    `;
    c.appendChild(t);

    setTimeout(() => {
      t.style.animation = 'fadeIn 0.3s ease reverse';
      setTimeout(() => t.remove(), 300);
    }, duration);
  }

  return {
    success: (m, d) => show(m, 'success', d),
    error:   (m, d) => show(m, 'error', d),
    info:    (m, d) => show(m, 'info', d),
    warning: (m, d) => show(m, 'warning', d),
  };
})();

// ── Modal System ──────────────────────────────────────────────
window.modal = (() => {
  let overlay = null;

  function create(contentHTML, opts = {}) {
    close();
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay' + (opts.className ? ' ' + opts.className : '');
    overlay.innerHTML = `<div class="modal-box">${contentHTML}</div>`;
    document.body.appendChild(overlay);

    requestAnimationFrame(() => overlay.classList.add('active'));

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    const closeBtn = overlay.querySelector('[data-modal-close]');
    if (closeBtn) closeBtn.addEventListener('click', close);

    return overlay;
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('active');
    setTimeout(() => { if (overlay) { overlay.remove(); overlay = null; } }, 300);
  }

  return { create, close };
})();

// ── Stars Background ──────────────────────────────────────────
function createStars(container, count = 80) {
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${2 + Math.random() * 4}s;
      --delay: ${Math.random() * 4}s;
      width: ${Math.random() > 0.7 ? 3 : 2}px;
      height: ${Math.random() > 0.7 ? 3 : 2}px;
    `;
    container.appendChild(star);
  }
}

// ── Intersection Observer for animations ──────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.glass-card, .feature-card, .pricing-card, .token-pack, .testimonial-card, .platform-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ── Navbar scroll effect ───────────────────────────────────────
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── Number counter animation ───────────────────────────────────
function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString() + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, parseInt(entry.target.dataset.counter));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

// ── Auth Flow ─────────────────────────────────────────────────
function openAuth(tab = 'login') {
  modal.create(`
    <div style="text-align:center; margin-bottom:24px;">
      <div style="width:50px;height:50px;border-radius:14px;background:linear-gradient(135deg,#7c3aed,#00d4ff);display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin:0 auto 12px;">✂️</div>
      <h2 style="font-family:var(--font-display);font-size:1.4rem;font-weight:800;">Welcome to Editing Pro</h2>
      <p style="color:var(--text-secondary);font-size:0.85rem;margin-top:6px;">Join millions of creators worldwide</p>
    </div>
    <div class="auth-tabs">
      <button class="auth-tab ${tab === 'login' ? 'active' : ''}" id="tab-login" onclick="switchAuthTab('login')">Sign In</button>
      <button class="auth-tab ${tab === 'register' ? 'active' : ''}" id="tab-register" onclick="switchAuthTab('register')">Create Account</button>
    </div>
    <div id="auth-form-container">
      ${tab === 'login' ? getLoginForm() : getRegisterForm()}
    </div>
    <button data-modal-close style="position:absolute;top:16px;right:16px;width:30px;height:30px;border-radius:50%;background:var(--bg-card);border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">✕</button>
  `, { className: 'auth-modal' });
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + tab)?.classList.add('active');
  const container = document.getElementById('auth-form-container');
  if (container) container.innerHTML = tab === 'login' ? getLoginForm() : getRegisterForm();
}

function getLoginForm() {
  return `
    <div class="auth-form">
      <input class="auth-input" type="email" placeholder="Email address" id="auth-email">
      <input class="auth-input" type="password" placeholder="Password" id="auth-password">
      <button class="btn btn-primary w-full" onclick="doLogin()" style="justify-content:center;margin-top:4px;">Sign In → Get 90 Free Tokens</button>
      <div class="auth-separator">or</div>
      <button class="social-login-btn" onclick="doSocialLogin('Google')">🔵 Continue with Google</button>
      <button class="social-login-btn" onclick="doSocialLogin('Apple')">⚫ Continue with Apple</button>
      <p style="font-size:0.75rem;color:var(--text-muted);text-align:center;margin-top:8px;"><a href="#" style="color:var(--purple-light);">Forgot password?</a></p>
    </div>
  `;
}

function getRegisterForm() {
  return `
    <div class="auth-form">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <input class="auth-input" type="text" placeholder="First name">
        <input class="auth-input" type="text" placeholder="Last name">
      </div>
      <input class="auth-input" type="email" placeholder="Email address" id="auth-email">
      <input class="auth-input" type="password" placeholder="Create password">
      <div style="display:flex;align-items:center;gap:8px;padding:12px;background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.2);border-radius:var(--radius-md);">
        <span style="font-size:1.2rem;">🎁</span>
        <span style="font-size:0.8rem;color:var(--cyan);">Get <strong>90 free tokens</strong> + <strong>14-day free trial</strong> on signup!</span>
      </div>
      <button class="btn btn-primary w-full" onclick="doRegister()" style="justify-content:center;">Create Free Account</button>
      <div class="auth-separator">or</div>
      <button class="social-login-btn" onclick="doSocialLogin('Google')">🔵 Sign up with Google</button>
    </div>
  `;
}

function doLogin() {
  const email = document.getElementById('auth-email')?.value;
  if (!email) { toast.error('Please enter your email'); return; }
  completeAuth(email.split('@')[0] || 'User', email);
}

function doRegister() {
  const email = document.getElementById('auth-email')?.value;
  if (!email) { toast.error('Please enter your email'); return; }
  completeAuth(email.split('@')[0] || 'Creator', email, true);
}

function doSocialLogin(provider) {
  completeAuth(`${provider} User`, `user@${provider.toLowerCase()}.com`);
}

function completeAuth(name, email, isNew = false) {
  EP.user.loggedIn = true;
  EP.user.name = name;
  EP.user.email = email;
  EP.user.tokens = 90;
  EP.user.trialActive = true;
  EP.user.plan = 'normal';

  modal.close();
  updateUserUI();
  toast.success(`Welcome${isNew ? ' to Editing Pro' : ' back'}, ${name}! 🎉 You have 90 tokens ready.`, 4000);

  setTimeout(() => {
    toast.info('🎁 14-day free trial activated! Pro features unlocked.', 4000);
  }, 1500);
}

function updateUserUI() {
  const loginBtns = document.querySelectorAll('.nav-login-btn');
  const userMenus = document.querySelectorAll('.nav-user-menu');

  loginBtns.forEach(b => b.style.display = EP.user.loggedIn ? 'none' : '');
  userMenus.forEach(m => {
    m.style.display = EP.user.loggedIn ? 'flex' : 'none';
    const nameEl = m.querySelector('.user-name');
    const tokenEl = m.querySelector('.token-count');
    if (nameEl) nameEl.textContent = EP.user.name;
    if (tokenEl) tokenEl.textContent = EP.user.tokens;
  });
}

// ── Token Purchase ─────────────────────────────────────────────
function openTokenShop() {
  if (!EP.user.loggedIn) { openAuth('register'); return; }
  modal.create(`
    <h2 style="font-family:var(--font-display);font-size:1.5rem;font-weight:800;margin-bottom:6px;">🪙 Buy Tokens</h2>
    <p style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:24px;">You have <span style="color:var(--gold);font-weight:700;">${EP.user.tokens} tokens</span>. Each photo upscale costs 5 tokens.</p>
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;">
      ${[
        { amount: 50, price: 14, label: '' },
        { amount: 150, price: 35, label: 'Most Popular' },
        { amount: 300, price: 55, label: 'Best Value 🏆' },
      ].map(p => `
        <div onclick="purchaseTokens(${p.amount},${p.price})" style="display:flex;align-items:center;gap:14px;padding:14px 16px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border-subtle)'">
          <span style="font-size:1.8rem;">🪙</span>
          <div style="flex:1;">
            <div style="font-family:var(--font-display);font-weight:800;font-size:1.1rem;color:var(--gold);">${p.amount} Tokens</div>
            ${p.label ? `<div style="font-size:0.7rem;color:var(--text-muted);">${p.label}</div>` : ''}
          </div>
          <div style="font-family:var(--font-display);font-size:1.2rem;font-weight:800;">$${p.price}</div>
        </div>
      `).join('')}
    </div>
    <button data-modal-close class="btn btn-secondary w-full" style="justify-content:center;">Cancel</button>
  `);
}

function purchaseTokens(amount, price) {
  EP.user.tokens += amount;
  modal.close();
  updateUserUI();
  toast.success(`✅ ${amount} tokens added! (Demo — no real charge)`, 4000);
  document.querySelectorAll('.token-count').forEach(el => el.textContent = EP.user.tokens);
}

// ── Upgrade Prompt ────────────────────────────────────────────
function openUpgradeModal(feature = 'this feature') {
  modal.create(`
    <div style="text-align:center;margin-bottom:24px;">
      <div style="font-size:3rem;margin-bottom:12px;">🔒</div>
      <h2 style="font-family:var(--font-display);font-size:1.4rem;font-weight:800;margin-bottom:8px;">Upgrade Required</h2>
      <p style="color:var(--text-secondary);font-size:0.9rem;">Unlock <strong style="color:var(--purple-light);">${feature}</strong> with a Pro or Legend plan.</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;">
      <div onclick="upgradePlan('pro')" style="display:flex;align-items:center;gap:14px;padding:16px;background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.3);border-radius:var(--radius-lg);cursor:pointer;" onmouseover="this.style.borderColor='var(--purple)'" onmouseout="this.style.borderColor='rgba(124,58,237,0.3)'">
        <span style="font-size:1.8rem;">⚡</span>
        <div style="flex:1;">
          <div style="font-family:var(--font-display);font-weight:800;font-size:1rem;">Pro Plan</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">14-day free trial included</div>
        </div>
        <div style="font-family:var(--font-display);font-weight:800;font-size:1.1rem;">$15<span style="font-size:0.75rem;font-weight:400;color:var(--text-muted);">/mo</span></div>
      </div>
      <div onclick="upgradePlan('legend')" style="display:flex;align-items:center;gap:14px;padding:16px;background:rgba(251,191,36,0.05);border:1px solid rgba(251,191,36,0.3);border-radius:var(--radius-lg);cursor:pointer;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='rgba(251,191,36,0.3)'">
        <span style="font-size:1.8rem;">👑</span>
        <div style="flex:1;">
          <div style="font-family:var(--font-display);font-weight:800;font-size:1rem;">Legend Plan</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">Everything + Priority AI + 4K Export</div>
        </div>
        <div style="font-family:var(--font-display);font-weight:800;font-size:1.1rem;color:var(--gold);">$40<span style="font-size:0.75rem;font-weight:400;color:var(--text-muted);">/mo</span></div>
      </div>
    </div>
    <button data-modal-close class="btn btn-secondary w-full" style="justify-content:center;">Maybe Later</button>
  `);
}

function upgradePlan(plan) {
  if (!EP.user.loggedIn) { modal.close(); openAuth('register'); return; }
  EP.user.plan = plan;
  modal.close();
  updateUserUI();
  toast.success(`🎉 Upgraded to ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan! (Demo)`, 4000);
}

// ── Smooth Scroll ─────────────────────────────────────────────
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// ── DOM Ready ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Stars
  const starsBg = document.querySelector('.stars-bg');
  if (starsBg) createStars(starsBg, 100);

  // Navbar
  initNavbar();

  // Scroll Animations
  setTimeout(initScrollAnimations, 100);

  // Counters
  initCounters();

  // Mobile nav toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }
});
