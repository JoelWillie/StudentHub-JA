// ux.js — small shared page interaction helpers
// Also note that this file is also optional and can be removed if desired.
// - injects a subtle background layer (orbs)
// - handles click page transitions (fade-out) for internal links
// - provides a simple toggle to disable visuals (localStorage)

(function () {
  var STORAGE_KEY = 'ux-visuals-enabled';

  function isEnabled() {
    var s = localStorage.getItem(STORAGE_KEY);
    return s === null ? true : s === 'true';
  }

  function setEnabled(v) {
    localStorage.setItem(STORAGE_KEY, v ? 'true' : 'false');
    document.documentElement.dataset.ux = v ? 'on' : 'off';
  }

  function mountBackground() {
    if (!isEnabled()) return;
    var bg = document.createElement('div');
    bg.className = 'site-background';
    bg.innerHTML = '<div class="orb orb--a"></div><div class="orb orb--b"></div><div class="orb orb--c"></div>';
    document.body.appendChild(bg);
  }

  function installPageTransitions() {
    document.addEventListener('click', function (e) {
      if (!e.target) return;
      var a = e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href.indexOf('http') === 0 || a.target === '_blank' || href.indexOf('#') === 0) return;
      if (href.match(/\.(zip|pdf|docx|xlsx|jpg|jpeg|png)$/i)) return;

      e.preventDefault();
      document.documentElement.classList.add('page-exit');
      setTimeout(function () { location.href = href; }, 220);
    }, { capture: true });
  }

  function installToggle() {
    try {
      var header = document.querySelector('header');
      if (!header) return;
      var toggle = document.createElement('button');
      toggle.className = 'ux-toggle';
      toggle.setAttribute('aria-pressed', isEnabled() ? 'true' : 'false');
      toggle.title = 'Toggle subtle background visuals';
      toggle.innerHTML = isEnabled() ? '✨' : '✖';
      toggle.addEventListener('click', function () {
        var enabled = ! (localStorage.getItem(STORAGE_KEY) === 'true');
        setEnabled(enabled);
        toggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
        toggle.innerHTML = enabled ? '✨' : '✖';
        if (enabled) mountBackground();
        else {
          var found = document.querySelector('.site-background');
          if (found) found.remove();
        }
      });
      header.appendChild(toggle);
    } catch (err) { console.warn('ux: toggle failed', err); }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      mountBackground();
    }
    installPageTransitions();
    installToggle();

    document.documentElement.classList.add('page-enter');
  });
})();
