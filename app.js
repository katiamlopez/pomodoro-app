const decreaseButton = document.querySelector("#decrease-intervals");
const increaseButton = document.querySelector("#increase-intervals");
const intervalCount = document.querySelector("#interval-count");
const sessionStep = document.querySelector("#session-step");

let totalIntervals = 4;

increaseButton.addEventListener("click", function() {
    if (totalIntervals < 10) {
        totalIntervals++;
        intervalCount.textContent = totalIntervals;
        sessionStep.textContent = "Work 1 of " + totalIntervals;
    }
});

decreaseButton.addEventListener("click", function() {
    if (totalIntervals > 2) {
        totalIntervals--;
        intervalCount.textContent = totalIntervals;
        sessionStep.textContent = "Work 1 of " + totalIntervals;
    }
});