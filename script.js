const gameBoard = document.getElementById('gameBoard');
const robuxBalance = document.getElementById('robux');
const withdrawButton = document.getElementById('withdraw');

const boardSize = 5;
const numBombs = Math.floor((boardSize * boardSize) * 0.5);
const robuxPerGame = 10;
const robuxPerWin = 300;

let robux = 100;

const generateGameBoard = () => {
    for (let i = 0; i < boardSize * boardSize; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        gameBoard.appendChild(square);

        square.addEventListener('click', () => {
            if (square.classList.contains('flag') || square.classList.contains('bomb')) {
                return;
            }

            if (Math.random() < 0.5) {
                square.classList.add('flag');
                robux += robuxPerWin;
            } else {
                square.classList.add('bomb');
                robux = 0;
                alert('You touched a bomb! Game over.');
                resetGame();
            }

            updateRobux();
        });
    }
};

const updateRobux = () => {
    robuxBalance.textContent = robux;
    if (robux >= 10000) {
        withdrawButton.disabled = false;
    } else {
        withdrawButton.disabled = true;
    }
};

const resetGame = () => {
    gameBoard.innerHTML = '';
    generateGameBoard();
    updateRobux();
};

withdrawButton.addEventListener('click', () => {
    if (robux >= 10000) {
        robux -= 10000;
        alert('Withdraw successful! You now have 0 robux.');
        updateRobux();
    } else {
        alert('You need at least 10,000 robux to withdraw.');
    }
});

generateGameBoard();
updateRobux();

// Function to end the game
function endGame(isWinner) {
    isGameActive = false;
    if (!isWinner) {
        setTimeout(() => {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                if (cell.classList.contains("bomb-cell")) {
                    cell.classList.remove("flipped");
                }
                cell.removeEventListener("click", () => clickCell(cell));
            });
            createBoard();
            isGameActive = true;
        }, 1000);
    }
}

