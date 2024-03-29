/// begin work on word guess game
// declare variables
var textWins = document.getElementById("wins"),
    textLosses = document.getElementById("losses"),
    textGuesses = document.getElementById("guesses"),
    textLettersUsed = document.getElementById("letters-used"),
    textWord = document.getElementById("word"),
    textInfo = document.getElementById("info"),
    textLastWord = document.getElementById("last-word");

// word array
var words = ["eorzea", "lalafell", "hume", "miqo'te", "roegadyn", "hrothgar",
             "au ra", "viera", "warrior", "paladin", "dark knight", "gunbreaker",
             "white mage", "astrologian", "scholar", "black mage", "summoner",
             "red mage", "monk", "ninja", "samurai", "dragoon", "bard", "machinist",
             "dancer", "miner", "botanist", "fisher", "alchemist", "armorer",
             "blacksmith", "carpenter", "culinarian", "goldsmith", "leatherworker",
             "weaver"];
             
// initialize game on first load
var guessWord = randomWord(words);
var arrayWord = mkObjArr(guessWord);
var charArray = ["\xa0"];
textWins.textContent = 0;
textLosses.textContent = 0;
textLettersUsed.textContent = "\xa0";
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
    charArray = ["\xa0"];
    textInfo.textContent = "\xa0";
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

        // set obj g to true so it ignores special characters
        if (word[w] == "'" || word[w] == " ") {
            newObj["l"] = word[w];
            newObj["g"] = false;
        }
        else {
            newObj["l"] = word[w];
            newObj["g"] = false;
            newWord.push(newObj);
        }
    }
    return newWord;
}

// score function
function score() {
    textWins.textContent = parseInt(textWins.textContent) + 1; // update wins
    textLastWord.textContent = guessWord;
    newWord(); // generate a new word
    // let user know score increased
    textInfo.textContent = "Congratulations! You guessed all the letters to the word ";
}

// lose function
function lose() {
    textLosses.textContent = parseInt(textLosses.textContent) + 1; // update losses
    newWord(); // generate a new word
    // let user know they ran out of guesses
    textInfo.textContent = "Awww... You ran out of guesses. ";
    textLastWord.textContent = "Better luck next time!";
}

// check if key pressed is in the alphabet
function keyAlpha(key) {
    // alphabet array!
    var alpha = ["abcdefghijklmnopqrstuvwxyz"];
    var boolKey = false;

    // loop to check if key pressed is an alphabet
    for (var k = 0; k < alpha[0].length; k++) {
        if (key == alpha[0][k]) {
            boolKey = true;
        }
    }

    // if key pressed is alphabet return true
    if (boolKey) {
        return true;
    }
    // return false if it's not an alphabet
    else {
        return false;
    }
}

// checks if key pressed is a character in the word
function checkWord(key, word) {
    var boolKey = false;
    if (checkChar(key)) {
        // check whether key matches a character in the word if it hasn't already been used
        for (var k = 0; k < word.length; k++) {
            if (key == word[k].l) {
                word[k].g = true;
                boolKey = true;
                textWord.textContent = refreshWord(word);
            }
        }
    }
    // if the letter has been used, let the user know
    else {
        textInfo.textContent = "You've already guessed that letter!";
        boolKey = true;
    }
    // key pressed hasn't been used and doesn't match a character in the word
    // call updateGuesses() to reduce remaining guesses
    if (!(boolKey)) {
        updateGuesses();
        textInfo.textContent = "\xa0";
    }
}

// did you win?
function checkWin () {
    var win = true;
    // checks if every letter has been guessed
    if (parseInt(textGuesses.textContent) > 0) {
        for (var i = 0; i < arrayWord.length; i++) {
            if (arrayWord[i].g === false) {
                win = false;
            }
        }
    }
    // if remaining guesses = 0 call lose function
    else {
        win = false;
        lose();
    }
    // if above loop doesn't return false then call score function
    if (win) {
        score();
    }
}

// update amount of guesses if incorrect key is pressed
function updateGuesses() {
    textGuesses.textContent = parseInt(textGuesses.textContent) - 1;
}

// check if letter has already been used // if not, add to list
function checkChar(key) {
    var boolKey = false;
    // loop to check every character in charArray
    for (var k = 0; k < charArray.length; k++) {
        console.log(charArray[k]);
        // if the key pressed matches a character in charArray set boolKey to true
        if (key === charArray[k]) {
            boolKey = true;
        }
    }

    // return false because the character was already guessed
    if (boolKey) {
        return false;
    }
    // everything is fine
    else {
        // add guessed character to charArray
        charArray.push(key);
        return true;
    }
}

// update letters used
function updateLettersUsed() {
    textLettersUsed.textContent = "\xa0"; // reset so it doesn't stack
    textLastWord.textContent = ""; // wipe last word
    // update textLettersUsed.textContent with guessed letters
    for (var i = 1; i < charArray.length; i++) {
        textLettersUsed.textContent = textLettersUsed.textContent + charArray[i] + ", ";
    }
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
    updateLettersUsed(); // refresh letters used textcontent
    checkWin(); // check if user won
}