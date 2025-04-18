// Copy the timer.js file to the proper directory
document.addEventListener('DOMContentLoaded', function() {
    // Timer elements
    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const bellSound = document.getElementById('bell-sound');
    const durationSettings = document.querySelectorAll('.setting-card');
    
    // Timer variables
    let timerDuration = 10 * 60; // Default: 10 minutes in seconds
    let timeRemaining = timerDuration;
    let timerInterval;
    let isRunning = false;
    
    // Format time as MM:SS
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Update timer display
    function updateDisplay() {
        timerDisplay.textContent = formatTime(timeRemaining);
    }
    
    // Start timer
    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            timerInterval = setInterval(function() {
                timeRemaining--;
                updateDisplay();
                
                if (timeRemaining <= 0) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    playBellSound();
                }
            }, 1000);
            
            startBtn.disabled = true;
            pauseBtn.disabled = false;
        }
    }
    
    // Pause timer
    function pauseTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    }
    
    // Reset timer
    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        timeRemaining = timerDuration;
        updateDisplay();
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
    
    // Play bell sound
    function playBellSound() {
        if (bellSound) {
            bellSound.currentTime = 0;
            bellSound.play();
        }
    }
    
    // Set timer duration
    function setDuration(minutes) {
        timerDuration = minutes * 60;
        timeRemaining = timerDuration;
        updateDisplay();
        
        // Update active setting
        durationSettings.forEach(setting => {
            setting.classList.remove('active');
            if (parseInt(setting.getAttribute('data-minutes')) === minutes) {
                setting.classList.add('active');
            }
        });
    }
    
    // Event listeners
    if (startBtn) startBtn.addEventListener('click', startTimer);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
    if (resetBtn) resetBtn.addEventListener('click', resetTimer);
    
    // Duration setting event listeners
    durationSettings.forEach(setting => {
        setting.addEventListener('click', function() {
            const minutes = parseInt(this.getAttribute('data-minutes'));
            setDuration(minutes);
        });
    });
    
    // Initialize timer display
    updateDisplay();
    
    // Set default duration active
    const defaultDuration = document.querySelector('[data-minutes="10"]');
    if (defaultDuration) defaultDuration.classList.add('active');
    
    // Disable pause button initially
    if (pauseBtn) pauseBtn.disabled = true;
});
