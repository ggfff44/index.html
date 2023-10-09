let robuxBalance = 100.00;

// JavaScript code to handle the game logic
function startGame(betSize) {
    // Reset the game board
    document.getElementById("gameBoard").innerHTML = "";

    // Initialize game state
    let gameIsOver = false;
    let correctSquares = 0;

    // Create a new game board with 3x3 squares
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const square = document.createElement("div");
            square.className = "square";
            square.onclick = () => {
                if (!gameIsOver) {
                    const result = revealSquare(square, betSize);
                    if (result === "bomb") {
                        alert("You hit a bomb! Game over.");
                        document.getElementById("gameBoard").innerHTML = ""; // Clear the game board
                        gameIsOver = true;
                    } else if (result === "point") {
                        correctSquares++;
                        if (correctSquares === 6) {
                            alert("Congratulations! You won.");
                            const reward = betSize * 100 + (betSize * 100 * 0.10 * correctSquares); // Calculate reward
                            robuxBalance += reward;
                            document.getElementById("robuxBalance").textContent = robuxBalance.toFixed(2);
                            gameIsOver = true;
                        }
                    }
                }
            };
            document.getElementById("gameBoard").appendChild(square);
        }
    }
}

function revealSquare(square, betSize) {
    // Check if the square has already been revealed
    if (square.textContent !== "") {
        return;
    }

    // Implement logic to reveal squares and check for bombs or points
    // You can use emojis for bombs (🔥) and points (💰)
    const randomValue = Math.random();
    if (randomValue < 0.33) {
        square.textContent = "🔥"; // Bomb
        return "bomb";
    } else {
        square.textContent = "💰"; // Point
        return "point";
    }
}
