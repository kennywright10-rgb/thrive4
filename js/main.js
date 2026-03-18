// ==========================================
// THRIVE 4 PEAK PERFORMANCE - MAIN JS
// ==========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if header already exists (loaded synchronously)
    // If not, wait for it to be loaded via fetch
    const checkAndInit = () => {
        const header = document.querySelector('.header');
        if (header) {
            // Mobile Menu Toggle
            initMobileMenu();
            
            // Smooth Scrolling for Anchor Links
            initSmoothScroll();
            
            // Sticky Header on Scroll
            initStickyHeader();
        } else {
            // Header not loaded yet, will be initialized after fetch
            console.log('Header not found, waiting for dynamic load');
        }
    };
    
    checkAndInit();
    
    // Form Validation
    initFormValidation();
    
    // Lazy Loading Images
    initLazyLoading();
    
});

// ==========================================
// MOBILE MENU
// ==========================================

function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (!mobileToggle || !mainNav) return;
    
    mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        mainNav.classList.toggle('mobile-active');
        body.classList.toggle('menu-open');
    });
    
    // Handle dropdown clicks in mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.header')) {
            mobileToggle.classList.remove('active');
            mainNav.classList.remove('mobile-active');
            body.classList.remove('menu-open');
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileToggle.classList.remove('active');
            mainNav.classList.remove('mobile-active');
            body.classList.remove('menu-open');
        }
    });
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't smooth scroll if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// STICKY HEADER
// ==========================================

function initStickyHeader() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
}

// ==========================================
// FORM VALIDATION
// ==========================================

function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            // Remove previous error messages
            form.querySelectorAll('.error-message').forEach(msg => msg.remove());
            form.querySelectorAll('.field-error').forEach(field => field.classList.remove('field-error'));
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('field-error');
                    
                    const errorMsg = document.createElement('span');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'This field is required';
                    errorMsg.style.color = '#FF6B6B';
                    errorMsg.style.fontSize = '0.875rem';
                    errorMsg.style.marginTop = '0.25rem';
                    errorMsg.style.display = 'block';
                    
                    field.parentNode.appendChild(errorMsg);
                }
            });
            
            // Email validation
            const emailFields = form.querySelectorAll('[type="email"]');
            emailFields.forEach(field => {
                if (field.value && !isValidEmail(field.value)) {
                    isValid = false;
                    field.classList.add('field-error');
                    
                    const errorMsg = document.createElement('span');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Please enter a valid email address';
                    errorMsg.style.color = '#FF6B6B';
                    errorMsg.style.fontSize = '0.875rem';
                    errorMsg.style.marginTop = '0.25rem';
                    errorMsg.style.display = 'block';
                    
                    field.parentNode.appendChild(errorMsg);
                }
            });
            
            // Phone validation
            const phoneFields = form.querySelectorAll('[type="tel"]');
            phoneFields.forEach(field => {
                if (field.value && !isValidPhone(field.value)) {
                    isValid = false;
                    field.classList.add('field-error');
                    
                    const errorMsg = document.createElement('span');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Please enter a valid phone number';
                    errorMsg.style.color = '#FF6B6B';
                    errorMsg.style.fontSize = '0.875rem';
                    errorMsg.style.marginTop = '0.25rem';
                    errorMsg.style.display = 'block';
                    
                    field.parentNode.appendChild(errorMsg);
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Scroll to first error
                const firstError = form.querySelector('.field-error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });
        
        // Remove error styling on input
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('field-error');
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
        });
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone validation helper
function isValidPhone(phone) {
    const re = /^[\d\s\-\+\(\)]{10,}$/;
    return re.test(phone);
}

// ==========================================
// LAZY LOADING IMAGES
// ==========================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }
}

// ==========================================
// ANALYTICS TRACKING (Optional)
// ==========================================

// Track CTA clicks
function trackCTAClick(ctaName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
            'event_category': 'engagement',
            'event_label': ctaName
        });
    }
    
    console.log('CTA Clicked:', ctaName);
}

// Track phone clicks
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        trackCTAClick('Phone Call');
    });
});

// Track booking button clicks
document.querySelectorAll('a[href*="book"]').forEach(link => {
    link.addEventListener('click', function() {
        trackCTAClick('Book Appointment');
    });
});

// ==========================================
// ACCESSIBILITY IMPROVEMENTS
// ==========================================

// Add skip to content link functionality
const skipLink = document.querySelector('.skip-to-content');
if (skipLink) {
    skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.setAttribute('tabindex', '-1');
            target.focus();
        }
    });
}

// Trap focus in mobile menu when open
document.addEventListener('keydown', function(e) {
    if (!document.body.classList.contains('menu-open')) return;
    
    if (e.key === 'Escape') {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (mobileToggle && mainNav) {
            mobileToggle.classList.remove('active');
            mainNav.classList.remove('mobile-active');
            document.body.classList.remove('menu-open');
            mobileToggle.focus();
        }
    }
});

// ==========================================
// PERFORMANCE MONITORING (Optional)
// ==========================================

// Log page load time
window.addEventListener('load', function() {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page Load Time:', pageLoadTime + 'ms');
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%c🚀 Thrive 4 Peak Performance', 'font-size: 20px; font-weight: bold; color: #0A5F5F;');
console.log('%cWebsite loaded successfully!', 'font-size: 14px; color: #4A90A4;');
