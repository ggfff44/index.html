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
  const img = card.querySelector("img");
  img.style.display = "block";
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const img1 = card1.querySelector("img").src;
  const img2 = card2.querySelector("img").src;

  if (img1 === img2) {
    robuxCount += 100;
    document.getElementById("robux-count").textContent = `Robux: ${robuxCount}`;
    flippedCards = [];
    canFlip = true;
  } else {
    setTimeout(() => {
      flipCard(card1);
      flipCard(card2);
      flippedCards = [];
      canFlip = true;
    }, 500);
  }
}

function startGame() {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = "";

  const cardImages = [
    "robuxcoin.webp",
    "bomb-emoji.png",
    "robuxcoin.webp",
    "bomb-emoji.png",
    "robuxcoin.webp",
    "bomb-emoji.png",
  ];

  shuffleArray(cardImages);

  for (const imgSrc of cardImages) {
    const card = createCard(imgSrc);
    gameContainer.appendChild(card);
  }

  document.querySelector(".cover").style.display = "none";
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

document.querySelector(".cover").addEventListener("click", startGame);
