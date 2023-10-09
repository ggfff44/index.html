let robuxBalance = 100;

// JavaScript code to handle the game logic
function startGame(betSize) {
    robuxBalance -= betSize * 100; // Deduct the bet from the balance

    // Reset the game board
    document.getElementById("gameBoard").innerHTML = "";

    // Create a new game board with 3x3 squares
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const square = document.createElement("div");
            square.className = "square";
            square.onclick = () => revealSquare(square, betSize);
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
    } else {
        square.textContent = "💰"; // Point
    }

    // Check if the player has hit a point
    if (square.textContent === "💰") {
        // Calculate the reward based on the bet size and add it to the player's balance
        const reward = betSize * 100 * 1.10; // Bet plus 10% per square
        robuxBalance += reward;
        document.getElementById("robuxBalance").textContent = robuxBalance.toFixed(2);
    }

    // Check if all squares have been revealed (win condition)
    const allSquares = document.querySelectorAll(".square");
    const allRevealed = Array.from(allSquares).every(square => square.textContent !== "");
    if (allRevealed) {
        alert("Congratulations! You won.");
        // You can add logic here to give the player a reward based on their betSize
    }
}
