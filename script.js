const board = document.getElementById('game-board');
const balanceDisplay = document.getElementById('balance');
const restartButton = document.getElementById('restart');
let balance = 0;

// Function to create the game board
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.textContent = '?';
        square.dataset.isBomb = Math.random() < 0.33; // Approximately 1/3 chance of being a bomb
        board.appendChild(square);

        square.addEventListener('click', () => {
            if (square.textContent === '?') {
                if (square.dataset.isBomb === 'true') {
                    square.textContent = '💣';
                    alert('Game Over! You hit a bomb. Your balance will be reset.');
                    balance = 0;
                    balanceDisplay.textContent = balance;
                    restartGame();
                } else {
                    square.textContent = '💰';
                    balance += 30;
                    balanceDisplay.textContent = balance;
                }
            }
        });
    }
}

// Function to restart the game
function restartGame() {
    board.innerHTML = '';
    createBoard();
}

createBoard();

restartButton.addEventListener('click', () => {
    restartGame();
});
