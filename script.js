const squares = document.querySelectorAll('.square');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

let robux = 0;
let selectedSquares = [];
let isGameOver = false;

// Shuffle the squares
function shuffle() {
    squares.forEach(square => {
        const randomPosition = Math.floor(Math.random() * 9);
        square.style.order = randomPosition;
    });
}

// Add click event to each square
squares.forEach(square => {
    square.addEventListener('click', () => {
        if (isGameOver || square === selectedSquares[0]) return;
        square.classList.add('selected');
        selectedSquares.push(square);
        if (selectedSquares.length === 2) {
            const [firstSquare, secondSquare] = selectedSquares;
            const value1 = firstSquare.getAttribute('data-value');
            const value2 = secondSquare.getAttribute('data-value');
            if (value1 === value2) {
                robux += 100;
                scoreDisplay.textContent = `Robux: ${robux}`;
                selectedSquares = [];
            } else {
                setTimeout(() => {
                    firstSquare.classList.remove('selected');
                    secondSquare.classList.remove('selected');
                    selectedSquares = [];
                }, 1000);
            }
            checkWin();
        }
    });
});

// Check if the game is won
function checkWin() {
    if (document.querySelectorAll('.selected').length === 9) {
        isGameOver = true;
        scoreDisplay.textContent = 'You Win!';
    }
}

// Restart the game
restartButton.addEventListener('click', () => {
    robux = 0;
    scoreDisplay.textContent = `Robux: ${robux}`;
    isGameOver = false;
    selectedSquares = [];
    squares.forEach(square => {
        square.classList.remove('selected');
    });
    shuffle();
});

// Initialize the game
shuffle();
