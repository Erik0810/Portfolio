document.addEventListener('DOMContentLoaded', function() {
    // Constants
    const ANIMATION_TIMING = {
        zoom: 600,
        slide: 800
    };
    const BEZIER_CURVE = 'cubic-bezier(0.4, 0, 0.2, 1)';

    // Initialize Swiper
    const swiper = new Swiper('.swiper', {
        allowTouchMove: false,
        virtualTranslate: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            renderBullet: (_, className) => `<div class="${className}"></div>`
        }
    });

    // DOM Elements
    const slides = document.querySelectorAll('.swiper-slide');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    const bullets = document.querySelectorAll('.swiper-pagination-bullet');
    let isAnimating = false;

    // Utility Functions
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const resetSlideStates = (slide, options = {}) => {
        const { transition = 'none', opacity = '0', transform = 'none' } = options;
        slide.style.transition = transition;
        slide.style.opacity = opacity;
        slide.style.transform = transform;
        slide.querySelector('.slide-container').style.transform = 'none';
    };

    const updatePagination = targetIndex => {
        bullets.forEach((bullet, index) => {
            bullet.classList.toggle('swiper-pagination-bullet-active', index === targetIndex);
        });
    };

    // Animation Functions
    const animateSlide = async (currentSlide, targetSlide, direction) => {
        const isForward = direction === 'next';
        
        // Initial states - Keep target slide invisible
        resetSlideStates(targetSlide, {
            opacity: '0',
            transform: isForward ? 'translateX(100%)' : 'translateX(-100%)'
        });
        targetSlide.querySelector('.slide-container').style.transform = 'scale(0.5)';
        void targetSlide.offsetWidth;

        // Zoom out current
        const container = currentSlide.querySelector('.slide-container');
        container.style.transition = `transform ${ANIMATION_TIMING.zoom}ms ${BEZIER_CURVE}`;
        container.style.transform = 'scale(0.5)';
        await sleep(ANIMATION_TIMING.zoom);

        // Now make target slide visible and start slide transition
        targetSlide.style.opacity = '1';
        [currentSlide, targetSlide].forEach(slide => {
            slide.style.transition = `transform ${ANIMATION_TIMING.slide}ms ${BEZIER_CURVE}`;
        });
        currentSlide.style.transform = isForward ? 'translateX(-100%)' : 'translateX(100%)';
        targetSlide.style.transform = 'translateX(0)';
        await sleep(ANIMATION_TIMING.slide);

        // Zoom in target
        const targetContainer = targetSlide.querySelector('.slide-container');
        targetContainer.style.transition = `transform ${ANIMATION_TIMING.zoom}ms ${BEZIER_CURVE}`;
        targetContainer.style.transform = 'scale(1)';

        // Update states
        currentSlide.classList.remove('active');
        targetSlide.classList.add('active');
        resetSlideStates(currentSlide);
        await sleep(ANIMATION_TIMING.zoom);
    };

    async function handleSlideTransition(direction) {
        if (isAnimating) return;
        isAnimating = true;

        const currentSlide = document.querySelector('.swiper-slide.active');
        const currentIndex = Array.from(slides).indexOf(currentSlide);
        const nextIndex = direction === 'next'
            ? (currentIndex + 1) % slides.length
            : (currentIndex - 1 + slides.length) % slides.length;

        await animateSlide(currentSlide, slides[nextIndex], direction);
        direction === 'next' ? swiper.slideNext() : swiper.slidePrev();
        updatePagination(nextIndex);
        isAnimating = false;
    }

    async function handleDirectTransition(targetIndex) {
        if (isAnimating) return;
        const currentSlide = document.querySelector('.swiper-slide.active');
        const currentIndex = Array.from(slides).indexOf(currentSlide);
        
        if (currentIndex === targetIndex) return;
        isAnimating = true;

        await animateSlide(currentSlide, slides[targetIndex], targetIndex > currentIndex ? 'next' : 'prev');
        swiper.slideTo(targetIndex);
        updatePagination(targetIndex);
        isAnimating = false;
    }

    // Event Listeners
    bullets.forEach((bullet, index) => {
        bullet.addEventListener('click', () => handleDirectTransition(index));
    });

    nextButton.addEventListener('click', () => handleSlideTransition('next'));
    prevButton.addEventListener('click', () => handleSlideTransition('prev'));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') handleSlideTransition('next');
        if (e.key === 'ArrowLeft') handleSlideTransition('prev');
    });

    // Initialize first slide
    if (slides[0]) {
        slides[0].classList.add('active');
        resetSlideStates(slides[0], { opacity: '1' });
        bullets[0]?.classList.add('swiper-pagination-bullet-active');
    }

    // Add click handlers for website buttons with loading time warning
    const yomuLabWebsiteBtn = document.querySelector('.swiper-slide:nth-child(1) a[href="https://yomulab.onrender.com"]');
    const cloudripperWebsiteBtn = document.querySelector('.swiper-slide:nth-child(2) a[href="https://cloudripper.onrender.com"]');

    const handleWebsiteClick = (event) => {
        event.preventDefault();
        const url = event.target.href;
        const confirmed = window.confirm("Please note: This app is hosted on a free plan and may take up to 1 minute to load on first visit as the server needs to start up.");
        if (confirmed) {
            window.open(url, '_blank');
        }
    };

    if (yomuLabWebsiteBtn) {
        yomuLabWebsiteBtn.addEventListener('click', handleWebsiteClick);
    }
    if (cloudripperWebsiteBtn) {
        cloudripperWebsiteBtn.addEventListener('click', handleWebsiteClick);
    }
});
