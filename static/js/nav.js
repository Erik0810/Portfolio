document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && 
                !navLinks.contains(e.target) && 
                navLinks.classList.contains('active')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});