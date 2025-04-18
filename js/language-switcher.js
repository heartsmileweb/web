// Language Switcher Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Language switcher
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
                        newPath = currentPath.replace('.html', '.ko.html');
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
        if (storedLang === 'ko' && !isKorean) {
            const newPath = currentPath.replace('.html', '.ko.html');
            window.location.href = newPath;
        } else if (storedLang === 'en' && isKorean) {
            const newPath = currentPath.replace('.ko.html', '.html');
            window.location.href = newPath;
        }
    }
});
