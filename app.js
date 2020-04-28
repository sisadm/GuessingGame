const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const ul = document.querySelector('#phrase ul');
const tries = document.querySelectorAll('.tries img');
const h2 = document.querySelector('#overlay h2');
const gameStart = document.querySelector('#overlay a');



const phrases = [
    'good luck',
    'so far so good',
    'like riding a bicycle',
    'speak of the devil',
    'break a leg'
]


let missed = 0;

// overlay hide if click the Start Game
overlay.addEventListener('click', (e) => {
    if(e.target.innerText === 'Start Game' || e.target.innerText === 'Play Again') {
        overlay.style.display = "none";
    }
})

// random choose from array 
function getRandomPhraseAsArray(arr) {
    let randomNum = Math.floor(Math.random() * arr.length);
    let randomPhrases = phrases[randomNum];
    let characters = randomPhrases.split('');
    return characters;    
}

// create li to each letter
function addPhrasetoDisplay(arr) {
    for(let i = 0; i <arr.length; i++) {
        let li = document.createElement('li');
        li.textContent = arr[i];
        if(li.textContent === ' ') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
        ul.appendChild(li);
    }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhrasetoDisplay(phraseArray); 

function checkWin() {
    const show = document.getElementsByClassName('show');
    const letter = document.getElementsByClassName('letter');
    
    if(show.length === letter.length) {
        h2.innerHTML = "You Win Well Done!";
        gameStart.innerHTML ="Play Again";
        overlay.style.display= "";
        overlay.className = 'win';
        reset();
    }  
    if(missed === 5) {
        h2.innerHTML = "Sadly You Lose.";
        gameStart.innerHTML ="Play Again";
        overlay.style.display= "";
        overlay.className = 'lose';
        reset();
    }
}

function checkLetter(button) {
    let letter = document.getElementsByClassName('letter');
    let match = null;
    for(let i = 0; i < letter.length; i++) {
        if(letter[i].textContent === button) {
            letter[i].classList.add('show');
            match = letter[i].textContent;
        } 
    }
    return match;
}

qwerty.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
        e.target.classList.add('chosen');
        e.target.disabled = true;
        let letterFound = checkLetter(e.target.innerHTML);

        if(letterFound === null) {
            tries[missed].src ='images/lostHeart.png';
            missed = missed + 1;
        }
    }
    checkWin()
})


// reset game 

function reset() {
    ul.innerHTML = '';  
    const buttons = document.querySelectorAll('button');
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('chosen');
        buttons[i].disabled = false;
    }
    for(let i = 0; i < 5; i++) {
        tries[i].src = 'images/liveHeart.png';
    }
    
    missed = 0;

    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhrasetoDisplay(phraseArray); 
}


