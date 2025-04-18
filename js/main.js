// Main JavaScript for HeartSmile Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileMenuToggle.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        mobileMenuToggle.textContent = '☰';
                    }
                }
            }
        });
    });
    
    // Meditation Timer Functionality
    const timerDisplay = document.querySelector('.timer-display');
    const startBtn = document.querySelector('.timer-start');
    const pauseBtn = document.querySelector('.timer-pause');
    const resetBtn = document.querySelector('.timer-reset');
    const settingCards = document.querySelectorAll('.setting-card');
    
    if (timerDisplay && startBtn && pauseBtn && resetBtn) {
        let countdown;
        let timeLeft = 10 * 60; // Default 10 minutes
        let isRunning = false;
        
        // Update timer display
        function updateDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // Start timer
        function startTimer() {
            if (!isRunning) {
                isRunning = true;
                countdown = setInterval(() => {
                    if (timeLeft > 0) {
                        timeLeft--;
                        updateDisplay();
                    } else {
                        clearInterval(countdown);
                        isRunning = false;
                        playEndSound();
                    }
                }, 1000);
            }
        }
        
        // Pause timer
        function pauseTimer() {
            clearInterval(countdown);
            isRunning = false;
        }
        
        // Reset timer
        function resetTimer() {
            clearInterval(countdown);
            isRunning = false;
            timeLeft = 10 * 60; // Reset to default or selected time
            updateDisplay();
        }
        
        // Play sound when timer ends
        function playEndSound() {
            const audio = new Audio('sounds/bell.mp3');
            audio.play();
        }
        
        // Set timer duration
        function setDuration(minutes) {
            timeLeft = minutes * 60;
            updateDisplay();
        }
        
        // Event listeners
        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);
        
        // Timer setting cards
        if (settingCards) {
            settingCards.forEach(card => {
                card.addEventListener('click', function() {
                    const duration = parseInt(this.dataset.duration);
                    if (!isNaN(duration)) {
                        setDuration(duration);
                        
                        // Update active class
                        settingCards.forEach(c => c.classList.remove('active'));
                        this.classList.add('active');
                    }
                });
            });
        }
        
        // Initialize display
        updateDisplay();
    }
    
    // Form validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
    
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
                    // If current path is in English or root, switch to Korean
                    if (currentPath.includes('/en/') || !currentPath.includes('/ko/')) {
                        newPath = currentPath.replace('/en/', '/ko/').replace(/^\/(?!ko\/)/, '/ko/');
                    } else {
                        newPath = currentPath;
                    }
                } else {
                    // If current path is in Korean, switch to English
                    if (currentPath.includes('/ko/')) {
                        newPath = currentPath.replace('/ko/', '/en/');
                    } else if (!currentPath.includes('/en/')) {
                        newPath = '/en' + currentPath;
                    } else {
                        newPath = currentPath;
                    }
                }
                
                window.location.href = newPath;
            }
        });
    });
    
    // Check for stored language preference
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang) {
        const currentPath = window.location.pathname;
        const isKorean = currentPath.includes('/ko/');
        const isEnglish = currentPath.includes('/en/');
        
        // Redirect if needed
        if (storedLang === 'ko' && !isKorean) {
            const newPath = currentPath.replace('/en/', '/ko/').replace(/^\/(?!ko\/)/, '/ko/');
            window.location.href = newPath;
        } else if (storedLang === 'en' && !isEnglish && isKorean) {
            const newPath = currentPath.replace('/ko/', '/en/');
            window.location.href = newPath;
        }
    }
});
