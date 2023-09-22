'use strict';


/*
    1) Understanding the problem
    - Guess a random number from 1 to 20
    - You win, when you guess the correct number
    - You loose, when you lost your 20 times try

    2) Break up into sub-problem
    - Secret number gonna generate for every game between 1 to 20
    - Make sure the user enter a valid number
    - You have 20 times to try to guess the secret number
    - If you guessed it, you win
        - Check the highscore every win, if more then the old one replace it
    - If NOT you lose, and try again 
*/

const secretNumberEl = document.querySelector('.number');
const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');

const inputGuess = document.querySelector('.guess');
const btnCheck = document.querySelector('.check');
const btnAgain = document.querySelector('.again');
const btnResetHighScore = document.querySelector('.reset');
const startOver = document.querySelector('.start-over');

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let isWin = false;

const getHighScore = function() {
    let highscore = localStorage.getItem('highscore');

    if(!highscore) {
        localStorage.setItem('highscore', 0);
        return Number(localStorage.getItem('highscore'));

    } else {
        return Number(highscore);
    }
}
let highscore = getHighScore();
highscoreEl.textContent = highscore;

const winGame = function(guess, message) {
    isWin = true;
    secretNumberEl.textContent = guess;
    messageEl.textContent = message;    
    
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if(score > highscore) {
        localStorage.setItem('highscore', score);
        highscoreEl.textContent = getHighScore();
    }
}

const tryAgain = function(message) {
    score--;
    scoreEl.textContent = score;
    messageEl.textContent = message
}

const playAgain = function(message='Start guessing...') {
    isWin = false;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    score = 20;

    inputGuess.value = '';
    scoreEl.textContent = score;
    secretNumberEl.textContent = '?';
    messageEl.textContent = message;

    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
}


// Listen for the check - guess click
btnCheck.addEventListener('click', function() {
    if(!isWin) {
        const guess = Number(inputGuess.value);

        if(guess) {
            if(guess === secretNumber) {
                winGame(guess, '🎉 Correct Number!');

            } else if(guess !== secretNumber && score > 1) {
                tryAgain(guess > secretNumber ? '📈 Too high!' : '💹 Too low!');

            } else {
                // playAgain('💥 You lost the game!');
                document.querySelector('.overlay').classList.remove('hidden');
            }

        } else {
            document.querySelector('.message').textContent = '⛔ No Number!';
        }
    }
});

// Listen for the start over click
startOver.addEventListener('click', function(e) {
    if(!e.target.parentElement.classList.contains('hidden')) {
        e.target.parentElement.classList.add('hidden');
        playAgain();
    }
});

// Listen for the play again click
btnAgain.addEventListener('click', () => playAgain('Start guessing...'));

// Listen for the reset highscore click
btnResetHighScore.addEventListener('click', function() {
    localStorage.setItem('highscore', 0);
    highscoreEl.textContent = getHighScore();
});