// Meditation Timer Functionality
document.addEventListener('DOMContentLoaded', function() {
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
                startBtn.disabled = true;
                pauseBtn.disabled = false;
                countdown = setInterval(() => {
                    if (timeLeft > 0) {
                        timeLeft--;
                        updateDisplay();
                    } else {
                        clearInterval(countdown);
                        isRunning = false;
                        startBtn.disabled = false;
                        pauseBtn.disabled = true;
                        playEndSound();
                    }
                }, 1000);
            }
        }
        
        // Pause timer
        function pauseTimer() {
            clearInterval(countdown);
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }
        
        // Reset timer
        function resetTimer() {
            clearInterval(countdown);
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            
            // Get active duration
            const activeSetting = document.querySelector('.setting-card.active');
            if (activeSetting) {
                const duration = parseInt(activeSetting.dataset.duration);
                if (!isNaN(duration)) {
                    timeLeft = duration * 60;
                } else {
                    timeLeft = 10 * 60; // Default to 10 minutes
                }
            } else {
                timeLeft = 10 * 60; // Default to 10 minutes
            }
            
            updateDisplay();
        }
        
        // Play sound when timer ends
        function playEndSound() {
            // Create audio element for bell sound
            const audio = new Audio('../../sounds/bell.mp3');
            audio.play().catch(e => {
                console.log('Audio playback failed:', e);
            });
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
                        // Only allow changing duration when timer is not running
                        if (!isRunning) {
                            timeLeft = duration * 60;
                            updateDisplay();
                            
                            // Update active class
                            settingCards.forEach(c => c.classList.remove('active'));
                            this.classList.add('active');
                        }
                    }
                });
            });
        }
        
        // Initialize
        pauseBtn.disabled = true;
        updateDisplay();
    }
});
