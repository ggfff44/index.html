document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".square");
    const balanceDisplay = document.getElementById("balance");
    const restartButton = document.getElementById("restart");
    let balance = 0;

    squares.forEach((square) => {
        square.addEventListener("click", () => {
            const value = square.getAttribute("data-value");

            if (value === "robux") {
                balance += 100;
            } else if (value === "bomb") {
                balance -= 80;
            }

            square.style.backgroundColor = value === "robux" ? "#FFD700" : "#FF0000";
            square.textContent = value === "robux" ? "💰" : "💣";

            balanceDisplay.textContent = balance;
        });
    });

    restartButton.addEventListener("click", () => {
        squares.forEach((square) => {
            square.style.backgroundColor = "black";
            square.textContent = "";
        });

        balance = 0;
        balanceDisplay.textContent = balance;
    });
});
