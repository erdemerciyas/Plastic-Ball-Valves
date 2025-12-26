
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
