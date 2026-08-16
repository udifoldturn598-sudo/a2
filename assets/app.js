document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal observer
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-seen');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach((el) => {
            observer.observe(el);
        });
    }

    // SVG Liquid Bowl Fill Animation
    const liquidFills = document.querySelectorAll('.liquid-fill');
    if (liquidFills.length > 0) {
        const fillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const value = parseInt(fill.getAttribute('data-value'), 10);
                    // y coordinate represents height from top. y = 100 is empty, y = 100 - value is filled.
                    const targetY = 100 - (value * 0.7); // Scale slightly to keep bowl outline visible
                    
                    // Simple animation loop
                    let currentY = 100;
                    const speed = 1.5;
                    const animateFill = () => {
                        if (currentY > targetY) {
                            currentY -= speed;
                            fill.setAttribute('y', currentY);
                            requestAnimationFrame(animateFill);
                        } else {
                            fill.setAttribute('y', targetY);
                        }
                    };
                    animateFill();
                    fillObserver.unobserve(fill);
                }
            });
        }, {
            threshold: 0.5
        });

        liquidFills.forEach(f => fillObserver.observe(f));
    }
});
