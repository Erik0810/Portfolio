document.addEventListener('DOMContentLoaded', function() {
    // Simple Swiper initialization
    const swiper = new Swiper('.page-swiper-container', {
        init: true,
        direction: 'vertical',
        slidesPerView: 1,
        speed: 400,
        spaceBetween: 0,
        allowTouchMove: true,
        followFinger: false,
        effect: 'slide',
        navigation: {
            nextEl: '.nav-button.next',
            prevEl: '.nav-button.prev'
        }
    });

    // Handle fade animations
    const firstSlideContent = document.querySelector('.swiper-slide:first-child .fade-out');
    
    // Initial state - ensure content is visible
    setTimeout(() => {
        firstSlideContent.classList.add('visible');
    }, 100);
    
    // Handle fade out when sliding down
    swiper.on('slideNextTransitionStart', function() {
        if (swiper.activeIndex === 1) {
            // Add small delay to sync with slide transition
            setTimeout(() => {
                firstSlideContent.classList.add('fade-out-active');
            }, 50);
        }
    });

    // Handle fade in when sliding up
    swiper.on('slidePrevTransitionStart', function() {
        if (swiper.activeIndex === 0) {
            firstSlideContent.classList.remove('fade-out-active');
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') swiper.slideNext();
        if (e.key === 'ArrowUp') swiper.slidePrev();
    });
});
