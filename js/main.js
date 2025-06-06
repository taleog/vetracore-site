// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const body = document.body;

mobileMenuBtn.addEventListener('click', function() {
  mobileMenu.classList.toggle('active');
  body.classList.toggle('mobile-menu-open');
  
  const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
  mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
  mobileMenuBtn.innerHTML = isExpanded ? '☰' : '✕';
});

// Close mobile menu when clicking on a nav link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link a');

mobileNavLinks.forEach(link => {
  link.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
    body.classList.remove('mobile-menu-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.innerHTML = '☰';
  });
});

// Add reveal animations for elements as they enter the viewport
document.addEventListener('DOMContentLoaded', function() {
  // Create the Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If the element is in the viewport
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // Unobserve after animation begins
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // viewport
    threshold: 0.15, // 15% of the element visible
    rootMargin: '-50px'
  });

  // Elements to observe
  const animateElements = document.querySelectorAll('.stat-box, .service-card, .benefit-item, .testimonial-card, .process-step, .contact-card');
  animateElements.forEach(el => {
    observer.observe(el);
    // Add the base class
    el.classList.add('animate-element');
  });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Active section highlighting based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links .nav-link');
const mobileNavLinkElements = document.querySelectorAll('.mobile-nav-link a');

function highlightActiveSection() {
  const scrollPosition = window.scrollY + navbar.offsetHeight + 50;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      mobileNavLinkElements.forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to corresponding navigation links
      document.querySelector(`.nav-links .nav-link[href="#${sectionId}"]`)?.classList.add('active');
      document.querySelector(`.mobile-nav-link a[href="#${sectionId}"]`)?.classList.add('active');
    }
  });
  
  // Special case for top of page/hero section
  if (scrollPosition < sections[0].offsetTop) {
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    mobileNavLinkElements.forEach(link => {
      link.classList.remove('active');
    });
  }
}

window.addEventListener('scroll', highlightActiveSection);
window.addEventListener('load', highlightActiveSection);

// Smooth scroll for all links pointing to the contact form
document.addEventListener('DOMContentLoaded', function() {
  const contactLinks = document.querySelectorAll('a[href="#contact"]');
  
  contactLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      
      if (contactSection) {
        // Account for fixed header height
        const headerHeight = document.getElementById('navbar').offsetHeight;
        const contactPosition = contactSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: contactPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
