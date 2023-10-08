const squares = document.querySelectorAll('.square');
const balanceDisplay = document.getElementById('balance');
const restartButton = document.getElementById('restart-button');

let balance = 0;

squares.forEach((square) => {
    square.addEventListener('click', () => {
        if (square.getAttribute('data-is-bomb') === 'true') {
            alert('Game Over! You hit a bomb. Your balance will be reset.');
            balance = 0;
            balanceDisplay.textContent = balance;
            restartGame();
        } else {
            balance += 30;
            balanceDisplay.textContent = balance;
            square.style.backgroundColor = 'transparent';
            square.textContent = '\u{1F4B0}'; // Money bag emoji
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
        square.setAttribute('data-is-bomb', (Math.random() < 0.3).toString());
        square.addEventListener('click', () => {
            if (square.getAttribute('data-is-bomb') === 'true') {
                alert('Game Over! You hit a bomb. Your balance will be reset.');
                balance = 0;
                balanceDisplay.textContent = balance;
                restartGame();
            } else {
                balance += 30;
                balanceDisplay.textContent = balance;
                square.style.backgroundColor = 'transparent';
                square.textContent = '\u{1F4B0}'; // Money bag emoji
                square.removeEventListener('click', () => {});
            }
        });
    });
}
