/// begin work on word guess game
// declare variables
var textWins = document.getElementById("wins"),
    textLosses = document.getElementById("losses"),
    textGuesses = document.getElementById("guesses"),
    textLettersUsed = document.getElementById("letters-used"),
    textWord = document.getElementById("word");

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
textLettersUsed.textContent = "";
var newWord = randomWord(words);
textWord.textContent = refreshWord(newWord);
textGuesses.textContent = calcGuesses(newWord);

/// begin list of functions
// pick a random word stored in an array
function randomWord (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// calculate amount of guesses based on word length
function calcGuesses (word) {
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
function refreshWord (word) {
    var toHide = arrWord(word);
    var newMessage = "";
    for (var w = 0; w < toHide.length; w++) {
        if (toHide[w].l === " ") {
            newMessage = newMessage + "\xa0" + " ";
        }
        else if (toHide[w].l === "'") {
            newMessage = newMessage + "' ";
        }
        else if (toHide[w].g === false) {
            newMessage = newMessage + "_ ";
        }
        else {
            newMessage = newMessage + toHide[w].l + " ";
        }
    }
    return newMessage;
}

// turns a word into an array of objects -- to be used for guessing individual letters
function arrWord (word) {
    var newWord = [];
    for (var w = 0; w < word.length; w++) {
    var newObj = {};
        newObj["l"] = word[w];
        newObj["g"] = false;
        newWord.push(newObj);
    }
    console.log(newWord);
    return newWord;
}