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

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') swiper.slideNext();
        if (e.key === 'ArrowUp') swiper.slidePrev();
    });
});
