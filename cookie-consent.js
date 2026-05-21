(function () {
    const CONSENT_KEY = window.MononaAnalytics && window.MononaAnalytics.CONSENT_KEY
        ? window.MononaAnalytics.CONSENT_KEY
        : 'monona_cookie_consent';

    function getConsent() {
        try {
            return localStorage.getItem(CONSENT_KEY);
        } catch (e) {
            return null;
        }
    }

    function setConsent(value) {
        try {
            localStorage.setItem(CONSENT_KEY, value);
        } catch (e) {
            /* storage unavailable */
        }
    }

    function hideBanner(banner) {
        banner.classList.add('cookie-consent-hidden');
        setTimeout(function () {
            banner.remove();
        }, 300);
    }

    function createBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookie-consent-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie consent');

        banner.innerHTML =
            '<div class="cookie-consent-inner">' +
            '<p class="cookie-consent-text">' +
            'We use cookies to measure site traffic and improve your experience. ' +
            'See our <a href="' + getPrivacyHref() + '">Privacy Notice</a> for details.' +
            '</p>' +
            '<div class="cookie-consent-actions">' +
            '<button type="button" class="cookie-consent-btn cookie-consent-reject">Reject</button>' +
            '<button type="button" class="cookie-consent-btn cookie-consent-accept">Accept</button>' +
            '</div>' +
            '</div>';

        banner.querySelector('.cookie-consent-accept').addEventListener('click', function () {
            setConsent('accepted');
            hideBanner(banner);
            if (window.MononaAnalytics) {
                window.MononaAnalytics.enable();
            }
        });

        banner.querySelector('.cookie-consent-reject').addEventListener('click', function () {
            setConsent('rejected');
            hideBanner(banner);
            if (window.MononaAnalytics) {
                window.MononaAnalytics.disable();
            }
        });

        document.body.appendChild(banner);
    }

    function getPrivacyHref() {
        const path = window.location.pathname;
        if (path.includes('/linktree/')) {
            return '../privacy.html';
        }
        return 'privacy.html';
    }

    function init() {
        const existing = getConsent();
        if (existing === 'accepted' || existing === 'rejected') {
            return;
        }
        createBanner();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
