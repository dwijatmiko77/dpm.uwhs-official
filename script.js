// ==========================================
// NAVIGATION FIXED LOGIC
// ==========================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle Mobile Menu
navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('active');
    
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu open
    document.body.style.overflow = isOpen ? '' : 'hidden';
});

// Close Menu Function
const closeMenu = () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
};

// Close menu when clicking overlay
navOverlay.addEventListener('click', closeMenu);

// Close menu and smooth scroll when clicking links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
        
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if(target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// SCROLL ANIMATIONS (REPEATABLE)
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-on-scroll, .slide-left, .slide-right, .slide-up, .scale-in').forEach(el => {
    observer.observe(el);
});

// ==========================================
// FORM HANDLING
// ==========================================

document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show success message
    alert('Terima kasih! Pesan Anda telah terkirim.\n\nNama: ' + data.nama + '\nEmail: ' + data.email);
    
    // Reset form
    e.target.reset();
});
