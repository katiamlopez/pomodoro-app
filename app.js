const decreaseButton = document.querySelector("#decrease-intervals");
const increaseButton = document.querySelector("#increase-intervals");
const intervalCount = document.querySelector("#interval-count");
const sessionStep = document.querySelector("#session-step");
const timerDisplay = document.querySelector("#timer-display");
const startButton = document.querySelector("#start-button");
const pauseButton = document.querySelector("#pause-button");
const resetButton = document.querySelector("#reset-button");
const modeIcon = document.querySelector("#mode-icon");

// botones [-] [+] intervalos

let totalIntervals = 4;

increaseButton.addEventListener("click", function() {
    if (totalIntervals < 10) {
        totalIntervals++;
        updateDisplay();
    }
});

decreaseButton.addEventListener("click", function() {
    if (totalIntervals > 2) {
        totalIntervals--;
        updateDisplay();
    }
});

function updateDisplay() {
    intervalCount.textContent = totalIntervals;
    sessionStep.textContent = "Work " + currentInterval + " of " + totalIntervals;
};

//botones [▶] [⏸] [↻] controles

let workTime = 25*60;
let timeLeft = workTime;
let timeId = null;
let breakTime = 5 * 60;
let isWorkMode = true;
let currentInterval = 1;

startButton.addEventListener("click", function() {
  if (timeId === null) {
    timeId = setInterval(function() {
      timeLeft--;

    // break time ☕
    
      if (timeLeft <= 0 && isWorkMode === true) {
        isWorkMode = false;
        timeLeft = breakTime;
        sessionStep.textContent = "Break time";
        modeIcon.innerText = "☕";
      } else if (timeLeft <= 0 && isWorkMode === false) {
        currentInterval++;
        isWorkMode = true;
        timeLeft = workTime;
        sessionStep.textContent = "Work " + currentInterval + " of " + totalIntervals;
        modeIcon.innerText = "🍅";
      }

      updateTimerDisplay();
    }, 1000);
  }
});

pauseButton.addEventListener("click", function(){
    if (timeId !== null) {
        clearInterval(timeId);
        timeId = null;
    }
});

resetButton.addEventListener("click", function(){
    if (timeId !== null) {
        clearInterval(timeId);
        timeId = null;
    }

    timeLeft = workTime;
    updateTimerDisplay();
});

function updateTimerDisplay() {
    let minutes = Math.floor((timeLeft) / 60);
    let seconds = timeLeft % 60;
    timerDisplay.innerText = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}


