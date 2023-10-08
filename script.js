// JavaScript code for the Robux Game

let robuxCount = 0;
let cards = [];
let flippedCards = [];
let canFlip = true;

function createCard(imgSrc) {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = imgSrc;
  card.appendChild(img);

  card.addEventListener("click", () => {
    if (canFlip && !flippedCards.includes(card) && flippedCards.length < 2) {
      flipCard(card);
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        canFlip = false;
        setTimeout(checkMatch, 1000);
      }
    }
  });

  return card;
}

function flipCard(card) {
  card.classList.add("flipped");
}

function unflipCards() {
  flippedCards.forEach((card) => {
    card.classList.remove("flipped");
  });
  flippedCards = [];
  canFlip = true;
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const img1 = card1.querySelector("img").src;
  const img2 = card2.querySelector("img").src;

  if (img1 === img2) {
    robuxCount += 100;
    document.getElementById("robux-count").textContent = `${robuxCount} Robux`;
    flippedCards = [];
  } else {
    unflipCards();
  }
}

function initializeGame() {
  const gameBoard = document.getElementById("game-board");

  // Replace with your image URLs, ensuring you have both Robux and Bomb images.
  const imageUrls = [
    "https://media.printables.com/media/prints/128836/images/1234294_ba6edb95-e18f-4feb-a7c1-614c16f4c603/thumbs/inside/1280x960/png/robuxcoin.webp",
    "https://www.dictionary.com/e/wp-content/uploads/2018/07/bomb-emoji.png",
  ];

  // Create 9 cards with 4 pairs of images
  for (let i = 0; i < 4; i++) {
    imageUrls.forEach((imgSrc) => {
      const card = createCard(imgSrc);
      cards.push(card);
    });
  }

  // Shuffle the cards
  cards.sort(() => Math.random() - 0.5);

  // Add cards to the game board
  cards.forEach((card) => {
    gameBoard.appendChild(card);
  });
}

const cashOutButton = document.getElementById("cash-out");
cashOutButton.addEventListener("click", () => {
  if (robuxCount >= 25000) {
    robuxCount -= 25000;
    alert("Cash out successful! You now have 25000 Robux.");
    document.getElementById("robux-count").textContent = `${robuxCount} Robux`;
  } else {
    alert("You need at least 25000 Robux to cash out.");
  }
});

initializeGame();
