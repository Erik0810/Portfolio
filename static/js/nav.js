document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const menuItems = navLinks ? navLinks.querySelectorAll('a') : [];
    let isAnimating = false;

    // Ensure all menu items are visible when menu opens
    const showMenuItems = () => {
        menuItems.forEach((item, index) => {
            item.style.transitionDelay = `${0.05 * (index + 1)}s`;
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        });
    };

    const hideMenuItems = () => {
        menuItems.forEach((item) => {
            item.style.transitionDelay = '0s';
            item.style.opacity = '0';
            item.style.transform = 'translateY(-8px)';
        });
    };

    // Performance optimization for animations
    if (navToggle && navLinks && menuItems.length > 0) {
        // Add will-change hint when hovering over nav area
        header.addEventListener('mouseenter', () => {
            if (!navLinks.classList.contains('active')) {
                navToggle.style.willChange = 'transform';
                navLinks.style.willChange = 'transform, opacity';
            }
        });

        // Remove will-change hint when leaving nav area
        header.addEventListener('mouseleave', () => {
            if (!navLinks.classList.contains('active')) {
                navToggle.style.willChange = 'auto';
                navLinks.style.willChange = 'auto';
            }
        });

        // Enhanced toggle handler
        const toggleMenu = (event) => {
            if (isAnimating) return;
            isAnimating = true;

            const isOpen = navLinks.classList.contains('active');
            
            if (!isOpen) {
                // Opening menu
                navLinks.style.display = 'flex';
                requestAnimationFrame(() => {
                    navToggle.classList.add('active');
                    navLinks.classList.add('active');
                    showMenuItems();
                });
            } else {
                // Closing menu
                hideMenuItems();
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }

            // Reset animation state after transition
            setTimeout(() => {
                isAnimating = false;
                if (!navLinks.classList.contains('active')) {
                    navLinks.style.display = 'none';
                }
                // Remove will-change hint if menu is closed
                if (!isOpen) {
                    navToggle.style.willChange = 'auto';
                    navLinks.style.willChange = 'auto';
                }
            }, 300);
        };

        // Enhanced click handling
        navToggle.addEventListener('click', toggleMenu);

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) &&
                !navLinks.contains(e.target) &&
                navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });

        // Enhanced link click handling
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu();
            });
        });

        // Add touch event handling
        let touchStartY = 0;
        navLinks.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        navLinks.addEventListener('touchmove', (e) => {
            const touchCurrentY = e.touches[0].clientY;
            const diff = touchStartY - touchCurrentY;

            // If swiping up significantly, close the menu
            if (diff > 50) {
                toggleMenu();
            }
        }, { passive: true });
    }

    // Add reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--ease-spring', 'ease');
    }
});