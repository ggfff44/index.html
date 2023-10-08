const robuxBalanceElement = document.getElementById('robux-balance');
const gameContainer = document.getElementById('game-container');
const withdrawButton = document.getElementById('withdraw-button');
const restartButton = document.getElementById('restart-button');

let robuxBalance = 100;
let gameOver = false;

function updateRobuxBalance(amount) {
    robuxBalance += amount;
    robuxBalanceElement.textContent = robuxBalance;
}

function createGameGrid() {
    for (let i = 0; i < 25; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.addEventListener('click', () => handleSquareClick(square));
        gameContainer.appendChild(square);
    }
}

function handleSquareClick(square) {
    if (gameOver) return;

    const random = Math.random();
    if (random < 0.5) {
        square.classList.add('mine');
        square.textContent = '';
        gameOver = true;
        square.removeEventListener('click', () => handleSquareClick(square));
        restartButton.style.display = 'block';
        withdrawButton.disabled = true;
    } else {
        square.classList.add('robux');
        square.textContent = '';
        updateRobuxBalance(10);
        checkWinCondition();
    }
}

function checkWinCondition() {
    const robuxSquares = document.querySelectorAll('.robux').length;
    if (robuxSquares >= 13) {
        alert('Congratulations! You won the game!');
        withdrawButton.disabled = false;
    }
}

function restartGame() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.classList.remove('mine', 'robux');
        square.textContent = '';
        square.addEventListener('click', () => handleSquareClick(square));
    });
    gameOver = false;
    restartButton.style.display = 'none';
    withdrawButton.disabled = false;
}

createGameGrid();

withdrawButton.addEventListener('click', () => {
    if (robuxBalance >= 10000) {
        alert('Withdraw successful!');
        robuxBalance -= 10000;
        robuxBalanceElement.textContent = robuxBalance;
        withdrawButton.disabled = true;
    } else {
        alert('You need at least 10,000 robux to withdraw.');
    }
});

restartButton.addEventListener('click', () => {
    restartGame();
});
