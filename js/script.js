/**
 * Mendez Roofing - Main JavaScript
 * Enhanced with premium UI/UX features and modern interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Remove preloader when page is loaded
    removePreloader();
    
    // Initialize all components
    initMobileMenu();
    initStickyHeader();
    initBackToTop();
    initSmoothScroll();
    initContactForm();
    initTestimonialSlider();
    initScrollAnimations();
    initParallaxEffect();
    initCounters();
    initServicesHover();
    initProjectsFilter();
    
    // Add scroll indicator to hero section
    addHeroScrollIndicator();
    
    // Add animation classes to elements
    addAnimationClasses();
});

/**
 * Remove preloader when page is loaded
 */
function removePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Add fade-out class
        preloader.classList.add('fade-out');
        
        // Remove preloader after animation completes
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}

/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Toggle aria-expanded attribute for accessibility
        const isExpanded = navLinks.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Toggle menu icon animation
        this.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', false);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', false);
        }
    });
}

/**
 * Sticky Header on Scroll
 */
function initStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Initial check for page refresh
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    }
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) return;
    
    const scrollThreshold = 600;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip if it's just "#" (empty anchor)
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get header height for offset
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Contact Form Handling with enhanced validation and UX
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Add floating label effect
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        // Skip submit button
        if (input.type === 'submit') return;
        
        // Create and add label if it doesn't exist
        const placeholder = input.getAttribute('placeholder');
        if (placeholder) {
            input.setAttribute('data-placeholder', placeholder);
            
            // Check if input already has value
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            }
            
            // Add event listeners for focus and blur
            input.addEventListener('focus', function() {
                this.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.classList.remove('focused');
                if (this.value.trim() !== '') {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
            
            // Add event listener for input
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
        }
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Enhanced validation
        let isValid = true;
        const requiredFields = ['name', 'email', 'message'];
        
        requiredFields.forEach(field => {
            const input = contactForm.querySelector(`[name="${field}"]`);
            if (!formValues[field] || formValues[field].trim() === '') {
                isValid = false;
                input.classList.add('error');
                
                // Add error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
                
                // Remove existing error message
                const existingError = input.parentNode.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                input.parentNode.appendChild(errorMessage);
            } else {
                input.classList.remove('error');
                const existingError = input.parentNode.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
            }
        });
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailInput = contactForm.querySelector('[name="email"]');
        if (formValues.email && !emailRegex.test(formValues.email)) {
            isValid = false;
            emailInput.classList.add('error');
            
            // Add error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Please enter a valid email address';
            
            // Remove existing error message
            const existingError = emailInput.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            emailInput.parentNode.appendChild(errorMessage);
        }
        
        if (!isValid) {
            showFormMessage('Please fill out all required fields correctly.', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate form submission (would be replaced with actual API call)
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            
            showFormMessage('Thank you! Your message has been sent. We\'ll get back to you soon.', 'success');
            contactForm.reset();
            
            // Reset input states
            formInputs.forEach(input => {
                if (input.type !== 'submit') {
                    input.classList.remove('has-value');
                }
            });
            
            // In a real implementation, you would send the form data to a server
            console.log('Form submitted:', formValues);
        }, 1500);
    });
    
    // Clear error state on input
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const errorMessage = this.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
            const messageElement = contactForm.querySelector('.form-message');
            if (messageElement) {
                messageElement.remove();
            }
        });
    });
}

/**
 * Show form submission message with enhanced styling
 */
function showFormMessage(message, type) {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Remove any existing message
    const existingMessage = contactForm.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    
    // Add icon based on message type
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    messageElement.appendChild(icon);
    
    // Add message text
    const messageText = document.createElement('span');
    messageText.textContent = message;
    messageElement.appendChild(messageText);
    
    // Add to form
    contactForm.appendChild(messageElement);
    
    // Animate message
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 10);
    
    // Auto-remove success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageElement.classList.remove('show');
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }, 5000);
    }
}

/**
 * Testimonial Slider with enhanced UX
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const testimonials = slider.querySelectorAll('.testimonial');
    if (testimonials.length <= 1) return;
    
    let currentIndex = 0;
    const autoplayInterval = 5000; // 5 seconds
    let autoplayTimer;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Function to move to a specific slide
    function goToSlide(index) {
        // Ensure index is within bounds
        if (index < 0) index = testimonials.length - 1;
        if (index >= testimonials.length) index = 0;
        
        currentIndex = index;
        
        // Calculate scroll position
        const slideWidth = testimonials[0].offsetWidth;
        slider.scrollTo({
            left: slideWidth * currentIndex,
            behavior: 'smooth'
        });
        
        // Update active dot
        updateDots();
    }
    
    // Start autoplay
    function startAutoplay() {
        autoplayTimer = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, autoplayInterval);
    }
    
    // Stop autoplay on user interaction
    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }
    
    // Event listeners for manual navigation
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    
    // Touch events for mobile swipe
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    }, {passive: true});
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    }, {passive: true});
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, go to next slide
            goToSlide(currentIndex + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, go to previous slide
            goToSlide(currentIndex - 1);
        }
    }
    
    // Handle scroll end to update current index
    slider.addEventListener('scroll', function() {
        const slideWidth = testimonials[0].offsetWidth;
        currentIndex = Math.round(slider.scrollLeft / slideWidth);
    });
    
    // Create navigation dots
    const sliderContainer = slider.parentElement;
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    
    testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot';
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoplay();
            setTimeout(startAutoplay, 2000);
        });
        
        dotsContainer.appendChild(dot);
    });
    
    sliderContainer.appendChild(dotsContainer);
    
    // Add prev/next navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'slider-nav slider-prev';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.setAttribute('aria-label', 'Previous testimonial');
    
    const nextButton = document.createElement('button');
    nextButton.className = 'slider-nav slider-next';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.setAttribute('aria-label', 'Next testimonial');
    
    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        stopAutoplay();
        setTimeout(startAutoplay, 2000);
    });
    
    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        stopAutoplay();
        setTimeout(startAutoplay, 2000);
    });
    
    sliderContainer.appendChild(prevButton);
    sliderContainer.appendChild(nextButton);
    
    // Update active dot
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Initial update
    updateDots();
    
    // Initialize autoplay
    startAutoplay();
}

/**
 * Add scroll indicator to hero section
 */
function addHeroScrollIndicator() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const scrollIndicator = document.createElement('a');
    scrollIndicator.className = 'hero-scroll';
    scrollIndicator.href = '#services';
    scrollIndicator.innerHTML = `
        <span>Scroll Down</span>
        <div class="scroll-icon"></div>
    `;
    
    hero.appendChild(scrollIndicator);
}

/**
 * Add animation classes to elements
 */
function addAnimationClasses() {
    // Hero section animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const heroTitle = heroContent.querySelector('h1');
        const heroParagraph = heroContent.querySelector('p');
        const heroButtons = heroContent.querySelector('.hero-buttons');
        
        if (heroTitle) heroTitle.classList.add('animate-fade-in');
        if (heroParagraph) {
            heroParagraph.classList.add('animate-slide-up');
            heroParagraph.classList.add('animate-delay-300');
        }
        if (heroButtons) {
            heroButtons.classList.add('animate-slide-up');
            heroButtons.classList.add('animate-delay-500');
        }
    }
    
    // Section headers animation
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('animate-on-scroll');
    });
    
    // Service cards animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${0.1 * index}s`;
    });
    
    // About section animation
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');
    
    if (aboutImage) aboutImage.classList.add('animate-on-scroll', 'slide-right');
    if (aboutText) aboutText.classList.add('animate-on-scroll', 'slide-left');
    
    // Project cards animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${0.1 * index}s`;
    });
    
    // Testimonials animation
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach(testimonial => {
        testimonial.classList.add('animate-on-scroll', 'fade-in');
    });
    
    // Contact section animation
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    
    if (contactInfo) contactInfo.classList.add('animate-on-scroll', 'slide-right');
    if (contactForm) contactForm.classList.add('animate-on-scroll', 'slide-left');
}

/**
 * Scroll animations for elements
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add specific animation class based on element's classes
                if (entry.target.classList.contains('slide-left')) {
                    entry.target.classList.add('animate-slide-left');
                } else if (entry.target.classList.contains('slide-right')) {
                    entry.target.classList.add('animate-slide-right');
                } else if (entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('animate-fade-in');
                } else {
                    entry.target.classList.add('animate-slide-up');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Parallax effect for background elements
 */
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.1;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

/**
 * Animated counters for statistics
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = Math.ceil(target / (duration / 16)); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                        return;
                    }
                    
                    counter.textContent = current;
                    requestAnimationFrame(updateCounter);
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Enhanced hover effects for service cards
 */
function initServicesHover() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            serviceCards.forEach(c => c.classList.add('dimmed'));
            this.classList.remove('dimmed');
            this.classList.add('active');
        });
        
        card.addEventListener('mouseleave', function() {
            serviceCards.forEach(c => {
                c.classList.remove('dimmed');
                c.classList.remove('active');
            });
        });
    });
}

/**
 * Projects filter functionality
 */
function initProjectsFilter() {
    const filterButtons = document.querySelectorAll('.projects-filter button');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterButtons.length || !projectCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.remove('hidden');
                    }, 10);
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.remove('hidden');
                        }, 10);
                    } else {
                        card.classList.add('hidden');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

/**
 * Active navigation highlighting based on scroll position
 */
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Find the current section and highlight its nav link
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const link = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (link) {
                link.classList.add('active');
            }
        }
    });
});
