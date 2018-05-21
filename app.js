/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
(function() {
let scores, roundScore, activePlayer, gamePlaying;

const nextPlayer = () => {
  roundScore = 0;
  document.querySelector('.dice').style.display = 'none';

  if (scores[activePlayer] > 101) {
    document.querySelector(`#name-${activePlayer}`).textContent = `Player ${activePlayer + 1} WON!`;
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
    gamePlaying = false;
  } else {
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    activePlayer = activePlayer === 1 ? 0 : 1;
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');
    document.querySelector('#current-' + activePlayer).textContent = roundScore.toString(10);
  }
};

const savePlayerScore = () => {
  scores[activePlayer] += roundScore;
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer].toString();
};

const startGame = () => {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.add('active');
};

document.querySelector('.btn-roll').addEventListener('click', () => {
  if (gamePlaying) {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    roundScore += diceValue;
    const diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = `dice-${diceValue}.png`;

    if (diceValue === 1) {
      nextPlayer();
    }

    document.querySelector('#current-' + activePlayer).textContent = roundScore.toString(10);
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gamePlaying) {
    savePlayerScore();
    nextPlayer();
  }
});

document.querySelector('.btn-new').addEventListener('click', startGame);

startGame();

})();
