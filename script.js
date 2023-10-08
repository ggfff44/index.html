const board = document.getElementById('board');
const balanceDisplay = document.getElementById('balance');
const restartButton = document.getElementById('restart-button');

let balance = 0;
let isGameOver = false;

const images = [
    'https://media.printables.com/media/prints/128836/images/1234294_ba6edb95-e18f-4feb-a7c1-614c16f4c603/thumbs/inside/1280x960/png/robuxcoin.webp',
    'https://www.dictionary.com/e/wp-content/uploads/2018/07/bomb-emoji.png',
];

const shuffledImages = [...images, ...images].sort(() => Math.random() - 0.5);

// Create a 3x3 grid of squares
for (let i = 0; i < 9; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.dataset.index = i;
    square.style.backgroundImage = `url(${shuffledImages[i]})`;
    board.appendChild(square);
}

// Add click event to each square
const squares = document.querySelectorAll('.square');
squares.forEach((square) => {
    square.addEventListener('click', () => {
        if (isGameOver) return;
        const index = square.dataset.index;
        const clickedImage = shuffledImages[index];
        if (clickedImage === 'https://media.printables.com/media/prints/128836/images/1234294_ba6edb95-e18f-4feb-a7c1-614c16f4c603/thumbs/inside/1280x960/png/robuxcoin.webp') {
            balance += 100;
            balanceDisplay.textContent = `Robux: ${balance}`;
            square.style.pointerEvents = 'none'; // Disable clicking on matched square
        } else if (clickedImage === 'https://www.dictionary.com/e/wp-content/uploads/2018/07/bomb-emoji.png') {
            square.style.backgroundImage = 'url("https://www.dictionary.com/e/wp-content/uploads/2018/07/bomb-emoji.png")'; // Show bomb image
            isGameOver = true;
        }
        checkWin();
    });
});

// Check if the game is won
function checkWin() {
    if (document.querySelectorAll('.square[style*="background-image: url(\\"https://media.printables.com/media/prints/128836/images/1234294_ba6edb95-e18f-4feb-a7c1-614c16f4c603/thumbs/inside/1280x960/png/robuxcoin.webp\\")"]').length === 9) {
        balanceDisplay.textContent = 'You Win!';
        isGameOver = true;
    }
}

// Restart the game
restartButton.addEventListener('click', () => {
    balance = 0;
    balanceDisplay.textContent = `Robux: ${balance}`;
    isGameOver = false;
    squares.forEach((square) => {
        square.style.backgroundImage = '';
        square.style.pointerEvents = 'auto';
    });
    shuffledImages.sort(() => Math.random() - 0.5);
});
