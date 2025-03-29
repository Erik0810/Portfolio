document.addEventListener('DOMContentLoaded', function() {
    var TrendingSlider = new Swiper('.tech-slider', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 5,  // Reduced for better visibility of icons
        spaceBetween: 30,  // Added space between slides
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        speed: 1000,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 50,  // Reduced depth to prevent extreme perspective
            modifier: 1,
            slideShadows: false,
            scale: 0.9
        },
        keyboard: false, // Disable keyboard navigation for tech slider
        breakpoints: {
            // Mobile
            320: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            // Tablet
            768: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            // Desktop
            1024: {
                slidesPerView: 5,
                spaceBetween: 30
            }
        }
    });
});