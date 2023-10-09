let robux = 100;
let betSize = 0;

function startGame() {
    // Get the selected bet size
    const betRadio = document.querySelector('input[name="bet"]:checked');
    betSize = parseFloat(betRadio.value);

    if (robux >= betSize) {
        robux -= betSize;
        updateBalance();

        const board = document.getElementById('board');
        board.innerHTML = '';
        
        for (let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.className = 'square';
            square.addEventListener('click', revealSquare);
            board.appendChild(square);
        }
    } else {
        alert("Not enough Robux to bet!");
    }
}

function revealSquare(event) {
    const square = event.target;
    const randomNumber = Math.random();

    if (randomNumber < 0.3) {
        square.textContent = '🔥'; // Bomb
        endGame();
    } else {
        square.textContent = '💰'; // Point
        robux += betSize * 2;
        updateBalance();
    }

    square.style.backgroundColor = 'transparent';
    square.style.border = 'none';
}

function endGame() {
    setTimeout(() => {
        alert('Game over! You hit a bomb.');
        robux -= betSize;
        updateBalance();
        startGame();
    }, 1000);
}

function updateBalance() {
    document.getElementById('balance').textContent = `Robux: ${robux}`;
}
