function loadTechIcons() {
    document.querySelectorAll('.tech-icon').forEach(icon => {
        const name = icon.dataset.icon;
        fetch(`/static/images/tech_icons/${name}.svg`)
            .then(response => response.text())
            .then(svgText => {
                // Parse SVG and set its attributes
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
                const svg = svgDoc.querySelector('svg');
                svg.setAttribute('width', '100%');
                svg.setAttribute('height', '100%');
                svg.style.display = 'block';
                icon.innerHTML = svg.outerHTML;
            });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Start loading tech icons immediately after DOM content loads
    setTimeout(() => loadTechIcons(), 100);
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
