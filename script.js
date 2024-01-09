const rockButton = document.querySelector('.js-rock-btn');
const paperButton = document.querySelector('.js-paper-btn');
const scissorButton = document.querySelector('.js-scissors-btn');
const resetScoreButton = document.querySelector('.js-reset-btn');
const autoPlayButton = document.querySelector('.js-autoplay-btn');

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
    };

rockButton.addEventListener('click',() => {
    playGame('rock');
});

paperButton.addEventListener('click',() => {
    playGame('paper');
});
  
scissorButton.addEventListener('click',() => {
    playGame('scissor');
});

resetScoreButton.addEventListener('click',() => {
    let resetAlartElement = document.querySelector('.js-reset-alart');
        resetAlartElement.innerHTML = `<label>Are you sure you want to reset the score?</label>
            <button class="js-reset-alart-yes">Yes</button>
            <button class="js-reset-alart-no">No</button>`
    
    document.querySelector('.js-reset-alart-yes')
        .addEventListener('click',(() => {
            resetScore();
            setTimeout(() => {resetAlartElement.innerHTML = ''},500);
        }));
    
    document.querySelector('.js-reset-alart-no')
        .addEventListener('click',(() => {
        setTimeout(() => {resetAlartElement.innerHTML = ''},500);
        }));
});

autoPlayButton.addEventListener('click',() => {
    autoPlay();
})

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
    if(!isAutoPlaying){
        autoPlayButton.innerText = 'Stop Playing'
        intervalId = setInterval(() => {    
            const playerMove = pickComputerMove();
            playGame(playerMove);
        },2000);
        isAutoPlaying = true; 
    }else {
        autoPlayButton.innerText = 'Auto Play'
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

document.body.addEventListener('keydown',(event) => {
    if(event.key === 'r'){
        playGame('rock');
    } else if(event.key === 'p'){
        playGame('paper');
    } else if (event.key === 's'){
        playGame('scissors');
    } else if (event.key ==='Backspace'){
        let resetAlartElement = document.querySelector('.js-reset-alart');
        resetAlartElement.innerHTML = `
            <label class="reset-alart-text">Are you sure you want to reset the score?</label>
            <button class="js-reset-alart-yes reset-alart-btn">Yes</button>
            <button class="js-reset-alart-no reset-alart-btn">No</button>`
    
        document.querySelector('.js-reset-alart-yes')
            .addEventListener('click',(() => {
                resetScore();
                setTimeout(() => {resetAlartElement.innerHTML = ''},500);
            }));
        
        document.querySelector('.js-reset-alart-no')
            .addEventListener('click',(() => {
            setTimeout(() => {resetAlartElement.innerHTML = ''},500);
            }));
    }
})
  
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
    }else if (playerMove === 'paper') {
        result = '';
        if (computerMove === 'rock') {
        result = 'Win';
        } else if (computerMove === 'paper') {
        result = 'Tie';
        } else if (computerMove === 'scissors') {
        result = 'Lose';
        }
    }else if (playerMove = 'scissors') {
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
  
localStorage.setItem('score',JSON.stringify(score));
  
updateScoreElement()
  
document.querySelector('.js-moves')
    .innerHTML = 
    `You
    <img src="./Images/${playerMove}-emoji.png" alt="your-move" class="move-icon">
    <img src="./Images/${computerMove}-emoji.png" alt="computer-move" class="move-icon">
    Computer`;

document.querySelector('.js-result')
    .innerHTML = `Result : You ${result}.` ;

return result;
}
  
function updateScoreElement(){
    document.querySelector('.js-score')
    .innerHTML = `Wins : ${score.win} Losess :  ${score.lose} Ties : ${score.tie}`;
}

function resetScore(){
    score.win = 0; 
    score.lose = 0;
    score.tie = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}