// Define variables
let gameBoard = document.querySelector(".game-board");
let cells = document.querySelectorAll(".cell");
let message = document.querySelector("#messageDisplay");
let currentPlayer = "X";
let gameActive = true;

// Define winning combinations
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Add event listeners to cells
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", cellClicked);
}

// Function to handle cell clicks
function cellClicked() {
  let cell = event.target;

  // Check if cell is already marked or game is not active
  if (cell.innerHTML !== "" || !gameActive) {
    return;
  }

  // Mark cell with player's mark
  cell.innerHTML = currentPlayer;

  // Check for win or tie
  checkWin();
  checkTie();

  // Switch player's turn
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  // Update message display
  message.innerHTML = currentPlayer + "'s turn";
}

// Function to check for a win
function checkWin() {
  for (let i = 0; i < winCombos.length; i++) {
    let combo = winCombos[i];
    let a = cells[combo[0]].innerHTML;
    let b = cells[combo[1]].innerHTML;
    let c = cells[combo[2]].innerHTML;

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      gameActive = false;
      message.innerHTML = currentPlayer + " wins!";
      return;
    }
  }
}

// Function to check for a tie
function checkTie() {
  let fullBoard = true;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === "") {
      fullBoard = false;
      break;
    }
  }
  if (fullBoard && gameActive) {
    gameActive = false;
    message.innerHTML = "It's a tie!";
  }
}