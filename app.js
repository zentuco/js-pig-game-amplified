/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

alert('---------------- Welcome to Zentuco\'s Pig Game ----------------\n\nRoll the dices to get points. Pressing hold you save the sum of the points you got on your turn but... Get a 1 in either dice and you loose your current score!\nYou can set the final score you want, otherwise the first player to get 100 points WINS.\n\nOh! Hi Mark.');

var scores, roundScore, activePlayer, gamePlaying;
init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying) {
  // 1. Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';

    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png'


    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }

    // 3. Update the round score if the rolled number was NOT a 1 && redoing it so if 2 6s in a row loses score
    /*
    if (dice === 6 && lastDice === 6) {
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      nextPlayer();
      lastDice = 0;
    } else if (dice !== 1) {
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      lastDice = dice;
    } else {
      nextPlayer();
      lastDice = 0;
    } */
  }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. Add current score to global score
    scores[activePlayer] += roundScore;

    // 2. Update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;

    var input = document.querySelector('.final-score').value;
    var winningScore;

    // 3. Check if player won the game if not change player.
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});


function nextPlayer() {
  roundScore = 0;
  document.querySelector('#current-' + activePlayer).textContent = roundScore;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);


function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
}




// .textContent inserts only text
//document.querySelector('#current-' + activePlayer).textContent = dice;

// use .innerHTML method to insert html with JS
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'
