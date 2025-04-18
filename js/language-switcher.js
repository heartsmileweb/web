// Language switcher functionality - FIXED to prevent infinite redirects
document.addEventListener('DOMContentLoaded', function() {
    // Language switcher functionality
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
