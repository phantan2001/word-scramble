const wordText = document.querySelector(".word");
let hintClick = document.querySelector(".hint");
const hintText = document.querySelector(".solution span");
const refreshBtn = document.querySelector(".refresh-word");
const checkwordBtn = document.querySelector(".check-word");
let inputField = document.getElementById("enter-word");
let scoreEl = document.querySelector(".score span");
let timeText = document.querySelector(".time b");

let correctWord, timer;


const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            timeText.innerText = maxTime;
        }
        if(maxTime <= 10) {
            timeText.style.color = 'red';
        }
        if(maxTime === 0) {
            clearInterval(timer);
            alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
            initGame();
        }
    }, 1000)
}

const initGame = () => {
    initTimer(45);
    let randomObj  = words[Math.floor(Math.random() * words.length)];
    let wordArray =  randomObj.word.split("");

    for(let i = wordArray.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]]
    }

    hintClick.addEventListener("click", function() {
        hintText.innerText = randomObj.hint;
    })
    wordText.innerText = wordArray.join("");
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    console.log(randomObj);
}

initGame();
let score = 0;
scoreEl.innerText = score;
const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
    if(!userWord) return alert("Please enter a word check");
    if(userWord !== correctWord) {
        return alert(`Oops! ${userWord} is not a correct word`);
    } else {
        alert(`Congratulations! ${userWord.toUpperCase()} is a correct word`);
        
        scoreEl.innerText = ++score;
        initGame();
    }
}

refreshBtn.addEventListener("click", function () {
    initGame();
})
checkwordBtn.addEventListener("click", function() {
    checkWord();
})