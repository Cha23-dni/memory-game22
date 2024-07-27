

// Game Variables
let cards = document.querySelectorAll(".card");
let cardArray = [...cards];
let flippedCard = false; 
let lockCard = false;     
let firstCard, secondCard;
let score = 0;
let bgMusic = document.getElementById("bg-music");
let scoreDisplay = document.getElementById("score");
let restartButton = document.getElementById("restart");
let resetButton = document.getElementById("reset");

// Shuffle the cards
function shuffle() {
    cardArray.forEach((card) => {
        let randomIndex = Math.floor(Math.random() * cardArray.length);
        card.style.order = randomIndex;
        card.children[1].style.backgroundImage = `url(${card.getAttribute("data-image")})`;
    });
}

// Flip a card
function flipCard() {
    if (lockCard) return;          // Exit if cards are locked
    if (this === firstCard) return; // Exit if the same card is clicked again

    this.classList.add("flip");

    if (!flippedCard) {
        // First card flipped
        flippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Check for a match
function checkForMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;

    isMatch ? handleMatch() : unflipCards();
}

// Handle a match (update score and disable cards)
function handleMatch() {
    updateScore(); 
    disableCards(); 
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Unflip non-matched cards
function unflipCards() {
    lockCard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1500);
}

// Update the score
function updateScore() {
    score++;
    scoreDisplay.textContent = score; // Fixed typo
}

// Reset the game board
function resetBoard() {
    [flippedCard, lockCard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Restart the game
function restartGame() {
    score = 0;
    scoreDisplay.textContent = score;
    cards.forEach((card) => {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard);
    });
    shuffle();
}

// Reset the game
function resetGame() {
    restartGame();
    bgMusic.pause();
    bgMusic.currentTime = 0;
}

// Start the game
function startGame() {
    shuffle();
    cards.forEach((card) => card.addEventListener("click", flipCard));
    bgMusic.play();
}

// Event listeners for restart and reset buttons
restartButton.addEventListener("click", restartGame);
resetButton.addEventListener("click", resetGame);

startGame();
