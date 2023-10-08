const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-button');
const balanceDisplay = document.getElementById('balance');

let cards = [];
let balance = 0;

// Function to create a shuffled deck
function createDeck() {
    const deck = [];
    for (let i = 0; i < 3; i++) {
        deck.push('robux', 'bomb', 'bomb');
    }
    return shuffle(deck);
}

// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to handle card click
function handleCardClick(index) {
    const card = cards[index];

    if (card.classList.contains('hidden')) {
        card.classList.remove('hidden');

        if (card.dataset.value === 'robux') {
            balance += 30;
        } else {
            balance -= 80;
            restartGame();
        }

        balanceDisplay.textContent = balance + ' Robux';
    }
}

// Function to restart the game
function restartGame() {
    cards.forEach((card) => {
        card.classList.add('hidden');
    });

    cards = createDeck();

    setTimeout(() => {
        cards.forEach((card, index) => {
            card.classList.add('hidden');
            card.dataset.value = cards[index];
        });
    }, 2000);
}

// Initialize the game
restartGame();

// Add click event listeners to the cards
cards.forEach((card, index) => {
    card.addEventListener('click', () => handleCardClick(index));
    gameBoard.appendChild(card);
});

// Add click event listener to the restart button
restartButton.addEventListener('click', restartGame);
