const decreaseButton = document.querySelector("#decrease-intervals");
const increaseButton = document.querySelector("#increase-intervals");
const intervalCount = document.querySelector("#interval-count");
const sessionStep = document.querySelector("#session-step");
const timerDisplay = document.querySelector("#timer-display");
const startButton = document.querySelector("#start-button");
const pauseButton = document.querySelector("#pause-button");
const resetButton = document.querySelector("#reset-button");
const modeIcon = document.querySelector("#mode-icon");
const timerText = document.querySelector("#timer-text");

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

let workTime = 1*60;
let timeLeft = workTime;
let timeId = null;
let breakTime = 1* 60;
let isWorkMode = true;
let currentInterval = 1;

function updateTimerDisplay() {
    let minutes = Math.floor((timeLeft) / 60);
    let seconds = timeLeft % 60;
    timerText.innerText = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

    let duration = isWorkMode ? workTime : breakTime;
    let progress = ((duration - timeLeft) / duration) * 100;
    timerDisplay.style.setProperty("--progress", progress + "%");
}

startButton.addEventListener("click", function() {
  if (timeId === null) {
    timeId = setInterval(function() {
      timeLeft--;

    // break time ☕ / session complete 🌟
    
    if (timeLeft <= 0 && isWorkMode === true) {
        if (currentInterval === totalIntervals) {
            clearInterval(timeId);
            timeId = null;
            sessionStep.innerText = "Session Complete!";
            modeIcon.innerText = "🌟";
        } else {
        isWorkMode = false;
        timeLeft = breakTime;
        sessionStep.textContent = "Break time";
        modeIcon.innerText = "☕";
      }
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

  isWorkMode = true;
  currentInterval = 1;
  timeLeft = workTime;

  sessionStep.textContent = "Work 1 of " + totalIntervals;
  modeIcon.innerText = "🍅";

  updateTimerDisplay();
});


