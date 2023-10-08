const squares = document.querySelectorAll('.square');
const balanceDisplay = document.getElementById('balance');
const restartButton = document.getElementById('restart');
const logo = document.querySelector('.brand-logo img');
let balance = 0;

squares.forEach((square) => {
    square.addEventListener('click', () => {
        if (square.getAttribute('data-is-bomb') === 'true') {
            alert('Game Over! You hit a bomb. Your balance will be reset. 🔥');
            balance = 0;
            balanceDisplay.textContent = balance;
            restartGame();
        } else {
            balance += 30;
            balanceDisplay.textContent = balance;
            square.style.backgroundColor = 'transparent';
            square.textContent = '💰';
            square.removeEventListener('click', () => {});
        }
    });
});

restartButton.addEventListener('click', () => {
    restartGame();
});

function restartGame() {
    squares.forEach((square) => {
        square.style.backgroundColor = 'black';
        square.textContent = '';
        square.addEventListener('click', () => {
            if (square.getAttribute('data-is-bomb') === 'true') {
                alert('Game Over! You hit a bomb. Your balance will be reset. 🔥');
                balance = 0;
                balanceDisplay.textContent = balance;
                restartGame();
            } else {
                balance += 30;
                balanceDisplay.textContent = balance;
                square.style.backgroundColor = 'transparent';
                square.textContent = '💰';
                square.removeEventListener('click', () => {});
            }
        });
    });
}

logo.style.borderRadius = '50%'; // Smoothing the edges of the logo
