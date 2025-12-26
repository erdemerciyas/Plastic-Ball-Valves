
document.addEventListener('DOMContentLoaded', () => {
    // Lightbox Functionality
    window.openLightbox = function (element) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const img = element.querySelector('img');
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    };

    window.closeLightbox = function (event) {
        if (event.target.id === 'lightbox' || event.target.className === 'close-lightbox') {
            document.getElementById('lightbox').style.display = 'none';
        }
    };

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once visible to run animation only once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Cinema Mode Video Gallery Logic
    const mainPlayer = document.getElementById('main-video-player');
    const videoThumbs = document.querySelectorAll('.video-thumb');

    if (mainPlayer && videoThumbs.length > 0) {
        videoThumbs.forEach(thumb => {
            thumb.addEventListener('click', function () {
                // Update Main Player Source
                const newSrc = this.dataset.videoSrc;
                mainPlayer.src = newSrc;
                mainPlayer.play();

                // Update Active State
                videoThumbs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
});

// Language Switching Logic
window.changeLanguage = function (lang) {
    if (!languageResources[lang]) {
        console.error('Language resource not found for:', lang);
        return;
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(languageResources[lang], 'text/xml');
    const resources = xmlDoc.getElementsByTagName('string');
    const langData = {};

    for (let i = 0; i < resources.length; i++) {
        const name = resources[i].getAttribute('name');
        const value = resources[i].textContent;
        langData[name] = value;
    }

    updateContent(langData);
    localStorage.setItem('selectedLanguage', lang);

    // Update active state of buttons
    document.querySelectorAll('.language-switcher button').forEach(btn => {
        if (btn.innerText.toLowerCase() === lang) {
            btn.style.opacity = '1';
            btn.style.fontWeight = 'bold';
        } else {
            btn.style.opacity = '0.7';
            btn.style.fontWeight = 'normal';
        }
    });
};

function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (langData[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = langData[key];
            } else {
                element.innerHTML = langData[key];
            }
        }
    });
}

// Initialize Language
const savedLang = localStorage.getItem('selectedLanguage') || 'tr';
changeLanguage(savedLang);


// Mobile Menu Logic - Enhanced UX
const mobileBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
const closeBtn = document.querySelector('.close-mobile-menu');

function openMobileMenu() {
    mobileNav.classList.add('active');
    mobileBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeMobileMenuFn() {
    mobileNav.classList.remove('active');
    mobileBackdrop.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
}

if (mobileBtn) {
    mobileBtn.addEventListener('click', openMobileMenu);
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileMenuFn);
}

if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenuFn);
}

window.closeMobileMenu = closeMobileMenuFn;

// Update language button active states
function updateLanguageButtons(lang) {
    document.querySelectorAll('.mobile-lang-switch button').forEach(btn => {
        if (btn.textContent.toLowerCase() === lang.toLowerCase()) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Call on page load
const currentLang = localStorage.getItem('selectedLanguage') || 'tr';
updateLanguageButtons(currentLang);

