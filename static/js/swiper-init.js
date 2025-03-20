document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper', {
        allowTouchMove: false,
        virtualTranslate: true,
    });

    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    let isAnimating = false;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function animateSlideTransition(direction) {
        if (isAnimating) return;
        isAnimating = true;

        const slides = document.querySelectorAll('.swiper-slide');
        const currentSlide = document.querySelector('.swiper-slide.active');
        const currentIndex = Array.from(slides).indexOf(currentSlide);
        const nextIndex = direction === 'next' 
            ? (currentIndex + 1) % slides.length 
            : (currentIndex - 1 + slides.length) % slides.length;
        const nextSlide = slides[nextIndex];

        // Reset initial states for next slide
        nextSlide.style.transition = 'none';
        nextSlide.querySelector('.slide-container').style.transition = 'none';
        nextSlide.style.opacity = '1';
        nextSlide.style.transform = direction === 'next' 
            ? 'translateX(100%)' 
            : 'translateX(-100%)';
        nextSlide.querySelector('.slide-container').style.transform = 'scale(0.5)';

        // Force reflow
        void nextSlide.offsetWidth;

        // Step 1: Zoom out current slide
        currentSlide.querySelector('.slide-container').style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        currentSlide.querySelector('.slide-container').style.transform = 'scale(0.5)';

        // Wait for zoom out to complete
        await sleep(600);

        // Step 2: Slide current out and new in (both at 50% scale)
        currentSlide.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        nextSlide.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        currentSlide.style.transform = direction === 'next' 
            ? 'translateX(-100%)' 
            : 'translateX(100%)';
        nextSlide.style.transform = 'translateX(0)';

        // Wait for sliding to complete
        await sleep(800);

        // Step 3: Zoom in new slide from 50% to 100%
        nextSlide.querySelector('.slide-container').style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        nextSlide.querySelector('.slide-container').style.transform = 'scale(1)';

        // Update active states
        currentSlide.classList.remove('active');
        nextSlide.classList.add('active');

        // Reset states after animation
        currentSlide.style.opacity = '0';
        currentSlide.style.transform = 'none';
        currentSlide.querySelector('.slide-container').style.transform = 'none';

        // Update Swiper's internal state
        if (direction === 'next') {
            swiper.slideNext();
        } else {
            swiper.slidePrev();
        }

        await sleep(600);
        isAnimating = false;
    }

    // Event Listeners
    nextButton.addEventListener('click', () => {
        animateSlideTransition('next');
    });

    prevButton.addEventListener('click', () => {
        animateSlideTransition('prev');
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            animateSlideTransition('next');
        } else if (e.key === 'ArrowLeft') {
            animateSlideTransition('prev');
        }
    });

    // Initialize first slide
    const firstSlide = document.querySelector('.swiper-slide');
    if (firstSlide) {
        firstSlide.classList.add('active');
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'none';
        firstSlide.querySelector('.slide-container').style.transform = 'none';
    }
});
