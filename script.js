const robuxBalanceElement = document.getElementById('robux-balance');
const gameContainer = document.getElementById('game-container');
const withdrawButton = document.getElementById('withdraw-button');

let robuxBalance = 100;

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
    const random = Math.random();
    if (random < 0.2) {
        square.classList.add('mine');
        updateRobuxBalance(-10);
    } else {
        square.classList.add('robux');
        updateRobuxBalance(30);
    }

    square.removeEventListener('click', () => handleSquareClick(square));
    checkWinCondition();
}

function checkWinCondition() {
    const robuxSquares = document.querySelectorAll('.robux').length;
    if (robuxSquares >= 3) {
        alert('Congratulations! You won the game!');
        withdrawButton.disabled = false;
    }
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
