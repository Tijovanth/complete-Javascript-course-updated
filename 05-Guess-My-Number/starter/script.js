'use strict';

let random;
let score;

startGuessMyNumberGame();
function startGuessMyNumberGame() {
  random = Math.trunc(Math.random() * 20 + 1);
  document.querySelector('.score').textContent = 20;
  score = 20;
  document.querySelector('.message').textContent = 'Start Guessing ...';
}

document.querySelector('.again').addEventListener('click', function () {
  startGuessMyNumberGame();
  document.querySelector('.check').disabled = false;
  document.querySelector('.number').textContent = '?';
});

document.querySelector('.check').addEventListener('click', function () {
  let guess = Number(document.querySelector('.guess').value);
  document.querySelector('.guess').value = '';
  if (!guess) {
    document.querySelector('.message').textContent = `🚫  No Number`;
  } else if (guess < 1 || guess > 20) {
    document.querySelector(
      '.message'
    ).textContent = `🚫  Select Number Between 1 to 20`;
  } else {
    if (guess === random) {
      document.querySelector('.message').textContent = `🎉  Correct Number`;
      document.querySelector('.number').textContent = random;
      let highscore = document.querySelector('.highscore').textContent;
      if (highscore < score)
        document.querySelector('.highscore').textContent = score;
      document.querySelector('.check').disabled = true;
    } else if (random > guess) {
      document.querySelector('.message').textContent = `🤬 Too Low`;
      decreaseScore();
    } else if (random < guess) {
      document.querySelector('.message').textContent = `🤬 Too High`;
      decreaseScore();
    }
  }
});

function checkScore() {
  return score > 0 ? true : false;
}

function decreaseScore() {
  score -= 1;
  document.querySelector('.score').textContent = score;
}

document.querySelector('.score').addEventListener(
  'DOMSubtreeModified',
  function () {
    if (!checkScore()) {
      document.querySelector('.check').disabled = true;
      document.querySelector('.message').textContent = `😭 You Lost`;
    }
  },
  false
);
