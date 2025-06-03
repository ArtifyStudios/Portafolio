// Custom JavaScript for ArteCube 3D Portfolio

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
    // Project filtering
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
    });
    
    // Add scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Form submission (basic validation)
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || document.getElementById('name').value;
            const email = formData.get('email') || document.getElementById('email').value;
            const subject = formData.get('subject') || document.getElementById('subject').value;
            const message = formData.get('message') || document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Por favor, completa todos los campos.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Por favor, introduce un email válido.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('¡Mensaje enviado correctamente! Te contactaré pronto.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Parallax effect for hero section (subtle)
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Instagram posts hover effect enhancement
    const instagramPosts = document.querySelectorAll('.instagram-post');
    instagramPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        post.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Project cards hover effect enhancement
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('fade-in');
        });
    });
    
    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    console.log('ArteCube 3D Portfolio loaded successfully!');
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.querySelector('a[download="CV_Juan_Esteban_Piedrahita.pdf"]');
    
    if(downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Registrar la descarga en analytics (si tienes)
            // Ejemplo con Google Analytics:
            if(typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'event_category': 'CV',
                    'event_label': 'CV descargado desde portafolio'
                });
            }
            
            // Opcional: abrir en nueva pestaña en lugar de descargar
            // e.preventDefault();
            // window.open(this.href, '_blank');
        });
    }
});

/* Animación de carrusel animación clientes*/

// Perfect Infinite Clients Animation Script

document.addEventListener('DOMContentLoaded', function() {
    const clientsCarousel = document.querySelector('.clients-carousel');
    const clientsWrapper = document.querySelector('.clients-carousel-wrapper');
    const clientLogos = document.querySelectorAll('.client-logo');
    
    // Ensure perfect infinite loop
    function setupInfiniteLoop() {
        const firstSet = clientsCarousel.children;
        const totalItems = firstSet.length / 2; // Since we have duplicates
        
        // Calculate exact width for seamless loop
        let totalWidth = 0;
        for (let i = 0; i < totalItems; i++) {
            const item = firstSet[i];
            const itemWidth = item.offsetWidth;
            const itemMargin = parseInt(getComputedStyle(item).marginLeft) + parseInt(getComputedStyle(item).marginRight);
            totalWidth += itemWidth + itemMargin;
        }
        
        // Set the exact animation distance
        const keyframes = `
            @keyframes scrollInfinite {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-${totalWidth}px);
                }
            }
        `;
        
        // Remove existing keyframes and add new ones
        const existingStyle = document.getElementById('infinite-scroll-keyframes');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        const style = document.createElement('style');
        style.id = 'infinite-scroll-keyframes';
        style.textContent = keyframes;
        document.head.appendChild(style);
        
        // Apply the animation
        clientsCarousel.style.animation = 'scrollInfinite 40s linear infinite';
    }
    
    // Initialize after images load
    let imagesLoaded = 0;
    const totalImages = clientLogos.length;
    
    function checkAllLoaded() {
        imagesLoaded++;
        if (imagesLoaded >= totalImages) {
            setTimeout(setupInfiniteLoop, 100); // Small delay to ensure layout is complete
        }
    }
    
    // Wait for layout to be ready
    clientLogos.forEach(logo => {
        if (logo.complete) {
            checkAllLoaded();
        } else {
            logo.addEventListener('load', checkAllLoaded);
        }
    });
    
    // Fallback: setup after a delay if images don't trigger load events
    setTimeout(setupInfiniteLoop, 500);
    
    // Pause on hover
    clientsWrapper.addEventListener('mouseenter', function() {
        clientsCarousel.style.animationPlayState = 'paused';
    });
    
    clientsWrapper.addEventListener('mouseleave', function() {
        clientsCarousel.style.animationPlayState = 'running';
    });
    
    // Individual logo interactions
    clientLogos.forEach((logo, index) => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.1)';
            this.style.zIndex = '10';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.zIndex = '';
        });
    });
    
    // Performance optimization: pause when page is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clientsCarousel.style.animationPlayState = 'paused';
        } else {
            clientsCarousel.style.animationPlayState = 'running';
        }
    });
    
    // Recalculate on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setupInfiniteLoop, 250);
    });
    
    // Touch support for mobile
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    clientsWrapper.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        clientsCarousel.style.animationPlayState = 'paused';
    }, { passive: true });
    
    clientsWrapper.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        // Optional: Add manual scroll effect here
    }, { passive: true });
    
    clientsWrapper.addEventListener('touchend', function() {
        isDragging = false;
        clientsCarousel.style.animationPlayState = 'running';
    }, { passive: true });
    
    // Keyboard accessibility
    clientsWrapper.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            const isRunning = clientsCarousel.style.animationPlayState !== 'paused';
            clientsCarousel.style.animationPlayState = isRunning ? 'paused' : 'running';
        }
    });
    
    // Make wrapper focusable for keyboard interaction
    clientsWrapper.setAttribute('tabindex', '0');
    clientsWrapper.setAttribute('aria-label', 'Carrusel de clientes - Presiona espacio para pausar/reanudar');
    
    console.log('Perfect infinite clients animation initialized!');
});

// Utility function to ensure smooth animation restart
function restartAnimation() {
    const carousel = document.querySelector('.clients-carousel');
    carousel.style.animation = 'none';
    carousel.offsetHeight; // Trigger reflow
    carousel.style.animation = 'scrollInfinite 40s linear infinite';
}

// Export for external use
window.ClientsAnimation = {
    restart: restartAnimation,
    pause: () => {
        document.querySelector('.clients-carousel').style.animationPlayState = 'paused';
    },
    play: () => {
        document.querySelector('.clients-carousel').style.animationPlayState = 'running';
    }
};
/* Animación de carrusel animación clientes*/

// hero seccion

// Hero Horizontal Carousel with Animated Text

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('heroCarousel');
    const textElements = document.querySelectorAll('.text-animated');
    
    // Initialize carousel
    const bsCarousel = new bootstrap.Carousel(carousel, {
        interval: 6000, // 6 seconds per slide
        wrap: true,
        touch: true
    });
    
    // Text animation function
    function animateText(element) {
        const texts = JSON.parse(element.dataset.texts);
        let currentIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';
        
        function typeText() {
            const fullText = texts[currentIndex];
            
            if (isDeleting) {
                currentText = fullText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = fullText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            element.textContent = currentText;
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === fullText.length) {
                // Pause at end of word
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeText, typeSpeed);
        }
        
        typeText();
    }
    
    // Initialize text animations for all slides
    function initializeTextAnimations() {
        textElements.forEach((element, index) => {
            // Start animation with a delay for each slide
            setTimeout(() => {
                animateText(element);
            }, index * 1000);
        });
    }
    
    // Start text animations
    initializeTextAnimations();
    
    // Restart text animation when slide changes
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        const textElement = activeSlide.querySelector('.text-animated');
        
        if (textElement) {
            // Reset and restart animation for the active slide
            setTimeout(() => {
                animateText(textElement);
            }, 500);
        }
    });
    
    // Pause carousel on hover
    carousel.addEventListener('mouseenter', function() {
        bsCarousel.pause();
    });
    
    carousel.addEventListener('mouseleave', function() {
        bsCarousel.cycle();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            bsCarousel.prev();
        } else if (e.key === 'ArrowRight') {
            bsCarousel.next();
        } else if (e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            const isPaused = carousel.classList.contains('paused');
            if (isPaused) {
                bsCarousel.cycle();
                carousel.classList.remove('paused');
            } else {
                bsCarousel.pause();
                carousel.classList.add('paused');
            }
        }
    });
    
    // Touch/swipe support enhancement
    let startX = 0;
    let endX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                bsCarousel.next();
            } else {
                bsCarousel.prev();
            }
        }
    }
    
    // Auto-pause when page is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            bsCarousel.pause();
        } else {
            bsCarousel.cycle();
        }
    });
    
    // Smooth scroll for CTA buttons
    const ctaButtons = document.querySelectorAll('.hero-content a[href^="#"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Progress indicator (optional)
    function createProgressIndicator() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'carousel-progress';
        progressContainer.innerHTML = '<div class="carousel-progress-bar"></div>';
        
        carousel.appendChild(progressContainer);
        
        const progressBar = progressContainer.querySelector('.carousel-progress-bar');
        
        function animateProgress() {
            progressBar.style.width = '0%';
            progressBar.style.transition = 'width 6s linear';
            
            setTimeout(() => {
                progressBar.style.width = '100%';
            }, 50);
        }
        
        // Start progress animation
        animateProgress();
        
        // Reset progress on slide change
        carousel.addEventListener('slide.bs.carousel', function() {
            animateProgress();
        });
        
        // Pause progress on hover
        carousel.addEventListener('mouseenter', function() {
            progressBar.style.animationPlayState = 'paused';
        });
        
        carousel.addEventListener('mouseleave', function() {
            progressBar.style.animationPlayState = 'running';
        });
    }
    
    // Add progress indicator styles
    const progressStyles = `
        .carousel-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            z-index: 10;
        }
        
        .carousel-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, var(--purple-primary), var(--purple-light));
            width: 0%;
            transition: width 0.1s linear;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = progressStyles;
    document.head.appendChild(styleSheet);
    
    // Initialize progress indicator
    createProgressIndicator();
    
    // Performance optimization
    const images = carousel.querySelectorAll('.hero-bg-img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
    
    console.log('Hero horizontal carousel with animated text initialized!');
});

// Export functions for external use
window.HeroCarousel = {
    next: () => {
        const carousel = bootstrap.Carousel.getInstance(document.getElementById('heroCarousel'));
        carousel.next();
    },
    prev: () => {
        const carousel = bootstrap.Carousel.getInstance(document.getElementById('heroCarousel'));
        carousel.prev();
    },
    pause: () => {
        const carousel = bootstrap.Carousel.getInstance(document.getElementById('heroCarousel'));
        carousel.pause();
    },
    cycle: () => {
        const carousel = bootstrap.Carousel.getInstance(document.getElementById('heroCarousel'));
        carousel.cycle();
    }
};

//hero section

//cursos section

// Courses Section Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Course Filtering
    const filterButtons = document.querySelectorAll('.course-categories .btn');
    const courseItems = document.querySelectorAll('.course-item');
    
    // Initialize Isotope/filtering functionality
    function initializeFiltering() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter courses
                courseItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        if (item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }
    
    // Initialize filtering
    initializeFiltering();
    
    // Course Card Hover Effects
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.card-img-top').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.card-img-top').style.transform = 'scale(1)';
        });
    });
    
    // Lazy Loading for Course Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('.card-img-top').forEach(img => {
            if (img.getAttribute('data-src')) {
                imageObserver.observe(img);
            }
        });
    }
    
    // Course Rating Hover Effect
    const ratingElements = document.querySelectorAll('.course-rating');
    
    ratingElements.forEach(rating => {
        rating.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        rating.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Smooth Scroll for Course Links
    const courseLinks = document.querySelectorAll('.course-card .btn');
    
    courseLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // This would be replaced with actual course link behavior
            // For demo purposes, we're just preventing default
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                
                // Show a demo modal or alert
                alert('¡Enlace al curso! Aquí se abriría la página del curso.');
            }
        });
    });
    
    // Animation on Scroll for Benefits
    function animateBenefits() {
        const benefitCards = document.querySelectorAll('.benefit-card');
        
        if ('IntersectionObserver' in window) {
            const benefitObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        benefitObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            benefitCards.forEach(card => {
                benefitObserver.observe(card);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            benefitCards.forEach(card => {
                card.classList.add('animated');
            });
        }
    }
    
    // Initialize benefit animations
    animateBenefits();
    
    // Add CSS for animated benefits
    const style = document.createElement('style');
    style.textContent = `
        .benefit-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .benefit-card.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .benefit-card:nth-child(1).animated { transition-delay: 0.1s; }
        .benefit-card:nth-child(2).animated { transition-delay: 0.3s; }
        .benefit-card:nth-child(3).animated { transition-delay: 0.5s; }
    `;
    document.head.appendChild(style);
    
    // Course View All Button Effect
    const viewAllButton = document.querySelector('.btn-outline-purple.btn-lg');
    
    if (viewAllButton) {
        viewAllButton.addEventListener('mouseenter', function() {
            this.innerHTML = 'Explorar Catálogo Completo <i class="bi bi-arrow-right ms-2"></i>';
        });
        
        viewAllButton.addEventListener('mouseleave', function() {
            this.innerHTML = 'Ver Todos los Cursos <i class="bi bi-grid-3x3-gap ms-2"></i>';
        });
    }
    
    console.log('Courses section initialized successfully!');
});

// cursos section

// Footer section

// Modern Footer Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    function toggleBackToTopButton() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
    
    // Show/hide back to top button on scroll
    window.addEventListener('scroll', toggleBackToTopButton);
    
    // Smooth scroll to top
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Disable button and show loading state
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="bi bi-hourglass-split"></i>';
                
                // Simulate API call
                setTimeout(() => {
                    // Success state
                    submitButton.innerHTML = '<i class="bi bi-check-lg"></i>';
                    submitButton.style.background = '#10b981';
                    emailInput.value = '';
                    
                    // Show success message
                    showNotification('¡Gracias por suscribirte! Te mantendremos informado.', 'success');
                    
                    // Reset button after 2 seconds
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.innerHTML = '<i class="bi bi-send"></i>';
                        submitButton.style.background = '';
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    // Smooth scrolling for footer links
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact links functionality
    const contactLinks = document.querySelectorAll('.contact-value[href^="mailto"], .contact-value[href^="tel"]');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add a subtle animation when clicked
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Social links tracking (for analytics)
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // For demo purposes, prevent default and show alert
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                
                const platform = this.getAttribute('aria-label');
                showNotification(`Redirigiendo a ${platform}...`, 'info');
                
                // In a real implementation, you would track this event
                // gtag('event', 'social_click', { platform: platform });
            }
        });
    });
    
    // Animate stats on scroll
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalNumber = target.textContent;
                    const number = parseInt(finalNumber.replace(/\D/g, ''));
                    const suffix = finalNumber.replace(/\d/g, '');
                    
                    animateNumber(target, 0, number, suffix, 2000);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    function animateNumber(element, start, end, suffix, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }
    
    // Initialize stats animation
    animateStats();
    
    // Footer background elements animation
    function initBackgroundAnimation() {
        const bgElements = document.querySelectorAll('.bg-element');
        
        bgElements.forEach((element, index) => {
            // Random movement on mouse move
            document.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth) * 10;
                const y = (e.clientY / window.innerHeight) * 10;
                
                element.style.transform = `translate(${x * (index + 1)}px, ${y * (index + 1)}px) rotate(${x}deg)`;
            });
        });
    }
    
    // Initialize background animation
    initBackgroundAnimation();
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="bi bi-${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
    
    function getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'check-circle-fill';
            case 'error': return 'exclamation-triangle-fill';
            case 'warning': return 'exclamation-circle-fill';
            default: return 'info-circle-fill';
        }
    }
    
    function getNotificationColor(type) {
        switch (type) {
            case 'success': return '#10b981';
            case 'error': return '#ef4444';
            case 'warning': return '#f59e0b';
            default: return '#3b82f6';
        }
    }
    
    // Lazy loading for footer images (if any)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Performance optimization: Pause animations when page is not visible
    document.addEventListener('visibilitychange', function() {
        const bgElements = document.querySelectorAll('.bg-element');
        
        if (document.hidden) {
            bgElements.forEach(element => {
                element.style.animationPlayState = 'paused';
            });
        } else {
            bgElements.forEach(element => {
                element.style.animationPlayState = 'running';
            });
        }
    });
    
    console.log('Modern footer initialized successfully!');
});

// Export functions for external use
window.FooterUtils = {
    scrollToTop: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    subscribeNewsletter: (email) => {
        // This would integrate with your newsletter service
        console.log('Newsletter subscription:', email);
        return Promise.resolve({ success: true });
    }
};

// Footer section

// Project section

// Featured Project Gallery Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap Carousel
    const galleryCarousel = document.getElementById('featuredGalleryCarousel');
    const carousel = new bootstrap.Carousel(galleryCarousel, {
        interval: false, // Don't auto-rotate
        touch: true,     // Enable touch swiping
        wrap: true       // Cycle continuously
    });
    
    // Update active thumbnail when carousel slides
    galleryCarousel.addEventListener('slid.bs.carousel', function(event) {
        const activeIndex = event.to;
        updateActiveThumbnail(activeIndex);
    });
    
    // Initialize thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail:not(.more-images)');
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            carousel.to(index);
            updateActiveThumbnail(index);
        });
    });
    
    function updateActiveThumbnail(activeIndex) {
        thumbnails.forEach((thumb, i) => {
            if (i === activeIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }
    
    // Image Modal Functionality
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const imgSrc = button.getAttribute('data-img');
            const imgTitle = button.getAttribute('data-title');
            
            const modalImg = imageModal.querySelector('.modal-img');
            const modalTitle = imageModal.querySelector('.modal-title');
            
            modalImg.src = imgSrc;
            if (imgTitle) {
                modalTitle.textContent = imgTitle;
            } else {
                modalTitle.textContent = 'Vista Detallada';
            }
        });
    }
    
    // Gallery Grid Modal Functionality
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
        const zoomButtons = galleryModal.querySelectorAll('.btn-zoom-grid');
        
        zoomButtons.forEach(button => {
            button.addEventListener('click', function() {
                const imgSrc = this.getAttribute('data-img');
                
                // Use the existing image modal
                const modalImg = document.querySelector('#imageModal .modal-img');
                const modalTitle = document.querySelector('#imageModal .modal-title');
                
                modalImg.src = imgSrc;
                modalTitle.textContent = 'Vista Detallada';
                
                // Hide the gallery modal and show the image modal
                const galleryModalInstance = bootstrap.Modal.getInstance(galleryModal);
                galleryModalInstance.hide();
                
                setTimeout(() => {
                    const imageModalInstance = new bootstrap.Modal(imageModal);
                    imageModalInstance.show();
                }, 500);
            });
        });
    }
    
    // Keyboard Navigation for Carousel
    document.addEventListener('keydown', function(e) {
        // Only if carousel is visible
        if (galleryCarousel.offsetParent !== null) {
            if (e.key === 'ArrowLeft') {
                carousel.prev();
            } else if (e.key === 'ArrowRight') {
                carousel.next();
            }
        }
    });
    
    // Touch Swipe Enhancement
    let touchStartX = 0;
    let touchEndX = 0;
    
    galleryCarousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    galleryCarousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            carousel.next();
        } else if (touchEndX > touchStartX + threshold) {
            carousel.prev();
        }
    }
    
    // Lazy Loading for Gallery Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Animation on Scroll for Process Steps
    function animateProcessSteps() {
        const processSteps = document.querySelectorAll('.process-step');
        
        if ('IntersectionObserver' in window) {
            const processObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('animated');
                        }, index * 200);
                        processObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            processSteps.forEach(step => {
                processObserver.observe(step);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            processSteps.forEach(step => {
                step.classList.add('animated');
            });
        }
    }
    
    // Initialize process steps animation
    animateProcessSteps();
    
    // Add CSS for animated process steps
    const style = document.createElement('style');
    style.textContent = `
        .process-step {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .process-step.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Image Zoom Effect
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Project Info Card Hover Effect
    const projectInfoCard = document.querySelector('.project-info-card');
    
    if (projectInfoCard) {
        projectInfoCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        projectInfoCard.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    }
    
    console.log('Featured project gallery initialized successfully!');
});

// Project section

// habilidades section

// Skills Section Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Animate skill bars on scroll
    function animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillProgress = entry.target.querySelector('.skill-progress');
                    const targetWidth = skillProgress.getAttribute('data-width');
                    
                    setTimeout(() => {
                        skillProgress.style.width = targetWidth + '%';
                    }, 200);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // Animate overview numbers
    function animateOverviewNumbers() {
        const overviewNumbers = document.querySelectorAll('.overview-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalText = target.textContent;
                    
                    // Extract number and suffix
                    const numberMatch = finalText.match(/[\d.]+/);
                    const number = numberMatch ? parseFloat(numberMatch[0]) : 0;
                    const suffix = finalText.replace(/[\d.]/g, '');
                    
                    animateNumber(target, 0, number, suffix, 2000);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        overviewNumbers.forEach(number => {
            observer.observe(number);
        });
    }
    
    function animateNumber(element, start, end, suffix, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            
            // Format number based on suffix
            let displayValue;
            if (suffix.includes('+')) {
                displayValue = Math.floor(current) + '+';
            } else if (current % 1 !== 0) {
                displayValue = current.toFixed(1) + suffix;
            } else {
                displayValue = Math.floor(current) + suffix;
            }
            
            element.textContent = displayValue;
        }, 16);
    }
    
    // Animate specialization stats
    function animateSpecializationStats() {
        const statNumbers = document.querySelectorAll('.specialization-stats .stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalText = target.textContent;
                    
                    // Extract number and suffix
                    const numberMatch = finalText.match(/[\d.]+/);
                    const number = numberMatch ? parseFloat(numberMatch[0]) : 0;
                    const suffix = finalText.replace(/[\d.]/g, '');
                    
                    animateNumber(target, 0, number, suffix, 1500);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    // Add hover effects to skill items
    function addSkillHoverEffects() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const skillProgress = this.querySelector('.skill-progress');
                skillProgress.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
            });
            
            item.addEventListener('mouseleave', function() {
                const skillProgress = this.querySelector('.skill-progress');
                skillProgress.style.boxShadow = '';
            });
        });
    }
    
    // Add click effects to creative skill cards
    function addCreativeSkillEffects() {
        const creativeCards = document.querySelectorAll('.creative-skill-card');
        
        creativeCards.forEach(card => {
            card.addEventListener('click', function() {
                // Add a pulse effect
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Show skill details (could be expanded to show modal)
                const skillName = this.querySelector('h5').textContent;
                console.log(`Clicked on skill: ${skillName}`);
            });
        });
    }
    
    // Add certification hover effects
    function addCertificationEffects() {
        const certItems = document.querySelectorAll('.certification-item');
        
        certItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const badge = this.querySelector('.cert-badge');
                badge.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            item.addEventListener('mouseleave', function() {
                const badge = this.querySelector('.cert-badge');
                badge.style.transform = '';
            });
        });
    }
    
    // Smooth scroll for CTA buttons
    function addSmoothScroll() {
        const ctaButtons = document.querySelectorAll('.skills-cta a[href^="#"]');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Add staggered animation to cards
    function addStaggeredAnimation() {
        const animatedElements = document.querySelectorAll('.skill-item, .creative-skill-card, .specialization-card, .certification-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
    
    // Add skill filtering functionality
    function addSkillFiltering() {
        // This could be expanded to add filtering by skill type, level, etc.
        const skillCategories = document.querySelectorAll('.skills-category');
        
        skillCategories.forEach(category => {
            const header = category.querySelector('.category-header');
            header.style.cursor = 'pointer';
            
            header.addEventListener('click', function() {
                const content = category.querySelector('.skills-list, .creative-skills-grid');
                const isVisible = content.style.display !== 'none';
                
                content.style.display = isVisible ? 'none' : 'block';
                
                // Add rotation to icon
                const icon = this.querySelector('.category-icon');
                icon.style.transform = isVisible ? 'rotate(180deg)' : 'rotate(0deg)';
            });
        });
    }
    
    // Add skill search functionality
    function addSkillSearch() {
        // Create search input (could be added to HTML)
        const searchContainer = document.createElement('div');
        searchContainer.className = 'skill-search-container mb-4';
        searchContainer.innerHTML = `
            <div class="input-group">
                <input type="text" class="form-control" id="skillSearch" placeholder="Buscar habilidades...">
                <span class="input-group-text">
                    <i class="bi bi-search"></i>
                </span>
            </div>
        `;
        
        const skillsSection = document.querySelector('.skills-section .container');
        const mainContent = skillsSection.querySelector('.row.g-5');
        skillsSection.insertBefore(searchContainer, mainContent);
        
        const searchInput = document.getElementById('skillSearch');
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const skillItems = document.querySelectorAll('.skill-item, .creative-skill-card');
            
            skillItems.forEach(item => {
                const skillName = item.querySelector('h5').textContent.toLowerCase();
                const skillTags = Array.from(item.querySelectorAll('.skill-tag, .spec-skill'))
                    .map(tag => tag.textContent.toLowerCase());
                
                const matches = skillName.includes(searchTerm) || 
                    skillTags.some(tag => tag.includes(searchTerm));
                
                item.style.display = matches ? 'block' : 'none';
            });
        });
    }
    
    // Initialize all functions
    animateSkillBars();
    animateOverviewNumbers();
    animateSpecializationStats();
    addSkillHoverEffects();
    addCreativeSkillEffects();
    addCertificationEffects();
    addSmoothScroll();
    addStaggeredAnimation();
    
    // Optional features (uncomment to enable)
    // addSkillFiltering();
    // addSkillSearch();
    
    // Performance optimization for low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        const style = document.createElement('style');
        style.textContent = `
            .skill-progress::after {
                animation: none !important;
            }
            .skill-item,
            .creative-skill-card,
            .specialization-card,
            .certification-item {
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('Skills section initialized successfully!');
});

// Export utilities for external use
window.SkillsUtils = {
    animateSkillBar: (skillItem) => {
        const skillProgress = skillItem.querySelector('.skill-progress');
        const targetWidth = skillProgress.getAttribute('data-width');
        skillProgress.style.width = targetWidth + '%';
    },
    
    highlightSkill: (skillName) => {
        const skillItems = document.querySelectorAll('.skill-item, .creative-skill-card');
        skillItems.forEach(item => {
            const name = item.querySelector('h5').textContent;
            if (name.toLowerCase().includes(skillName.toLowerCase())) {
                item.style.background = 'rgba(139, 92, 246, 0.1)';
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    },
    
    getSkillLevel: (skillName) => {
        const skillItems = document.querySelectorAll('.skill-item');
        for (let item of skillItems) {
            const name = item.querySelector('h5').textContent;
            if (name.toLowerCase().includes(skillName.toLowerCase())) {
                return item.querySelector('.skill-percentage').textContent;
            }
        }
        return null;
    }
};

// habilidades section

// Conversor de Monedas - Funcionalidad
document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM
  const amountInput = document.getElementById("amount")
  const fromCurrency = document.getElementById("from-currency")
  const toCurrency = document.getElementById("to-currency")
  const resultElement = document.getElementById("result")
  const exchangeRateElement = document.getElementById("exchange-rate")
  const lastUpdatedElement = document.getElementById("last-updated")
  const footerLastUpdatedElement = document.getElementById("footer-last-updated")
  const convertBtn = document.getElementById("convert-btn")
  const swapBtn = document.getElementById("swap-btn")
  const addToFavoritesBtn = document.getElementById("add-to-favorites")
  const favoritesContainer = document.getElementById("favorites-container")
  const favoritesList = document.getElementById("favorites-list")

  // Tasas de cambio (actualizadas al 3 de junio de 2025)
  // En una aplicación real, estas tasas se obtendrían de una API
  const exchangeRates = {
    USD: {
      EUR: 0.92,
      GBP: 0.79,
      COP: 4000,
      CNY: 7.25,
      USD: 1,
    },
    EUR: {
      USD: 1.09,
      GBP: 0.86,
      COP: 4350,
      CNY: 7.88,
      EUR: 1,
    },
    GBP: {
      USD: 1.27,
      EUR: 1.16,
      COP: 5070,
      CNY: 9.18,
      GBP: 1,
    },
    COP: {
      USD: 0.00025,
      EUR: 0.00023,
      GBP: 0.0002,
      CNY: 0.0018,
      COP: 1,
    },
    CNY: {
      USD: 0.138,
      EUR: 0.127,
      GBP: 0.109,
      COP: 552,
      CNY: 1,
    },
  }

  // Fecha de actualización simulada
  const lastUpdated = new Date()
  lastUpdated.setHours(lastUpdated.getHours() - 2) // Simulamos que se actualizó hace 2 horas

  // Mostrar fecha de actualización
  const formattedDate = lastUpdated.toLocaleString()
  lastUpdatedElement.textContent = `Actualizado: ${formattedDate}`
  footerLastUpdatedElement.textContent = formattedDate

  // Función para convertir monedas
  function convertCurrency() {
    const amount = Number.parseFloat(amountInput.value)
    const from = fromCurrency.value
    const to = toCurrency.value

    if (isNaN(amount)) {
      showError("Por favor ingresa una cantidad válida")
      return
    }

    // Simular carga
    resultElement.textContent = "Calculando"
    resultElement.classList.add("loading")

    // Simular retraso de red
    setTimeout(() => {
      const rate = exchangeRates[from][to]
      const result = amount * rate

      // Mostrar resultado con formato según la moneda
      resultElement.classList.remove("loading")
      resultElement.textContent = formatCurrency(result, to)
      resultElement.classList.add("result-fade")

      // Mostrar tasa de cambio
      exchangeRateElement.textContent = `1 ${from} = ${formatNumber(rate)} ${to}`

      // Quitar animación después
      setTimeout(() => {
        resultElement.classList.remove("result-fade")
      }, 500)
    }, 800)
  }

  // Formatear número según la moneda
  function formatCurrency(amount, currency) {
    switch (currency) {
      case "USD":
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
      case "EUR":
        return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount)
      case "GBP":
        return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(amount)
      case "COP":
        return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
          amount,
        )
      case "CNY":
        return new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY" }).format(amount)
      default:
        return amount.toFixed(2)
    }
  }

  // Formatear número para mostrar tasa de cambio
  function formatNumber(number) {
    if (number >= 100) {
      return number.toLocaleString(undefined, { maximumFractionDigits: 0 })
    } else if (number >= 10) {
      return number.toLocaleString(undefined, { maximumFractionDigits: 2 })
    } else if (number >= 1) {
      return number.toLocaleString(undefined, { maximumFractionDigits: 2 })
    } else {
      return number.toLocaleString(undefined, { maximumFractionDigits: 5 })
    }
  }

  // Mostrar mensaje de error
  function showError(message) {
    resultElement.textContent = message
    resultElement.style.color = "#dc3545"

    setTimeout(() => {
      resultElement.style.color = ""
    }, 3000)
  }

  // Intercambiar monedas
  function swapCurrencies() {
    const tempCurrency = fromCurrency.value
    fromCurrency.value = toCurrency.value
    toCurrency.value = tempCurrency

    // Actualizar conversión
    convertCurrency()
  }

  // Guardar conversión favorita
  function addToFavorites() {
    const amount = Number.parseFloat(amountInput.value)
    const from = fromCurrency.value
    const to = toCurrency.value

    if (isNaN(amount)) return

    // Obtener favoritos existentes
    const favorites = JSON.parse(localStorage.getItem("currencyFavorites")) || []

    // Agregar nuevo favorito
    const newFavorite = {
      id: Date.now(),
      amount,
      from,
      to,
      date: new Date().toISOString(),
    }

    favorites.push(newFavorite)

    // Guardar en localStorage
    localStorage.setItem("currencyFavorites", JSON.stringify(favorites))

    // Actualizar UI
    updateFavoritesList()

    // Mostrar contenedor de favoritos
    favoritesContainer.classList.remove("d-none")
  }

  // Actualizar lista de favoritos
  function updateFavoritesList() {
    const favorites = JSON.parse(localStorage.getItem("currencyFavorites")) || []

    if (favorites.length === 0) {
      favoritesContainer.classList.add("d-none")
      return
    }

    // Limpiar lista
    favoritesList.innerHTML = ""

    // Agregar cada favorito
    favorites.forEach((fav) => {
      const rate = exchangeRates[fav.from][fav.to]
      const result = fav.amount * rate

      const favItem = document.createElement("div")
      favItem.className =
        "list-group-item list-group-item-action favorite-item d-flex justify-content-between align-items-center"
      favItem.innerHTML = `
        <div>
          <div class="d-flex align-items-center">
            <span class="fw-bold">${fav.amount} ${fav.from}</span>
            <i class="bi bi-arrow-right mx-2"></i>
            <span class="fw-bold">${formatCurrency(result, fav.to)}</span>
          </div>
          <small class="text-muted">${new Date(fav.date).toLocaleDateString()}</small>
        </div>
        <button class="btn btn-sm btn-link text-danger delete-favorite" data-id="${fav.id}">
          <i class="bi bi-trash"></i>
        </button>
      `

      favoritesList.appendChild(favItem)
    })

    // Agregar eventos a botones de eliminar
    document.querySelectorAll(".delete-favorite").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        deleteFavorite(id)
      })
    })
  }

  // Eliminar favorito
  function deleteFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem("currencyFavorites")) || []
    favorites = favorites.filter((fav) => fav.id !== id)
    localStorage.setItem("currencyFavorites", JSON.stringify(favorites))
    updateFavoritesList()
  }

  // Event listeners
  convertBtn.addEventListener("click", convertCurrency)
  swapBtn.addEventListener("click", swapCurrencies)
  addToFavoritesBtn.addEventListener("click", addToFavorites)

  // Convertir automáticamente al cambiar opciones
  fromCurrency.addEventListener("change", convertCurrency)
  toCurrency.addEventListener("change", convertCurrency)

  // Convertir al presionar Enter en el input
  amountInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      convertCurrency()
    }
  })

  // Inicializar
  convertCurrency()
  updateFavoritesList()
})

// JavaScript mínimo para móviles - Sin observers ni reflows forzados
document.addEventListener("DOMContentLoaded", () => {
  // Solo ejecutar en móviles
  const isMobile = () => window.innerWidth <= 767.98

  // Fix inicial SOLO al cargar - Sin observers
  function applyInitialMobileFixes() {
    if (!isMobile()) return

    // Solo ajustes críticos sin forzar reflows
    const body = document.body
    const html = document.documentElement

    body.style.overflowX = "hidden"
    html.style.overflowX = "hidden"

    // Fix específico para iOS sin afectar z-index
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      body.style.webkitOverflowScrolling = "touch"

      // Prevenir zoom en inputs
      const inputs = document.querySelectorAll("input, textarea, select")
      inputs.forEach((input) => {
        input.style.fontSize = "16px"
      })
    }

    // Fix para Android
    if (/Android/.test(navigator.userAgent)) {
      body.style.overflowX = "hidden"
      html.style.overflowX = "hidden"
    }
  }

  // Ejecutar solo al cargar - SIN observers ni resize events
  applyInitialMobileFixes()

  // Solo manejar orientationchange (crítico para móviles)
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      if (isMobile()) {
        document.body.style.overflowX = "hidden"
        document.documentElement.style.overflowX = "hidden"
      }
    }, 100)
  })

  console.log("Minimal mobile fixes applied - No performance impact!")
})

// Eliminar completamente el debug y observers que causan titilado

// JavaScript para debug y forzar visibilidad del texto
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth <= 767.98) {
    console.log("🔍 Debugging hero content on mobile...")

    // Buscar todos los elementos de texto en el hero
    const heroSection =
      document.querySelector(".hero-section") ||
      document.querySelector(".carousel") ||
      document.querySelector('[class*="hero"]')

    if (heroSection) {
      console.log("✅ Hero section found:", heroSection)

      // Buscar títulos
      const titles = heroSection.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, .display-1, .display-2, .display-3, .display-4, .display-5, .display-6",
      )
      console.log("📝 Titles found:", titles.length, titles)

      // Buscar párrafos
      const paragraphs = heroSection.querySelectorAll("p, .lead")
      console.log("📄 Paragraphs found:", paragraphs.length, paragraphs)

      // Buscar botones
      const buttons = heroSection.querySelectorAll('.btn, button, a[class*="btn"]')
      console.log("🔘 Buttons found:", buttons.length, buttons)

      // FORZAR visibilidad de todos los elementos encontrados
      ;[...titles, ...paragraphs, ...buttons].forEach((element, index) => {
        element.style.cssText = `
          position: relative !important;
          z-index: 1000 !important;
          color: white !important;
          text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.9) !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          font-weight: bold !important;
          margin: 1rem 0 !important;
        `
        console.log(`✨ Forced visibility for element ${index + 1}:`, element)
      })

      // Si no se encuentran elementos, crear contenido de emergencia
      if (titles.length === 0 && paragraphs.length === 0) {
        console.log("⚠️ No text content found, creating emergency content...")

        const emergencyContent = document.createElement("div")
        emergencyContent.innerHTML = `
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
            text-align: center;
            background: rgba(0, 0, 0, 0.6);
            padding: 2rem;
            border-radius: 12px;
            color: white;
            backdrop-filter: blur(10px);
          ">
            <h1 style="
              font-size: 2.5rem;
              font-weight: bold;
              margin-bottom: 1rem;
              text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.9);
            ">ARTIFY PORTFOLIO</h1>
            <p style="
              font-size: 1.2rem;
              margin-bottom: 1.5rem;
              text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.9);
            ">Creative Digital Solutions</p>
            <button style="
              background: #007bff;
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 8px;
              font-weight: bold;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
            ">Ver Proyectos</button>
          </div>
        `

        heroSection.appendChild(emergencyContent)
        console.log("🚨 Emergency content added!")
      }
    } else {
      console.log("❌ Hero section not found")
    }
  }
})

document.head.appendChild(style);