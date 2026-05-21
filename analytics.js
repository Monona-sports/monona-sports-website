/**
 * Google Analytics 4 for monona-sports.com
 */
const GA_MEASUREMENT_ID = 'G-C6VS1NKQHJ';

const CONSENT_KEY = 'monona_cookie_consent';

(function () {
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        window.dataLayer.push(arguments);
    }

    window.gtag = gtag;

    gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        wait_for_update: 500
    });

    let enabled = false;

    function getConsent() {
        try {
            return localStorage.getItem(CONSENT_KEY);
        } catch (e) {
            return null;
        }
    }

    function loadGtagScript() {
        if (document.querySelector('script[data-monona-gtag]')) return;
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
        script.setAttribute('data-monona-gtag', 'true');
        document.head.appendChild(script);
    }

    function enable() {
        if (enabled || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;

        loadGtagScript();
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, { send_page_view: true });
        gtag('consent', 'update', { analytics_storage: 'granted' });
        enabled = true;
    }

    function disable() {
        enabled = false;
    }

    function trackEvent(name, params) {
        if (!enabled) return;
        gtag('event', name, params || {});
    }

    window.MononaAnalytics = {
        enable: enable,
        disable: disable,
        trackEvent: trackEvent,
        CONSENT_KEY: CONSENT_KEY
    };

    function setupClickTracking() {
        document.addEventListener('click', function (e) {
            if (!enabled) return;

            const target = e.target.closest('a, button');
            if (!target) return;

            const pagePath = window.location.pathname;

            if (target.matches('a.nav-book-demo, a.coffee-chat-btn')) {
                trackEvent('book_demo_click', { page_path: pagePath });
                return;
            }

            if (target.matches('a.cta-button')) {
                trackEvent('cta_click', { cta: 'get_started', page_path: pagePath });
                return;
            }

            if (target.matches('a.download-btn[href*="apps.apple.com"]') ||
                (target.matches('a[href*="apps.apple.com"]') && target.closest('.socials, .download-buttons, .footer-socials'))) {
                trackEvent('app_download_click', { platform: 'ios', page_path: pagePath });
                return;
            }

            if (target.matches('.contact-btn')) {
                trackEvent('contact_click', { method: 'email', page_path: pagePath });
                return;
            }

            const href = target.getAttribute('href') || '';
            const socialNetworks = [
                { pattern: 'instagram.com', network: 'instagram' },
                { pattern: 'tiktok.com', network: 'tiktok' },
                { pattern: 'discord.gg', network: 'discord' },
                { pattern: 'linkedin.com', network: 'linkedin' }
            ];

            for (const social of socialNetworks) {
                if (href.includes(social.pattern) && target.closest('.socials, .footer-socials, .team-grid, .team-card')) {
                    trackEvent('social_click', { network: social.network, page_path: pagePath });
                    return;
                }
            }
        });
    }

    function setupCalendlyTracking() {
        if (!document.querySelector('.calendly-inline-widget')) return;

        window.addEventListener('message', function (e) {
            if (e.origin !== 'https://calendly.com') return;
            if (e.data && e.data.event === 'calendly.event_scheduled') {
                trackEvent('generate_lead', { method: 'calendly' });
            }
        });
    }

    function init() {
        setupClickTracking();
        setupCalendlyTracking();

        if (getConsent() === 'accepted') {
            enable();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
