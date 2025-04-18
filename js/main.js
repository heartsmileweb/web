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
    
    // Language switcher functionality
    const langSwitchers = document.querySelectorAll('.lang-switch a, .mobile-menu-lang a');
    
    langSwitchers.forEach(switcher => {
        switcher.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            if (lang) {
                // Store language preference
                localStorage.setItem('preferredLanguage', lang);
                
                // Redirect to appropriate page
                const currentPath = window.location.pathname;
                let newPath;
                
                if (lang === 'ko') {
                    // If current path is in English or doesn't have language suffix
                    if (!currentPath.includes('.ko.html')) {
                        if (currentPath.endsWith('.html')) {
                            newPath = currentPath.replace('.html', '.ko.html');
                        } else if (currentPath.endsWith('/')) {
                            newPath = currentPath + 'index.ko.html';
                        } else {
                            newPath = currentPath + '/index.ko.html';
                        }
                    } else {
                        newPath = currentPath;
                    }
                } else {
                    // If current path is in Korean
                    if (currentPath.includes('.ko.html')) {
                        newPath = currentPath.replace('.ko.html', '.html');
                    } else {
                        newPath = currentPath;
                    }
                }
                
                window.location.href = newPath;
            }
        });
    });
    
    // Check for stored language preference on page load
    const storedLang = localStorage.getItem('preferredLanguage');
    const currentPath = window.location.pathname;
    
    if (storedLang) {
        const isKorean = currentPath.includes('.ko.html');
        
        // Redirect if needed
        if (storedLang === 'ko' && !isKorean && !currentPath.endsWith('index.html')) {
            const newPath = currentPath.replace('.html', '.ko.html');
            window.location.href = newPath;
        } else if (storedLang === 'en' && isKorean) {
            const newPath = currentPath.replace('.ko.html', '.html');
            window.location.href = newPath;
        }
    }
});
