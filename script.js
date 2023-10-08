const cards = [
    { id: 0, imgSrc: 'robux.png', isFlipped: false },
    { id: 1, imgSrc: 'robux.png', isFlipped: false },
    { id: 2, imgSrc: 'robux.png', isFlipped: false },
    { id: 3, imgSrc: 'robux.png', isFlipped: false },
    { id: 4, imgSrc: 'robux.png', isFlipped: false },
    { id: 5, imgSrc: 'robux.png', isFlipped: false },
    { id: 6, imgSrc: 'robux.png', isFlipped: false },
    { id: 7, imgSrc: 'robux.png', isFlipped: false },
    { id: 8, imgSrc: 'robux.png', isFlipped: false }
];

let firstCard = null;
let secondCard = null;
let matches = 0;
let attempts = 0;
let robux = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard(index) {
    if (cards[index].isFlipped) return;
    const card = document.querySelector(`.card:nth-child(${index + 1})`);
    card.innerHTML = `<img src="${cards[index].imgSrc}" alt="Card">`;
    cards[index].isFlipped = true;

    if (firstCard === null) {
        firstCard = index;
    } else {
        secondCard = index;
        attempts++;
        document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    if (cards[firstCard].imgSrc === cards[secondCard].imgSrc) {
        matches++;
        robux += 100; // Reward 100 robux for a match
        document.getElementById('robux').textContent = `Robux: ${robux}`;

        if (matches === cards.length / 2) {
            alert('Congratulations! You won!');
            resetGame();
        } else {
            firstCard = null;
            secondCard = null;
        }
    } else {
        const card1 = document.querySelector(`.card:nth-child(${firstCard + 1})`);
        const card2 = document.querySelector(`.card:nth-child(${secondCard + 1})`);
        card1.innerHTML = '';
        card2.innerHTML = '';
        cards[firstCard].isFlipped = false;
        cards[secondCard].isFlipped = false;
        firstCard = null;
        secondCard = null;

        // Penalize 50 robux for a mismatch
        robux -= 50;
        document.getElementById('robux').textContent = `Robux: ${robux}`;

        if (robux < 0) {
            alert('You ran out of Robux! Game over.');
            resetGame();
        }
    }
}

function resetGame() {
    matches = 0;
    attempts = 0;
    robux = 0;
    document.getElementById('attempts').textContent = 'Attempts: 0';
    document.getElementById('robux').textContent = 'Robux: 0';

    cards.forEach(card => {
        card.isFlipped = false;
    });

    shuffleArray(cards);

    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach((card, index) => {
        card.innerHTML = '';
        card.style.pointerEvents = 'auto';
    });
}

shuffleArray(cards);
