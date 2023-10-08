<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mine Gambling Game</title>
    <style>
        /* Add any custom CSS styling here */
    </style>
</head>
<body>
    <h1>Mine Gambling Game</h1>
    <p>Click on a position to dig and find treasures, but be careful not to hit a mine!</p>
    <div id="game-board">
        <!-- The game board will be generated here using JavaScript -->
    </div>
    <script>
        const boardSize = 10;
        const numMines = 3;
        let board = [];
        let mines = [];
        let attempts = 0;

        // Function to initialize the game board
        function initializeBoard() {
            for (let i = 0; i < boardSize; i++) {
                board.push(" ");
            }
            mines = Array.from({ length: numMines }, () => Math.floor(Math.random() * boardSize));
        }

        // Function to handle a player's move
        function dig(position) {
            if (mines.includes(position)) {
                alert("Boom! You hit a mine. Game over!");
                location.reload(); // Reload the page to start a new game
            } else {
                board[position] = "T";
                attempts++;
                document.getElementById("game-board").innerHTML = renderBoard();
                if (attempts === (boardSize - numMines)) {
                    alert("Congratulations! You've found all the treasures without hitting a mine.");
                    location.reload(); // Reload the page to start a new game
                }
            }
        }

        // Function to render the game board
        function renderBoard() {
            let boardHtml = "<div class='board-row'>";
            for (let i = 0; i < boardSize; i++) {
                boardHtml += `<div class='cell' onclick='dig(${i})'>${board[i]}</div>`;
                if (i % 5 === 4) {
                    boardHtml += "</div><div class='board-row'>";
                }
            }
            boardHtml += "</div>";
            return boardHtml;
        }

        // Initialize the game board when the page loads
        window.onload = function () {
            initializeBoard();
            document.getElementById("game-board").innerHTML = renderBoard();
        };
    </script>
</body>
</html>
