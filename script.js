document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".square");
    const balanceDisplay = document.getElementById("balance");
    let balance = 0;

    let bombs = 3;
    let bombsFound = 0;

    function reveal(square) {
        const value = square.getAttribute("data-value");

        if (value === "robux") {
            balance += 100;
            square.style.backgroundColor = "#FFD700";
            square.textContent = "💰";
        } else if (value === "bomb") {
            bombsFound++;
            square.style.backgroundColor = "#FF0000";
            square.textContent = "💣";
            if (bombsFound === bombs) {
                alert("Game Over! You found all the bombs.");
                restart();
            }
        }

        balanceDisplay.textContent = balance;
    }

    function restart() {
        squares.forEach((square) => {
            square.style.backgroundColor = "black";
            square.textContent = "";
        });

        balance = 0;
        balanceDisplay.textContent = balance;

        bombsFound = 0;
        // Randomly shuffle the bomb positions
        const bombIndices = [...Array(squares.length).keys()];
        for (let i = bombIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [bombIndices[i], bombIndices[j]] = [bombIndices[j], bombIndices[i]];
        }

        // Set bombs
        for (let i = 0; i < bombs; i++) {
            const bombIndex = bombIndices[i];
            squares[bombIndex].setAttribute("data-value", "bomb");
        }
    }

    squares.forEach((square) => {
        square.addEventListener("click", () => {
            if (square.style.backgroundColor === "black") {
                reveal(square);
            }
        });
    });

    restart();
});
