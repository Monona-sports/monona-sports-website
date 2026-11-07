(function () {
    var STORAGE_KEY = 'hoopmo_lang';
    var REDIRECT_FLAG = 'hoopmo_lang_redirected';

    function getPreference() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function setPreference(lang) {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {
            /* ignore */
        }
    }

    function browserPrefersChinese() {
        var langs = [];
        if (navigator.languages && navigator.languages.length) {
            langs = Array.prototype.slice.call(navigator.languages);
        } else if (navigator.language) {
            langs = [navigator.language];
        }
        return langs.some(function (lang) {
            return /^zh\b/i.test(lang || '');
        });
    }

    function isZhPath(pathname) {
        return /^\/zh(\/|$)/.test(pathname || '');
    }

    function toZhPath(pathname) {
        var path = pathname || '/';
        if (isZhPath(path)) return path;
        if (path === '/' || path === '') return '/zh/';
        if (path === '/index.html') return '/zh/';
        if (path.indexOf('/linktree') === 0) {
            return path.indexOf('/linktree/') === 0 || path === '/linktree' || path === '/linktree/'
                ? '/zh/linktree/'
                : '/zh' + path;
        }
        return '/zh' + path;
    }

    function toEnPath(pathname) {
        var path = pathname || '/';
        if (!isZhPath(path)) return path;
        var rest = path.replace(/^\/zh/, '') || '/';
        if (rest === '/' || rest === '/index.html') return '/';
        return rest;
    }

    function maybeAutoRedirect() {
        var pref = getPreference();
        var onZh = isZhPath(window.location.pathname);

        if (pref === 'zh' && !onZh) {
            window.location.replace(toZhPath(window.location.pathname) + window.location.search + window.location.hash);
            return;
        }
        if (pref === 'en' && onZh) {
            window.location.replace(toEnPath(window.location.pathname) + window.location.search + window.location.hash);
            return;
        }
        if (pref) return;

        try {
            if (sessionStorage.getItem(REDIRECT_FLAG)) return;
        } catch (e) {
            /* ignore */
        }

        if (!onZh && browserPrefersChinese()) {
            try {
                sessionStorage.setItem(REDIRECT_FLAG, '1');
            } catch (e2) {
                /* ignore */
            }
            window.location.replace(toZhPath(window.location.pathname) + window.location.search + window.location.hash);
        }
    }

    function bindToggle() {
        var links = document.querySelectorAll('[data-lang-switch]');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function (event) {
                var lang = this.getAttribute('data-lang-switch');
                if (!lang) return;
                setPreference(lang);
                var target = lang === 'zh'
                    ? toZhPath(window.location.pathname)
                    : toEnPath(window.location.pathname);
                if (target !== window.location.pathname) {
                    event.preventDefault();
                    window.location.href = target + window.location.search + window.location.hash;
                }
            });
        }
    }

    maybeAutoRedirect();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindToggle);
    } else {
        bindToggle();
    }

    window.HoopMoLang = {
        setPreference: setPreference,
        getPreference: getPreference,
        toZhPath: toZhPath,
        toEnPath: toEnPath
    };
})();
