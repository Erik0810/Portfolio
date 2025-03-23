document.addEventListener('DOMContentLoaded', function() {
    const fadeUpElements = document.querySelectorAll('.fade-up');
    const fadeOutElements = document.querySelectorAll('.fade-out');
    
    // Add transition properties to fade-up elements
    fadeUpElements.forEach(element => {
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Add transition properties to fade-out elements
    fadeOutElements.forEach(element => {
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Wait a short moment, then add visible class to trigger animations
    setTimeout(() => {
        fadeUpElements.forEach(element => {
            element.classList.add('visible');
        });
        
        fadeOutElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 100);
});
