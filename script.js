function revealSquare(square, betSize) {
    // Check if the square has already been revealed
    if (square.getAttribute("data-value") !== "") {
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

    // Update the data-value attribute to indicate the square has been revealed
    square.setAttribute("data-value", square.textContent);

    // Check if the player has hit a point
    if (square.textContent === "💰") {
        // Calculate the reward based on the bet size and add it to the player's balance
        const reward = betSize * 100 * 2; // Double the bet size
        const robuxBalanceElement = document.getElementById("robuxBalance");
        const currentBalance = parseFloat(robuxBalanceElement.textContent);
        const newBalance = currentBalance + reward;
        robuxBalanceElement.textContent = newBalance.toFixed(2);
    }

    // Check if the player has hit a bomb and end the game
    if (square.textContent === "🔥") {
        alert("You hit a bomb! Game over.");
        document.getElementById("gameBoard").innerHTML = ""; // Clear the game board
    } else {
        // Check if all squares have been revealed (win condition)
        const allSquares = document.querySelectorAll(".square");
        const allRevealed = Array.from(allSquares).every(square => square.getAttribute("data-value") !== "");
        if (allRevealed) {
            alert("Congratulations! You won.");
            // You can add logic here to give the player a reward based on their betSize
        }
    }
}
