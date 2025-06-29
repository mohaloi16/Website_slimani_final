document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // --- Hero Section Animations (initial page load) ---
    // Apply initial fade-in-up for hero elements
    gsap.from("#hero p.tracking-widest", { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" });
    gsap.from("#hero .w-16.h-0.5", { opacity: 0, y: 30, duration: 0.8, ease: "power2.out", delay: 0.1 });
    gsap.from("#hero .gsap-zoom-in", { opacity: 0, scale: 0.8, duration: 1.2, ease: "back.out(1.7)", delay: 0.2 });
    gsap.from("#hero-title", { opacity: 0, y: 30, duration: 0.8, ease: "power2.out", delay: 0.3 });
    gsap.from("#hero-subtitle", { opacity: 0, y: 30, duration: 0.8, ease: "power2.out", delay: 0.4 });
    gsap.from("#hero-button", { opacity: 0, y: 30, duration: 0.8, ease: "power2.out", delay: 0.5 });


    // --- General GSAP Animations on Scroll for .gsap-fade-in-up, .gsap-zoom-in, .gsap-fade-in-left ---
    gsap.utils.toArray('.gsap-fade-in-up:not(#hero p.tracking-widest, #hero .w-16.h-0.5, #hero-title, #hero-subtitle, #hero-button)').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%", // Animation starts when top of element is 85% from top of viewport
                end: "bottom top",
                toggleActions: "play none none none", // Play animation once
                // markers: true, // For debugging
            }
        });
    });

    gsap.utils.toArray('.gsap-zoom-in:not(#hero .gsap-zoom-in)').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            scale: 0.8,
            duration: 1.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: "bottom top",
                toggleActions: "play none none none",
                // markers: true,
            }
        });
    });

    gsap.utils.toArray('.gsap-fade-in-left').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            x: -50,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: "bottom top",
                toggleActions: "play none none none",
                // markers: true,
            }
        });
    });

    // Staggered animation for project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 100,
            y: 50,
            duration: 0.6,
            ease: "power2.out",
            delay: i * 0.1, // Stagger effect
            scrollTrigger: {
                trigger: card,
                start: "top 90%", // When the top of the card is 90% from the top of the viewport
                end: "bottom top",
                toggleActions: "play none none none",
                // markers: true,
            }
        });
    });


    // --- Header Scroll Effect ---
    const mainHeaderWrapper = document.querySelector('.main-header-wrapper');
    window.addEventListener("scroll", function () {
        if (window.scrollY > 30) {
            mainHeaderWrapper.classList.add("scrolled");
        } else {
            mainHeaderWrapper.classList.remove("scrolled");
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Collapsible Sections Logic ---
    const showWorksBtn = document.getElementById('show-works-btn');
    const worksSection = document.getElementById('works-section');
    const designPanel = document.getElementById('design-panel');
    const programmingPanel = document.getElementById('programming-panel');
    const designPortfolioContent = document.getElementById('design-portfolio-content');
    const programmingPortfolioContent = document.getElementById('programming-portfolio-content');
    const allNavLinks = document.querySelectorAll('.nav-link');
    const allCollapsibleSections = document.querySelectorAll('.collapsible-section');
    const heroSection = document.getElementById('hero');
    const worksPlaceholder = document.getElementById('works-section-placeholder');
    const btnText = document.getElementById('works-button-text');
    const btnIcon = document.getElementById('works-button-icon');
    let isVisible = false;

    
    if (showWorksBtn && worksSection) {
        showWorksBtn.addEventListener('click', (e) => {
          e.preventDefault();
          isVisible = !isVisible;
      
          // Update button text and icon
          btnText.textContent = isVisible ? 'HIDE WORKS' : 'VIEW MY WORKS';
          btnIcon.innerHTML = isVisible
            ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />`
            : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />`;
      
          // Toggle visibility
          if (isVisible) {
            // Calculate needed height (adjust based on your content)
            const sectionHeight = worksSection.scrollHeight;
            worksPlaceholder.style.height = `${sectionHeight}px`;
            
            worksSection.classList.remove('opacity-0', 'scale-y-0', 'pointer-events-none');
            worksSection.classList.add('opacity-100');
          } else {
            worksPlaceholder.style.height = '0';
            
            worksSection.classList.add('opacity-0', 'scale-y-0', 'pointer-events-none');
            worksSection.classList.remove('opacity-100');
          }
      
          // Smooth scroll to the section
          setTimeout(() => {
            worksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        });
    }
    // Function to toggle visibility of sections
    function toggleSectionVisibility(section) {
        if (section.classList.contains('hidden')) {
            section.classList.remove('hidden');
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
            section.classList.add('hidden');
        }
    }
    // Function to hide all collapsible sections
    function hideAllCollapsible() {
        allCollapsibleSections.forEach(section => {
            section.classList.remove('visible');
            section.classList.add('hidden');
        });
    }
    // Design Panel click
    if (designPanel && designPortfolioContent) {
        designPanel.addEventListener('click', () => {
            toggleSectionVisibility(designPortfolioContent);
        });
        designPanel.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                designPanel.click();
            }
        });
    }

    // Programming Panel click
    if (programmingPanel && programmingPortfolioContent) {
        programmingPanel.addEventListener('click', () => {
            toggleSectionVisibility(programmingPortfolioContent);
        });
        programmingPanel.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                programmingPanel.click();
            }
        });


    }
      document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const dataType = btn.dataset.type;
            if (dataType === 'design' && designPortfolioContent) {
                designPortfolioContent.classList.remove('visible');
                designPortfolioContent.classList.add('hidden');
            } else if (dataType === 'programming' && programmingPortfolioContent) {
                programmingPortfolioContent.classList.remove('visible');
                programmingPortfolioContent.classList.add('hidden');
            }
            toggleSectionVisibility(worksSection); // Go back to the main works selection
        });
    });

    // Handle all navigation links (desktop and mobile)
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (mobileMenu) mobileMenu.classList.add('hidden'); // Close mobile menu

            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetId === 'works-section') {
                toggleSectionVisibility(worksSection);
            } else if (targetId === 'design-portfolio-content' || targetId === 'programming-portfolio-content') {
                // These are usually triggered by panels, but if a nav link exists for them, handle here
                toggleSectionVisibility(targetSection);
            } else {
                // For direct sections like #hero, #about, #article-section, #contact-section
                hideAllCollapsible(); // Hide any open collapsible sections
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // --- Canvas Background Animation ---
    const canvas = document.getElementById('background-canvas');
    let ctx, width, height, particles;
    const particleCount = 50;
    const connectDistance = 150;

    if (canvas) {
        ctx = canvas.getContext('2d');

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = Math.random() * 0.4 - 0.2;
                this.vy = Math.random() * 0.4 - 0.2;
                this.radius = 1.5;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
                ctx.fill();
            }
        }

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const connectParticles = () => {
            for (let i = 0; i < particleCount; i++) {
                for (let j = i; j < particleCount; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < connectDistance) {
                        const opacity = 1 - (dist / connectDistance);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(44, 62, 80, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        };

        const animateCanvas = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            requestAnimationFrame(animateCanvas);
        };

        resize();
        animateCanvas();
        window.addEventListener('resize', resize);
    }

    // --- GSAP Project Card Animation on Scroll ---
    // Uses GSAP and ScrollTrigger to animate project cards as they scroll into view.
    // This functionality is hinted at in the main.css file.
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Target the portfolio sections that contain the cards
        const projectSections = document.querySelectorAll('#design-portfolio-content, #programming-portfolio-content');

        projectSections.forEach(section => {
            // Find the cards within each section that are marked for animation
            const cardsToAnimate = section.querySelectorAll('.project-card.animate-fade-in');

            if (cardsToAnimate.length > 0) {
                gsap.from(cardsToAnimate, {
                    // Animation properties are based on the 'fade-in-project' keyframes in CSS
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.2, // Animate cards one after another
                    scrollTrigger: {
                        trigger: section, // Animation starts when the section enters the view
                        start: 'top 80%', // Trigger point
                        toggleActions: 'play none none none', // Animation plays once and doesn't reverse
                    },
                });
            }
        });
    }
});
