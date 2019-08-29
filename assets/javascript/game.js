/// begin work on word guess game
// declare variables
var textWins = document.getElementById("wins"),
    textLosses = document.getElementById("losses"),
    textGuesses = document.getElementById("guesses"),
    textLettersUsed = document.getElementById("letters-used"),
    textWord = document.getElementById("word"),
    textInfo = document.getElementById("info");

// word array
var words = ["eorzea", "lalafell", "hume", "miqo'te", "roegadyn", "hrothgar",
             "au ra", "viera", "warrior", "paladin", "dark knight", "gunbreaker",
             "white mage", "astrologian", "scholar", "black mage", "summoner",
             "red mage", "monk", "ninja", "samurai", "dragoon", "bard", "machinist",
             "dancer", "miner", "botanist", "fisher", "alchemist", "armorer",
             "blacksmith", "carpenter", "culinarian", "goldsmith", "leatherworker",
             "weaver"];
             
// initialize game on first load
textWins.textContent = 0;
textLosses.textContent = 0;
textLettersUsed.textContent = "\xa0";
var guessWord = randomWord(words);
var arrayWord = mkObjArr(guessWord);
textWord.textContent = refreshWord(arrayWord);
textGuesses.textContent = calcGuesses(guessWord);
textInfo.textContent = "\xa0";

/// begin list of functions

// get a new word
function newWord () {
    guessWord = randomWord(words);
    arrayWord = mkObjArr(guessWord);
    textWord.textContent = refreshWord(arrayWord);
    textGuesses.textContent = calcGuesses(guessWord);
}

// pick a random word stored in an array
function randomWord(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// calculate amount of guesses based on word length
function calcGuesses(word) {
    var guesses = word.length -1;
    for (var i = 0; i < word.length; i++) {
        // ignore special characters and spaces
        if (word[i] === " " || word[i] === "'") {
            guesses--;
        }
    }
    return guesses;
}

// hides the word in document
function refreshWord(word) {
    var newMessage = "";
    for (var w = 0; w < word.length; w++) {
        if (word[w].l === " ") {
            newMessage = newMessage + "\xa0" + " ";
        }
        else if (word[w].l === "'") {
            newMessage = newMessage + "' ";
        }
        else if (word[w].g === false) {
            newMessage = newMessage + "_ ";
        }
        else {
            newMessage = newMessage + word[w].l + " ";
        }
    }
    textInfo.textContent = "\xa0"; // clear info message
    return newMessage;
}

// turns a word into an array of objects -- to be used for guessing individual letters
function mkObjArr(word) {
    var newWord = [];
    for (var w = 0; w < word.length; w++) {
    var newObj = {};
        newObj["l"] = word[w];
        newObj["g"] = false;
        newWord.push(newObj);
    }
    return newWord;
}

// score function
function score() {
    textWins.textContent = parseInt(textWins.textContent) + 1;
    newWord();
    textInfo.textContent = "Congratulations! You guessed all the letters.";
}

// lose function
function lose() {
    textLosses.textContent = parseInt(textLosses.textContent) + 1;
    newWord();
    textInfo.textContent = "Awww... You didn't get them all. Try again!";
}

// check if key pressed is in the alphabet
function keyAlpha(key) {
    var alpha = ["abcdefghijklmnopqrstuvwxyz"];
    var boolKey = false;

    for (var k = 0; k < alpha[0].length; k++) {
        if (key == alpha[0][k]) {
            boolKey = true;
        }
    }

    if (boolKey) {
        return true;
    }
    else {
        return false;
    }
}

// checks if key pressed is a character in the word
function checkWord(key, word) {
    var boolKey = false;
    if (checkChar) {
        for (var k = 0; k < word.length; k++) {
            if (key == word[k].l) {
                word[k].g = true;
                textWord.textContent = refreshWord(word);
                boolKey = true;
            }
        }
    }
    else {
        textInfo.textContent = "You've already guessed that letter!";
    }

    if (!(boolKey)) {
        updateGuesses();
    }
    else {
        checkWin();
    }
}

// did you win?
function checkWin () {
    var win = true;
    for (var i = 0; i < arrayWord.length; i++) {
        if (arrayWord[i].g === false) {
            win = false;
        }
    }
    if (win) {
        score();
    }
}

// update amount of guesses if incorrect key is pressed
function updateGuesses() {
    textGuesses.textContent = parseInt(textGuesses.textContent) - 1;
    if (textGuesses.textContent == 0) {
        lose();
    } 
}

// check if letter has already been used // if not, add to list
function checkChar (key) {

}

/// playing the game by typing alpha characters
document.onkeyup = function(event) {
    var key = event.key;
    key = key.toLowerCase(); // make sure caps count

    // check if key pressed is in the alphabet -- ignore the rest
    if (keyAlpha(key)) {
        // check if key pressed is a character in the word
        checkWord(key, arrayWord);
    }
}