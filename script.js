const balanceDisplay = document.getElementById('balanceDisplay');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
let balance = 0;
let isGameOver = false;

// Shuffle array elements randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create an array of indexes for bomb squares
const bombIndexes = Array.from({ length: 3 }, (_, index) => index);
shuffleArray(bombIndexes);

// Create a 3x3 grid of squares
for (let i = 0; i < 9; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.dataset.index = i;

    // Check if this square is a bomb
    const isBomb = bombIndexes.includes(i);
    if (isBomb) {
        square.dataset.isBomb = 'true';
    }

    square.addEventListener('click', () => {
        if (isGameOver) return;
        const index = square.dataset.index;
        const isBomb = square.dataset.isBomb === 'true';

        // Reveal square content
        square.style.backgroundImage = `url(${isBomb ? 'https://www.dictionary.com/e/wp-content/uploads/2018/07/bomb-emoji.png' : 'https://media.printables.com/media/prints/128836/images/1234294_ba6edb95-e18f-4feb-a7c1-614c16f4c603/thumbs/inside/1280x960/png/robuxcoin.webp'})`;
        square.style.pointerEvents = 'none'; // Disable clicking on matched square

        if (!isBomb) {
            balance += 30; // +30 robux for a right guess
            balanceDisplay.textContent = `Robux: ${balance}`;
        } else {
            isGameOver = true;
            balanceDisplay.textContent = 'Game Over';
        }
        checkWin();
    });

    board.appendChild(square);
}

restartButton.addEventListener('click', () => {
    restartGame();
});

function restartGame() {
    isGameOver = false;
    balance = 0;
    balanceDisplay.textContent = 'Robux: 0';

    // Reset the board
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.style.backgroundImage = 'none';
        square.style.pointerEvents = 'auto';
    });

    // Reshuffle bomb positions
    shuffleArray(bombIndexes);
    squares.forEach((square, index) => {
        const isBomb = bombIndexes.includes(index);
        square.dataset.isBomb = isBomb ? 'true' : 'false';
    });
}

function checkWin() {
    const revealedSquares = document.querySelectorAll('.square:not([style*="none"])');
    if (revealedSquares.length === 6) {
        balanceDisplay.textContent = 'You Win! Robux: ' + balance;
        isGameOver = true;
    }
}
