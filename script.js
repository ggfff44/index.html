const board = document.querySelector('.board');
const balanceDisplay = document.getElementById('balance');
const restartButton = document.getElementById('restart-button');

let balance = 0;

function createSquare(isBomb) {
    const square = document.createElement('div');
    square.className = 'square';
    square.textContent = isBomb ? '💣' : '💰';
    square.addEventListener('click', () => {
        if (isBomb) {
            alert('Game Over! You hit a bomb. Your balance will be reset.');
            balance = 0;
            balanceDisplay.textContent = balance;
            restartGame();
        } else {
            balance += 30;
            balanceDisplay.textContent = balance;
            square.style.backgroundColor = 'transparent';
            square.style.cursor = 'default';
            square.removeEventListener('click', () => { });
        }
    });
    return square;
}

function restartGame() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const isBomb = Math.random() < 0.33; // Approximately 33% of squares will be bombs
        const square = createSquare(isBomb);
        board.appendChild(square);
    }
}

restartButton.addEventListener('click', () => {
    restartGame();
});

restartGame();
