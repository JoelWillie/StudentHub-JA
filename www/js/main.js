
document.addEventListener('DOMContentLoaded', function () {
	document.documentElement.classList.add('js-enabled');
	try {
		var path = location.pathname.split('/').pop() || 'index.html';
		var links = document.querySelectorAll('nav.menubar a.menu-btn');
		links.forEach(function (a) {
			var href = a.getAttribute('href');
			if (href && href.split('?')[0].split('#')[0] === path) {
				a.setAttribute('aria-current', 'page');
				a.classList.add('active');
			}
		});
	} catch (err) {
		console.warn('main.js: nav highlight failed', err);
	}

	
	try {
		var THEME_KEY = 'site-theme';

		function getStoredTheme() {
			return localStorage.getItem(THEME_KEY);
		}

		function preferDark() {
			return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		}

		function applyTheme(theme) {
			var root = document.documentElement;
			if (theme === 'light') {
				root.classList.add('theme-light');
				root.classList.remove('theme-dark');
			} else {
				root.classList.remove('theme-light');
				root.classList.add('theme-dark');
			}

			
			var t = document.getElementById('themeToggle');
			if (t) {
				var pressed = theme === 'light' ? 'true' : 'false';
				t.setAttribute('aria-pressed', pressed);
				t.textContent = theme === 'light' ? '☀️' : '🌙';
			}
		}

		function initTheme() {
			var stored = getStoredTheme();
			var theme = stored || (preferDark() ? 'dark' : 'light');
			applyTheme(theme);
		}

		initTheme();

		var btn = document.getElementById('themeToggle');
		if (btn) {
			btn.addEventListener('click', function () {
				var current = document.documentElement.classList.contains('theme-light') ? 'light' : 'dark';
				var next = current === 'light' ? 'dark' : 'light';
				localStorage.setItem(THEME_KEY, next);
				applyTheme(next);
			});

			
			btn.addEventListener('keydown', function (e) {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					btn.click();
				}
			});
		}
	} catch (err) {
		console.warn('main.js: theme init failed', err);
	}

	// add a 'mounted' marker so page-specific entrance animations can run once JS is enabled
	try {
		// small delay helps the browser paint and then animate
		if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			setTimeout(function () { document.documentElement.classList.add('mounted'); }, 80);
		} else {
			// if reduced-motion is requested, still mark mounted but don't perform motion-sensitive transitions
			document.documentElement.classList.add('mounted');
		}
	} catch (err) {
		console.warn('main.js: mount marker failed', err);
	}
});
