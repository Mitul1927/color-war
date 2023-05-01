let grid;
let timeLeft;
let redScore;
let blueScore;
const scoreRed = document.querySelector(".score-red");
const scoreBlue = document.querySelector(".score-blue");
const timer = document.querySelector(".timer");
const winners = document.querySelector(".winners");
const winnerRed = document.querySelector(".winner-red");
const winnerBlue = document.querySelector(".winner-blue");
const startButton = document.querySelector(".start-button");

function init() {
  grid = Array.from(document.querySelectorAll(".square"));
  timeLeft = 30;
  redScore = 0;
  blueScore = 0;
  winners.style.display = "none";
  winnerRed.style.display = "none";
  winnerBlue.style.display = "none";
  scoreRed.textContent = `Red Score: ${redScore}`;
  scoreBlue.textContent = `Blue Score: ${blueScore}`;
  timer.textContent = `Time left: ${timeLeft}`;
  grid.forEach((square) => {
    square.classList.remove("square-red", "square-blue");
    square.removeEventListener("click", handleClick);
    square.addEventListener("click", handleClick);
  });
}

function handleClick(event) {
  const square = event.target;
  if (square.classList.contains("square-red")) {
    blueScore++;
    scoreBlue.textContent = `Blue Score: ${blueScore}`;
  } else if (square.classList.contains("square-blue")) {
    redScore++;
    scoreRed.textContent = `Red Score: ${redScore}`;
  }
  square.classList.remove("square-red", "square-blue");
  const colors = ["red", "blue"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  square.classList.add(`square-${randomColor}`);
}

function updateTimer() {
  timeLeft--;
  timer.textContent = `Time left: ${timeLeft}`;
  if (timeLeft === 0) {
    endGame();
  }
}

function endGame() {
  grid.forEach((square) => {
    square.removeEventListener("click", handleClick);
  });
  if (redScore > blueScore) {
    winnerRed.style.display = "block";
  } else if (blueScore > redScore) {
    winnerBlue.style.display = "block";
  }
  winners.style.display = "flex";
}

startButton.addEventListener("click", () => {
  init();
  let countdown = setInterval(() => {
    if (timeLeft > 0) {
      updateTimer();
    } else {
      clearInterval(countdown);
    }
  }, 1000);
});
