const robuxCountDisplay = document.getElementById("robux-count");
const cashOutButton = document.getElementById("cash-out");
const gameBoard = document.getElementById("game-board");
const totalCards = 8; // Change the number of cards as needed
let robuxCount = 0;
let cardsFlipped = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const robuxImages = [
    "https://media.printables.com/media/prints/128836/images/1234294_ba6edb95-e18f-4feb-a7c1-614c16f4c603/thumbs/inside/1280x960/png/robuxcoin.webp", // Robux image
    "https://www.dictionary.com/e/wp-content/uploads/2018/07/bomb-emoji.png" // Bomb image
];

const cards = [];

// Create the game board
function createBoard() {
    for (let i = 0; i < totalCards * 2; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        const img = document.createElement("img");
        img.src = robuxImages[i % 2];
        card.appendChild(img);
        card.addEventListener("click", flipCard);
        cards.push(card);
    }
    shuffleCards();
    cards.forEach((card) => gameBoard.appendChild(card));
}

// Shuffle the cards using the Fisher-Yates algorithm
function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

// Handle card flipping
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Check if the flipped cards are a match
function checkForMatch() {
    const isMatch = firstCard.querySelector("img").src === secondCard.querySelector("img").src;

    isMatch ? disableCards() : unflipCards();
}

// Disable cards if they match
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    if (firstCard.querySelector("img").src === robuxImages[0]) {
        robuxCount += 100;
    } else {
        robuxCount -= 80;
    }
    
    robuxCountDisplay.textContent = `${robuxCount} Robux`;

    cardsFlipped += 2;
    if (cardsFlipped === totalCards * 2) {
        robuxCountDisplay.textContent = "Congratulations! You've won!";
        cashOutButton.style.display = "none";
    }

    resetBoard();
}

// Unflip cards if they don't match
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        robuxCount -= 80;
        robuxCountDisplay.textContent = `${robuxCount} Robux`;

        resetBoard();
    }, 1000);
}

// Reset the board
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Cash out function
cashOutButton.addEventListener("click", () => {
    if (robuxCount >= 3000) {
        robuxCount -= 3000;
        robuxCountDisplay.textContent = `${robuxCount} Robux`;
        alert("Congratulations! You've cashed out 3000 Robux!");
    } else {
        alert("Sorry, you need at least 3000 Robux to cash out.");
    }
});

// Initialize the game
createBoard();
