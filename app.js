const decreaseButton = document.querySelector("#decrease-intervals");
const increaseButton = document.querySelector("#increase-intervals");
const intervalCount = document.querySelector("#interval-count");
const sessionStep = document.querySelector("#session-step");
const timerDisplay = document.querySelector("#timer-display");
const startButton = document.querySelector("#start-button");
const pauseButton = document.querySelector("#pause-button");
const resetButton = document.querySelector("#reset-button");

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
    sessionStep.textContent = "Work 1 of " + totalIntervals;
};

//botones [▶] [⏸] [↻] controles

let workTime = 25*60;
let timeLeft = workTime;
let timeId = null;

startButton.addEventListener("click", function() {
  if (timeId === null) {
    timeId = setInterval(function() {
      timeLeft--;
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