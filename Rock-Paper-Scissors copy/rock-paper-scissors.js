let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();
// if(!score){ //same as ==null
//   score = {
//     wins: 0,
//     losses: 0,
//     ties: 0

//   };
// }
function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

document.querySelector('.js-reset-button')
.addEventListener('click', ()=>{
  // resetScore();
  resetConfirmation();
})

document.querySelector('.js-autoplay-button')
.addEventListener('click',() =>{
  autoPlay();
})

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if(!isAutoPlaying){
    document.querySelector('.js-autoplay-button').innerHTML = 'Stop Playing'
    intervalId = setInterval(() =>{
      const playerMove = pickComputerMove()
       playGame(playerMove)
    },1000)
    isAutoPlaying = true;
  }else{
    document.querySelector('.js-autoplay-button').innerHTML = 'Auto Play'
    clearInterval(intervalId)
    isAutoPlaying = false;
  }
 
}

 document.querySelector('.js-rock-button')
 .addEventListener('click',() =>{
  playGame('rock');
 })

 document.querySelector('.js-paper-button')
 .addEventListener('click',() =>{
  playGame('paper');
 })

 document.querySelector('.js-scissors-button')
 .addEventListener('click',() =>{
  playGame('scissors');
 })

 document.body.addEventListener('keydown',(event) =>{
  if(event.key === 'r'){
    playGame('rock')
  }else if(event.key === 'p'){
    playGame('paper')
  }else if(event.key === 's'){
    playGame('scissors')
  }
 })

 document.body.addEventListener('keydown',(event) =>{
  if(event.key === 'a'){
    autoPlay();
  }else if(event.key === 'Backspace'){
    // resetScore();
    resetConfirmation();
  }
 })

 function resetConfirmation(){
  document.querySelector('.js-reset-confirmation').innerHTML =
  `Are you sure you want to reset the score 
  <button class = "yes-btn reset-confirm-yes">
  Yes
  </button>
  <button class = "no-btn reset-confirm-no">
  No
  </button>`
 }

 document.querySelector('.reset-confirm-yes')
 .addEventListener('click',() =>{
  resetScore();
  hideConfirmation();
 })

 document.querySelector('.reset-confirm-no')
 .addEventListener('click',() =>{
hideConfirmation();
 })

 function hideConfirmation(){
  document.querySelector('.js-reset-confirmation').innerHTML = '';
 }




function playGame(playerMove) {
  const computerMove = pickComputerMove();
  result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You won.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You won.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You won.";
    }
  }


  if (result === "You won.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves')
  .innerHTML = ` You 
<img class="move-icon" src="/images/${playerMove}-emoji.png" alt="">
Computer
<img class="move-icon" src="/images/${computerMove}-emoji.png" alt="">`;


}

function updateScoreElement() {
  document.querySelector(".js-score").innerHTML = `Wins: ${score.wins} , 
   Losses: ${score.losses} ,
   Ties: ${score.ties}`;
}

function pickComputerMove() {
  randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 1 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}