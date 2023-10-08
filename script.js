document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".square");
    const balanceDisplay = document.getElementById("balance");
    const restartButton = document.getElementById("restart");
    let balance = 0;

    let bombs = 3;
    let bombsFound = 0;

    function reveal(square) {
        if (square.classList.contains("bomb")) {
            square.textContent = "💣";
            square.style.backgroundColor = "#FF0000";
            alert("Game Over! You found a bomb.");
            restart();
        } else {
            square.textContent = "💰";
            square.style.backgroundColor = "#FFD700";
            balance += 100;
            balanceDisplay.textContent = balance;
        }
    }

    function restart() {
        squares.forEach((square) => {
            square.classList.remove("revealed", "bomb");
            square.style.backgroundColor = "black";
            square.textContent = "";
        });

        balance = 0;
        balanceDisplay.textContent = balance;

        bombsFound = 0;
        const bombIndices = [...Array(squares.length).keys()];
        for (let i = bombIndices.length - 1; i >= bombs; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [bombIndices[i], bombIndices[j]] = [bombIndices[j], bombIndices[i]];
        }

        for (let i = 0; i < bombs; i++) {
            const bombIndex = bombIndices[i];
            squares[bombIndex].classList.add("bomb");
        }
    }

    squares.forEach((square) => {
        square.addEventListener("click", () => {
            if (!square.classList.contains("revealed")) {
                square.classList.add("revealed");
                reveal(square);
            }
        });
    });

    restartButton.addEventListener("click", restart);
});
