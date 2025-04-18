// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !mobileMenuToggle.contains(event.target)) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Only process if it's not just "#" (which would scroll to top)
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-main a');
    const mobileNavLinks = document.querySelectorAll('.mobile-menu a');
    
    function setActiveNavLink(links) {
        links.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath && currentLocation.includes(linkPath) && linkPath !== '#' && linkPath !== '/') {
                link.classList.add('active');
            }
        });
    }
    
    setActiveNavLink(navLinks);
    setActiveNavLink(mobileNavLinks);
    
    // Language switcher functionality - FIXED to prevent infinite redirects
    const langSwitchers = document.querySelectorAll('.lang-switch a, .mobile-menu-lang a');
    
    langSwitchers.forEach(switcher => {
        switcher.addEventListener('click', function(e) {
            // Prevent default only if already on the target language page
            const lang = this.getAttribute('data-lang');
            const isActive = this.classList.contains('active');
            
            // If already on the correct language page, don't do anything
            if (isActive) {
                e.preventDefault();
                return;
            }
            
            // Otherwise, let the link work normally
            // The href attribute should point directly to the correct language version
        });
    });
});
