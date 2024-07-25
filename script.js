"use strict";
// Variables selection
const score0El=document.querySelector("#score--0");
const score1El=document.querySelector("#score--1");
const diceEl= document.querySelector( ".dice");
const rollDice= document.querySelector(".btn--roll");
const btnNew= document.querySelector(".btn--new");
const bntHold=document.querySelector(".btn--hold");
const current0El= document.querySelector("#current--0");
const current1El= document.querySelector("#current--1");
const player0El=document.querySelector(".player--0");
const player1El=document.querySelector(".player--1");
let scores, currentScore, activePlayer, playing;
//Starting Conditions
 

//Init function
const init =function(){
     scores=[0,0];
     currentScore= 0;
     activePlayer=0; 
     playing = true;

    score0El.textContent =0;
    score1El.textContent =0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    
    diceEl.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active"); 
    player1El.classList.remove("player--active");
}
init();
//Toggling players functionality
const togglePlayer=function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
    currentScore=0;
    activePlayer=activePlayer ===0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");    
}

//Rolling dice

rollDice.addEventListener("click", function(){
if(playing){
    // 1. Generating a ramdon dice roll
    const dice=Math.trunc(Math.random()*6 +1);

// 2. Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src= `/img/dice_${dice}.png`;
// 3. Check for rolled 1: If true, switch to next player 
if(dice!== 1 ){
    //Add dice to current score
    currentScore+=dice
    
    document.getElementById(`current--${activePlayer}`).textContent=currentScore;
} else{
    //Switch to next player
    togglePlayer();
     
}
}
});


//Hold functionality

bntHold.addEventListener("click", function(){
if(playing){
    //Add current score to active player's score
    scores[activePlayer]+=currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent=scores[activePlayer];

    //Check for winner 
    if(scores[activePlayer]>=50){
        //finish game
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        diceEl.classList.add("hidden");
        playing=false;
    } else {
        togglePlayer();
        
    }   }
     
});

// Btn New Game

btnNew.addEventListener("click", init);