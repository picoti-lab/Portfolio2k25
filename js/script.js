document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            if (window.innerWidth <= 768) { // Adjust breakpoint as needed
                document.querySelector('.nav-links').classList.remove('active');
                document.querySelector('.menu-toggle').classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Dynamic copyright year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Scroll animation (Fade-in effect)
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // element is visible by 10%
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.dataset.animationDelay || '0s';
                element.style.transitionDelay = delay;
                element.classList.add('fade-in');
                observer.unobserve(element); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Elements to observe
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // Handle initial state for elements already in view on page load
    const checkInitialVisibility = () => {
        hiddenElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                const delay = el.dataset.animationDelay || '0s';
                el.style.transitionDelay = delay;
                el.classList.add('fade-in');
            }
        });
    };

    // Run on load and resize
    window.addEventListener('load', checkInitialVisibility);
    window.addEventListener('resize', checkInitialVisibility);

    // Optional: Typewriter Effect for Hero Section Titles
    // Uncomment this section if you want the typewriter animation
    /*
    const typewriterElements = document.querySelectorAll('.typewriter-effect, .typewriter-effect-delay');
    typewriterElements.forEach(el => {
        const text = el.dataset.text;
        el.textContent = ''; // Clear initial text
        let i = 0;
        let speed = 50; // typing speed in ms

        function typeWriter() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        // Small delay to ensure CSS animation starts first
        setTimeout(typeWriter, el.classList.contains('typewriter-effect-delay') ? 3000 : 500); 
    });
    */
});