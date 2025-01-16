let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isAIEnabled = false;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize the board
const boardElement = document.getElementById('board');
function createBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.dataset.index = index;
    cellElement.addEventListener('click', handleCellClick);
    cellElement.textContent = cell;
    boardElement.appendChild(cellElement);
  });
}

// Handle cell click
function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (board[index] === '') {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add('taken');

    if (checkWinner(currentPlayer)) {
      alert(`${currentPlayer} wins!`);
      resetGame();
      return;
    }

    if (board.every(cell => cell !== '')) {
      alert('It\'s a draw!');
      resetGame();
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (isAIEnabled && currentPlayer === 'O') {
      setTimeout(aiMove, 500); // AI makes a move after 500ms
    }
  }
}

// Check for a winner
function checkWinner(player) {
  return winningCombinations.some(combination =>
    combination.every(index => board[index] === player)
  );
}

// AI logic
function aiMove() {
  const emptyCells = board
    .map((cell, index) => (cell === '' ? index : null))
    .filter(index => index !== null);

  if (emptyCells.length > 0) {
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';

    const cellElement = document.querySelector(`[data-index='${randomIndex}']`);
    cellElement.textContent = 'O';
    cellElement.classList.add('taken');

    if (checkWinner('O')) {
      alert('AI wins!');
      resetGame();
      return;
    }

    if (board.every(cell => cell !== '')) {
      alert('It\'s a draw!');
      resetGame();
      return;
    }

    currentPlayer = 'X';
  }
}

// Reset the game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  createBoard();
}

// Toggle AI mode
function toggleAI() {
  isAIEnabled = !isAIEnabled;
  document.getElementById('ai-status').textContent = isAIEnabled ? 'On' : 'Off';
  resetGame();
}

// Initialize the game
createBoard();
