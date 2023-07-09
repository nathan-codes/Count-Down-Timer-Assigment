// Selecting elements
const buttons = document.querySelectorAll('.timer__button');
const customForm = document.getElementById('custom');
const minutesInput = document.querySelector('input[name="minutes"]');
const displayTimeLeft = document.querySelector('.display__time-left');
const displayEndTime = document.querySelector('.display__end-time');

let countdown; // Holds the setInterval instance

// Function to start the countdown
function startTimer(seconds) {
  // Clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft.textContent = formatTime(seconds);
  displayEndTime.textContent = formatEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    // Check if the timer should stop
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    // Update the display
    displayTimeLeft.textContent = formatTime(secondsLeft);
  }, 1000);
}

// Function to format time in MM:SS format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const displaySeconds = remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds;
  return `${displayMinutes}:${displaySeconds}`;
}

// Function to format end time in 12-hour format
function formatEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  const adjustedHours = hours > 12 ? hours - 12 : hours;
  const displayHours = adjustedHours === 0 ? 12 : adjustedHours;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const period = hours >= 12 ? 'PM' : 'AM';
  return `Be back at ${displayHours}:${displayMinutes} ${period}`;
}

// Event listeners for buttons
buttons.forEach(button => button.addEventListener('click', function() {
  const seconds = parseInt(this.dataset.time);
  startTimer(seconds);
}));

// Event listener for custom form
customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const minutes = parseInt(minutesInput.value);
  const seconds = minutes * 60;
  startTimer(seconds);
  this.reset();
});
