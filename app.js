// Abhishek's Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticles();
    initNavigation();
    initSkillBars();
    initChat();
    initContactForm();
    initScrollEffects();
    initMobileMenu();
});

// Particle Background
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size and position
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay and duration
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, 8000 + Math.random() * 4000);
}

// Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar) return;
    
    // Scroll effect on navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const navToggle = document.querySelector('.nav-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Add smooth scrolling for hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navbarHeight = navbar.offsetHeight || 80;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    navLinks.forEach(navLink => {
                        navLink.classList.remove('active');
                        if (navLink.getAttribute('href') === href) {
                            navLink.classList.add('active');
                        }
                    });
                }
            }
        });
    });
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Mobile Menu
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) {
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            }
        });
    };
    
    // Observe skills section
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
}

// Live Chat Functionality - Streamlit Integration
function initChat() {
    const chatButton = document.getElementById('chatButton');
    const chatModal = document.getElementById('chatModal');
    const closeChatBtn = document.getElementById('closeChatBtn');
    
    console.log('Initializing chat...', { chatButton, chatModal, closeChatBtn });
    
    if (!chatButton || !chatModal || !closeChatBtn) {
        console.error('Chat elements not found', {
            chatButton: !!chatButton,
            chatModal: !!chatModal, 
            closeChatBtn: !!closeChatBtn
        });
        return;
    }
    
    // Open chat modal
    chatButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Chat button clicked, opening modal...');
        chatModal.classList.remove('hidden');
        chatModal.style.display = 'flex';
        
        // Ensure modal is visible
        setTimeout(() => {
            chatModal.style.opacity = '1';
            chatModal.style.transform = 'translateY(0)';
        }, 10);
        
        // Load the Streamlit iframe when modal opens
        const iframe = document.getElementById('chatIframe');
        if (iframe) {
            console.log('Loading Streamlit iframe...');
            iframe.src = 'https://chatbot-uc6aeunvq6zgdeuvqbijys.streamlit.app/?embed=true';
        }
    });
    
    // Close chat modal
    closeChatBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Closing chat modal...');
        closeModal();
    });
    
    // Close modal when clicking on backdrop
    chatModal.addEventListener('click', function(e) {
        if (e.target === chatModal) {
            console.log('Backdrop clicked, closing modal...');
            closeModal();
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !chatModal.classList.contains('hidden')) {
            console.log('ESC pressed, closing modal...');
            closeModal();
        }
    });
    
    function closeModal() {
        chatModal.classList.add('hidden');
        chatModal.style.opacity = '0';
        chatModal.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            chatModal.style.display = 'none';
        }, 300);
    }
    
    // Handle iframe loading states
    const iframe = document.getElementById('chatIframe');
    if (iframe) {
        iframe.addEventListener('load', function() {
            console.log('Streamlit chatbot loaded successfully');
        });
        
        iframe.addEventListener('error', function() {
            console.error('Failed to load Streamlit chatbot');
            showNotification('Failed to load chatbot. Please try again later.', 'error');
        });
    }
    
    // Make sure chat button is visible
    setTimeout(() => {
        if (chatButton) {
            chatButton.style.opacity = '1';
            chatButton.style.visibility = 'visible';
        }
    }, 1000);
}

// Contact Form
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Contact form submitted');
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            console.log('Form data:', { name, email, subject, message });
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission delay
            setTimeout(() => {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'success') {
    console.log('Showing notification:', message, type);
    
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#21805f' : '#c0152f'};
        color: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
        font-family: inherit;
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            notification.remove();
        });
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Scroll Effects
function initScrollEffects() {
    // Fade in animation for cards and sections
    const animateElements = document.querySelectorAll('.project-card, .certification-card, .timeline-item, .skill-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
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
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimizations
const optimizedScrollHandler = throttle(() => {
    // Handle scroll events if needed
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Handle responsive adjustments
    const chatModal = document.getElementById('chatModal');
    if (chatModal && window.innerWidth <= 768 && !chatModal.classList.contains('hidden')) {
        // Adjust chat modal for mobile
        chatModal.style.width = 'calc(100vw - 32px)';
        chatModal.style.left = '16px';
        chatModal.style.right = '16px';
    }
}, 250));

// Add slideInRight animation styles
const slideInRightStyle = document.createElement('style');
slideInRightStyle.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(slideInRightStyle);

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Handle iframe communication (optional)
window.addEventListener('message', function(e) {
    // Handle messages from Streamlit iframe if needed
    if (e.origin === 'https://chatbot-uc6aeunvq6zgdeuvqbijys.streamlit.app') {
        console.log('Message from Streamlit:', e.data);
    }
});

// Debug logging
console.log('Portfolio JavaScript initialized successfully');