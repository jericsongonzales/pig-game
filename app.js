/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//GLOBAL VARIABLES 
let randomNum, randomNum1, randomNum2, dice1, dice2, activePlayer, scores, isGamePlaying;
let newGameBtn, rollBtn, holdBtn;
let currentScore0, currentScore1, currentScoreSum, globalScore0, globalScore1;
let player0Panel, player1Panel, name0, name1; 
let inputValue;

name0 = document.querySelector('#name-0');
name1 = document.querySelector('#name-1');
newGameBtn = document.querySelector('.btn-new');
rollBtn = document.querySelector('.btn-roll');
holdBtn = document.querySelector('.btn-hold');
dice1 = document.querySelector('.dice1Top');
dice2 = document.querySelector('.dice2Top');
inputValue = document.getElementById('inputValue'); // Set threshold dynamically
currentScore0 = document.getElementById('current-0');
currentScore1 = document.getElementById('current-1');
globalScore0 = document.getElementById('score-0');
globalScore1 = document.getElementById('score-1');
player0Panel = document.querySelector('.player-0-panel');
player1Panel = document.querySelector('.player-1-panel');
frm = document.getElementById('frm');

/*---------------------------- VALIDATE THRESHOLD VALUE -------------------------------------------*/
function validateInput ()
{
    if (inputValue.value == '' || inputValue.value < 20 || inputValue.value > 1000)
    {
        alert('Invalid Threshold. Please enter a value between 20 and 1000');
        window.setTimeout(function () { 
            inputValue.focus(); 
        }, 0); 
    }
}

/*-------------------------------------FUNCTIONS----------------------------------------------------*/

const initialise = ()=>{
    dice1.style.display = 'none';
    dice2.style.display = 'none';
    isGamePlaying = true;
    scores = [0,0];
    activePlayer = 0;
    currentScoreSum = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    globalScore0.textContent = 0;
    globalScore1.textContent = 0;
    player0Panel.classList.remove('active');
    player1Panel.classList.remove('active');
    player0Panel.classList.add('active');
    player0Panel.classList.remove('winner');
    player1Panel.classList.remove('winner');
    
    name0.textContent = 'Jericson';
    name1.textContent = 'Regina';

}

const rollDice = ()=>{   

    //START RANDOMIZE DICE AND SUM
    randomNum1 = Math.floor(Math.random()*6)+1; // Randomize numbers from 0 to 6 // In case the result is 0, add +1
    randomNum2 = Math.floor(Math.random()*6)+1;
    randomNum = randomNum1 + randomNum2;
    //END RANDOMIZE DICE AND SUM

    dice1.style.display = "block";
    dice2.style.display = "block";
    dice1.src = "dice-"+randomNum1+".png";
    dice2.src = "dice-"+randomNum2+".png";
}

const changeRoles = ()=>{
    if(activePlayer === 1){
        activePlayer = 0;
        player1Panel.classList.toggle('active');
        player0Panel.classList.toggle('active');
        currentScore1.textContent = 0;
    }
    else{
        activePlayer = 1;
        player0Panel.classList.toggle('active');
        player1Panel.classList.toggle('active');
        currentScore0.textContent = 0;
    }

    dice1.style.display = 'none';
    dice2.style.display = 'none';
    
}

/*---------------------------------------------Program Flow Starts here----------------------------*/
initialise(inputValue.value);


rollBtn.addEventListener('click', ()=>{

    if(isGamePlaying){
        rollDice();
        console.log(randomNum1, randomNum2);
        if(randomNum1 === 1 || randomNum2 === 1){
            //START ROLLING DICE RESULT IS 1 - MP3
            var x = document.createElement("AUDIO");

            if (x.canPlayType("audio/mpeg")) {
                x.setAttribute("src","dice-result1.mp3");
            } else {
                x.setAttribute("src","dice-result1.ogg");
            }

            x.autoplay=true;
            document.body.appendChild(x);
            //END ROLLING DICE RESULT IS 1 - MP3

            changeRoles();
            currentScoreSum = 0; 
        }
        else {
            //START ROLLING DICE MP3
            var x = document.createElement("AUDIO");

            if (x.canPlayType("audio/mpeg")) {
                x.setAttribute("src","dice-roll.mp3");
            } else {
                x.setAttribute("src","dice-roll.ogg");
            }

            x.autoplay=true;
            document.body.appendChild(x);
            //END ROLLING DICE MP3

            currentScoreSum += randomNum;
            activePlayer ? currentScore1.textContent = currentScoreSum : currentScore0.textContent = currentScoreSum;
        }
    }
});

holdBtn.addEventListener('click', ()=>{

    if(isGamePlaying){

        //START HOLD MP3
        var x = document.createElement("AUDIO");

        if (x.canPlayType("audio/mpeg")) {
            x.setAttribute("src","hold.mp3");
        } else {
            x.setAttribute("src","hold.ogg");
        }

        x.autoplay=true;
        document.body.appendChild(x);
        //END HOLD MP3

        scores[activePlayer] += currentScoreSum;
        if(activePlayer === 1) globalScore1.textContent = scores[activePlayer];
        else globalScore0.textContent = scores[activePlayer];
        currentScoreSum = 0;

        if(scores[activePlayer] >= inputValue.value){
            //CREATE A DOM FOR PIG IMAGE
            const image = document.createElement('img');
            image.src  = 'pig-winner.gif';
            image.classList.add("image");
            document.querySelector('.player-'+activePlayer+'-panel').appendChild(image)

            //START HOLD MP3
            var y = document.createElement("AUDIO");

            if (y.canPlayType("audio/mpeg")) {
                y.setAttribute("src","winner.mp3");
            } else {
                y.setAttribute("src","winner.ogg");
            }

            y.autoplay=true;
            document.body.appendChild(y);
            //END HOLD MP3

            document.querySelector('.player-'+activePlayer+'-panel').classList.add("winner");
            document.getElementById('name-'+activePlayer).textContent = 'WINNER !';
            document.getElementsByClassName('player-current-box')[activePlayer].style.visibility = 'hidden';
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove("active")
            dice1.style.display = 'none';
            dice2.style.display = 'none';
            isGamePlaying = false;
        }
        else
            changeRoles();
    }
});

newGameBtn.addEventListener('click', ()=>{
    initialise();
    location.reload(); //REFRESH WEB BROWSER
    return false;
});







