<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memory Card Game</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: grey;
        }
        .card {
            width: 100px;
            height: 100px;
            background-color: black;
            margin: 5px;
            display: inline-block;
            cursor: pointer;
        }
        .card img {
            display: none;
        }
    </style>
</head>
<body>
    <div id="game-board">
    </div>
    <script>
        const cards = [
            { id: 1, imgSrc: 'robux.png' },
            { id: 2, imgSrc: 'robux.png' },
            { id: 3, imgSrc: 'robux.png' },
            { id: 4, imgSrc: 'robux.png' },
            { id: 5, imgSrc: 'robux.png' },
            { id: 6, imgSrc: 'robux.png' },
            { id: 7, imgSrc: 'robux.png' },
            { id: 8, imgSrc: 'robux.png' },
            { id: 9, imgSrc: 'bomb.png' }
        ];

        let openedCards = [];
        let matchedCards = [];

        function shuffle(array) {
            let currentIndex = array.length, randomIndex;

            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }

            return array;
        }

        function createGameBoard() {
            const gameBoard = document.getElementById('game-board');
            const shuffledCards = shuffle(cards);

            shuffledCards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                cardElement.dataset.id = card.id;

                const cardImage = document.createElement('img');
                cardImage.src = card.imgSrc;
                cardImage.alt = 'Card';
                cardElement.appendChild(cardImage);

                cardElement.addEventListener('click', () => {
                    if (!cardElement.classList.contains('opened') && openedCards.length < 2) {
                        cardElement.classList.add('opened');
                        cardImage.style.display = 'block';
                        openedCards.push(cardElement);

                        if (openedCards.length === 2) {
                            const [card1, card2] = openedCards;

                            if (card1.dataset.id === card2.dataset.id) {
                                matchedCards.push(card1, card2);
                                openedCards = [];

                                if (matchedCards.length === cards.length) {
                                    setTimeout(() => {
                                        alert('Congratulations! You won the game!');
                                    }, 500);
                                }
                            } else {
                                setTimeout(() => {
                                    card1.classList.remove('opened');
                                    card2.classList.remove('opened');
                                    card1.querySelector('img').style.display = 'none';
                                    card2.querySelector('img').style.display = 'none';
                                    openedCards = [];
                                }, 1000);
                            }
                        }
                    }
                });

                gameBoard.appendChild(cardElement);
            });
        }

        createGameBoard();
    </script>
</body>
</html>
