document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-up');
    
    // Add transition properties to elements
    elements.forEach(element => {
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Wait a short moment, then add visible class to trigger animation
    setTimeout(() => {
        elements.forEach(element => {
            element.classList.add('visible');
        });
    }, 100);
});
