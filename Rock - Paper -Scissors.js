let score = (JSON.parse(localStorage.getItem('score'))) || {
  win : 0,
  lose : 0,
  tie : 0
};

updateScoreElement()

function pickComputerMove() {
const randomNumber = Math.random();
let computerMove ='';

if (randomNumber >= 0 && randomNumber < 1 / 3) {
  computerMove = 'rock';

} else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
  computerMove = 'paper';

} else if (randomNumber < 1 && randomNumber > 2 / 3) {
  computerMove = 'scissors';
}
return computerMove;
}


function playGame(playerMove) {
const computerMove = pickComputerMove();
let result = '';
if (playerMove === 'rock') {
  if (computerMove === 'rock') {
    result = 'Tie';
  } else if (computerMove === 'paper') {
    result = 'Lose';
  } else if (computerMove === 'scissors') {
    result = 'Win';
  }
}
else if (playerMove === 'paper') {
  result = '';
  if (computerMove === 'rock') {
    result = 'Win';
  } else if (computerMove === 'paper') {
    result = 'Tie';
  } else if (computerMove === 'scissors') {
    result = 'Lose';
  }
}
else if (playerMove = 'scissors') {
  result = '';
  if (computerMove === 'rock') {
    result = 'Lose';
  } else if (computerMove === 'paper') {
    result = 'Win';
  } else if (computerMove === 'scissors') {
    result = 'Tie';
  }
}


if (result === 'Win') {
score.win += 1;
} else if (result === 'Lose') {
score.lose += 1;
} else if (result === 'Tie') {
score.tie += 1;
}
console.log(score);

localStorage.setItem('score',JSON.stringify(score));

updateScoreElement()

document.querySelector('.js-moves')
  .innerHTML = 
    `You
    <img src="./R - P - S -imgs/${playerMove}-emoji.png" alt="your-move" class="move-icon">
    <img src="./R - P - S -imgs/${computerMove}-emoji.png" alt="computer-move" class="move-icon">
    Computer`;

document.querySelector('.js-result')
  .innerHTML = `Result : You ${result}.` ;

return result;
}

function updateScoreElement(){
document.querySelector('.js-score')
.innerHTML = `Wins : ${score.win} Losess :  ${score.lose} Ties : ${score.tie}`;

}