const squares = document.querySelectorAll('.square');
const balanceDisplay = document.getElementById('balance');
const restartButton = document.getElementById('restart');
let balance = 0;

// Create an array to represent the board with 3 bombs and 6 good boxes
const board = Array(9).fill('good');
board.fill('bomb', 0, 3);
shuffleArray(board);

squares.forEach((square, index) => {
    square.addEventListener('click', () => {
        if (square.classList.contains('bomb')) {
            alert('Game Over! You hit a bomb. Your balance will be reset.');
            balance = 0;
            balanceDisplay.textContent = balance;
            restartGame();
        } else {
            balance += 30;
            balanceDisplay.textContent = balance;
            square.classList.remove('cover');
            square.textContent = '💰';
            square.removeEventListener('click', () => {});
            // Check if all good boxes have been clicked
            const allGoodBoxesClicked = [...squares].filter((s) => s.classList.contains('good') && !s.classList.contains('cover')).length === 0;
            if (allGoodBoxesClicked) {
                alert('Congratulations! You won. Restarting the game.');
                restartGame();
            }
        }
    });

    // Add a cover to each square
    const cover = document.createElement('div');
    cover.classList.add('cover');
    square.appendChild(cover);

    // Set the initial state for each square
    if (board[index] === 'bomb') {
        square.classList.add('bomb', 'cover');
    } else if (board[index] === 'good') {
        square.classList.add('good', 'cover');
    }
});

restartButton.addEventListener('click', () => {
    restartGame();
});

function restartGame() {
    board.fill('good', 0, 6);
    board.fill('bomb', 6, 9);
    shuffleArray(board);

    squares.forEach((square, index) => {
        square.classList.remove('good', 'bomb');
        square.classList.add('cover');
        square.textContent = '';
    });
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const squares = document.querySelectorAll('.square');
const balanceDisplay = document.getElementById('balance');
const restartButton = document.getElementById('restart');
let balance = 0;

// Add your game logic here

