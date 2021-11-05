"use strict";
(() => {
  const shuffle = inputArray => {
    let oldElement;
    for (let i = inputArray.length - 1; i > 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1));
      oldElement = inputArray[i];
      inputArray[i] = inputArray[rand];
      inputArray[rand] = oldElement;
    }
    return inputArray;
  }

  const endGameTitle = document.querySelector('.end-game');
  const memoryCards = document.querySelectorAll('.memory-card');
  let startGame = true;
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let intervalID;

  function timerGame() {
    const timer = document.querySelector('.timer-game');
    if (timer.textContent != 0) {
      timer.textContent -= 1;
    } else {
      endGameTitle.style = "display: block; color: var(--notMatch-color);";
      memoryCards.forEach(card => card.removeEventListener('click', flipCard));
      restartGame();
    }
  }

  function flipCard() {
    if (startGame) {
      intervalID = setInterval(timerGame, 1000);
      startGame = false;
    }

    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
  }

  function checkForMatch() {
    const isMatch = firstCard.textContent === secondCard.textContent;
    isMatch ? disableCards() : unFlipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('isMatch');
    secondCard.classList.add('isMatch');
    resetBoard();
    const memoryCards = document.querySelectorAll('.isMatch');
    if (memoryCards.length == 16) {
      setTimeout(restartGame, 100);
    }
  }

  function unFlipCards() {
    lockBoard = true;

    firstCard.classList.add('notMatch');
    secondCard.classList.add('notMatch');

    setTimeout(() => {
      firstCard.classList.remove('flip', 'notMatch');
      secondCard.classList.remove('flip', 'notMatch');

      lockBoard = false;
      resetBoard();
    }, 900);
  }

  function resetBoard() {
    lockBoard = false;
    hasFlippedCard = false;
    firstCard = null;
    secondCard = null;
  }

  function createCardValue() {
    const initialArray = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    const shuffleArray = shuffle(initialArray);

    for(let i = 0; i < shuffleArray.length; i++) {
      memoryCards[i].textContent = shuffleArray[i];
      memoryCards[i].addEventListener('click', flipCard);
    }
  }

  createCardValue();

  function restartGame() {
    clearInterval(intervalID);
    endGameTitle.style = "display: block";
    const restartGameButton = document.querySelector('.restart-game-button');
    restartGameButton.style = "display: block";
    restartGameButton.addEventListener('click', () => {
      window.location.reload();
    });
  }
})();
