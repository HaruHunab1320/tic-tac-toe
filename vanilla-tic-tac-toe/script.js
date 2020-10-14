/* Game status display */
const statusDisplay = document.querySelector('.game--status');

/* game state */
/* pause game if endgame */
let gameActive = true;

/* current play indicator */
let currentPlayer = "X";

/* overall game state */
let gameState = ["", "", "", "", "", "", "", ""];

/* messages */
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

/* Set initial message to indicate which players turn */
statusDisplay.innerHTML = currentPlayerTurn();

/* Helper functions */
function handleCellPlayed(clickedCell, clickedCellIndex) {
/* update internal game state and UI */
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

function handleResultValidation() {
    let roundWon = false;
    /* Loop through our winning conditions */
    for (let i = 0; i <= 7; i++) {
      /* Take the values of the winning condition to compare against our game state */
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      /* if the state is empty, continue ti the next check */
      if(a === '' || b === '' || c === '') {
        continue;
      }
      /* Check to see if a winning condition has been met, if so, stop the loop. */
      if (a === b && b === c) {
        roundWon = true;
        break
      }
    }
    /* If the round has been won, display the results and deactivate the game */
    if (roundWon) {
      statusDisplay.innerHTML = winningMessage();
      gameActive = false;
      return;
    }

    /* If all cells are selected issue a draw outcome */
    let roundDraw = !gameState.includes("");
    if(roundDraw) {
      statusDisplay.innerHTML = drawMessage();
      gameActive = false;
      return;
    }
    /* If code has reached here, the game has not been won and its time for the next player */
    handlePlayerChange();
}


function handleCellClick(clickedCellEvent) {
  /* save clicked cell */
  const clickedCell = clickedCellEvent.target;

  /* grab data-cell-index to determine which cell was clicked */
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('data-cell-index')
  );

  /* check if the cell has been played or if the game is paused. If so, ignore the click */
  if (gameState[clickedCellIndex] !== "" || !gameActive){
    return;
  }

  /* If everything is in order, proceed with the game flow. */
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.cell')
  .forEach(cell => cell.innerHTML = "");
}


/* Event Listeners */
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);