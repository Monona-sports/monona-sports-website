document.addEventListener('DOMContentLoaded', function() {
    setupSmoothScrolling();
    setupNavbarScrollEffect();
    setupScrollReveal();
    setupMobileNav();
    setupHeroVideo();
});

function setupHeroVideo() {
    const video = document.querySelector('.hero-promo-video');
    const overlay = document.querySelector('.hero-video-overlay');
    const hero = document.querySelector('#home.hero');
    if (!video) return;

    let wasPlaying = false;
    let heroInView = true;
    let pageVisible = !document.hidden;
    let windowFocused = document.hasFocus();

    function hideOverlay() {
        if (overlay) overlay.classList.remove('visible');
    }

    function showOverlay() {
        if (overlay) overlay.classList.add('visible');
    }

    function shouldPlay() {
        return wasPlaying && heroInView && pageVisible && windowFocused;
    }

    function updatePlayback() {
        if (shouldPlay()) {
            video.play().then(hideOverlay).catch(function() {
                showOverlay();
            });
        } else if (!video.paused) {
            video.pause();
        }
    }

    function tryPlay() {
        video.muted = false;
        return video.play().then(function() {
            wasPlaying = true;
            hideOverlay();
        }).catch(function() {
            showOverlay();
        });
    }

    video.addEventListener('playing', function() {
        wasPlaying = true;
        hideOverlay();
    });

    if (overlay) {
        overlay.addEventListener('click', function() {
            tryPlay();
        });
    }

    if (hero) {
        new IntersectionObserver(function(entries) {
            heroInView = entries[0].isIntersecting;
            updatePlayback();
        }, { threshold: 0 }).observe(hero);
    }

    document.addEventListener('visibilitychange', function() {
        pageVisible = !document.hidden;
        updatePlayback();
    });

    window.addEventListener('blur', function() {
        windowFocused = false;
        updatePlayback();
    });

    window.addEventListener('focus', function() {
        windowFocused = true;
        updatePlayback();
    });

    tryPlay();
}

function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            e.preventDefault();
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

function setupNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.style.backgroundColor = '#081420';
        } else {
            navbar.style.backgroundColor = '';
        }
    });
}

function setupScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function(el) {
        observer.observe(el);
    });
}

function setupMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function() {
        toggle.classList.toggle('open');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            toggle.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}
