// Store reminder data in localStorage
function storeReminderData(data) {
    localStorage.setItem('reminderData', JSON.stringify(data));
}

// Get reminder data from localStorage
function getReminderData() {
    const data = localStorage.getItem('reminderData');
    return data ? JSON.parse(data) : null;
}

// Main reminder functionality
document.addEventListener('DOMContentLoaded', () => {
    const intervalInput = document.getElementById('intervalInput');
    const setReminderBtn = document.getElementById('setReminderBtn');
    const timerDisplay = document.getElementById('timerDisplay');
    
    if (setReminderBtn) {
        setReminderBtn.addEventListener('click', () => {
            const minutes = parseInt(intervalInput.value);
            
            if (isNaN(minutes) || minutes < 1 || minutes > 120) {
                alert('Please enter a valid number of minutes (1-120)');
                return;
            }

            // Calculate end time
            const duration = minutes * 60 * 1000; // Convert minutes to milliseconds
            const endTime = new Date().getTime() + duration;

            // Store reminder data
            storeReminderData({
                startTime: new Date().getTime(),
                duration: duration,
                endTime: endTime
            });

            // Start global timer
            startGlobalTimer(duration);
            timerDisplay.classList.add('show');
        });
    }
}); 