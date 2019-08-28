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
textWord.textContent = randomWord(words);
textGuesses.textContent = calcGuesses(textWord.textContent);

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