// ── Active nav link ──
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.href === location.href) a.classList.add('active');
});

// ── Modal helpers ──
function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

// ── Toggle buttons ──
document.querySelectorAll('.toggle-group').forEach(group => {
  group.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.target;
      if (target) {
        const panel = document.getElementById(target);
        if (panel) {
          const siblings = panel.parentElement.querySelectorAll('.toggle-panel');
          siblings.forEach(s => s.style.display = 'none');
          panel.style.display = 'block';
        }
      }
    });
  });
});

// ── Toast notification ──
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `alert alert-${type} fade-in`;
  toast.style.cssText = 'position:fixed;bottom:2rem;right:2rem;z-index:999;min-width:280px;box-shadow:0 8px 32px rgba(0,0,0,0.4)';
  toast.innerHTML = `<span>${type === 'success' ? '✓' : type === 'danger' ? '✗' : 'ℹ'}</span> ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ── Animate stat numbers ──
function animateNumber(el, target, duration = 1200) {
  const start = performance.now();
  const from = 0;
  const isFloat = target % 1 !== 0;
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = from + (target - from) * ease;
    el.textContent = isFloat ? current.toFixed(1) : Math.round(current).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Run number animations on elements with data-count
document.querySelectorAll('[data-count]').forEach(el => {
  const target = parseFloat(el.dataset.count);
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateNumber(el, target);
      observer.disconnect();
    }
  });
  observer.observe(el);
});
