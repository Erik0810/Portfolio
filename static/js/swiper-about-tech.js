document.addEventListener('DOMContentLoaded', function() {
    var TrendingSlider = new Swiper('.tech-slider', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 7,
        spaceBetween: 0,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        speed: 1000,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
            scale: 0.9
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true
        }
    });
});