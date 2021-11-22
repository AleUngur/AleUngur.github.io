var letters = [];
var lives = 10;

function addWord() {
  var word = document.getElementById("word-input").value;
  word = word.toUpperCase();
  document.getElementById("word-input").value = "";
  letters = word.split("");
}

function displayLines() {
  for (var i = 0; i < letters.length; ++i) {
    var col = document.createElement("div");
    col.className = "col-1 my-1 col-lines";
    col.innerText = "____";
    col.id = i;
    document.getElementById("word-lines").appendChild(col);
  }
}

var numberOfLives = document.createElement("h3");
function displayLives() {
  var life = document.getElementById("lives");
  numberOfLives.innerText = lives;
  numberOfLives.setAttribute("color", "white");
  life.append(numberOfLives);
}

var lettersGuessed = 0;
function guessLetter(letterChosen) {
  var mess = (document.getElementById("mess").innerText = "");
  var counter = 0;
  for (var i = 0; i < letters.length; ++i) {
    //looking for the letter in the word
    if (letterChosen.toUpperCase() == letters[i]) {
      var spaceForLetter = document.getElementById(i);
      if (spaceForLetter.innerText == "____") {
        spaceForLetter.innerText = letters[i];
        ++lettersGuessed;
      } else {
        var mess = document.getElementById("mess");
        mess.innerText = "You already guessed this letter!";
      }
      if (lettersGuessed == letters.length) {
        displayMessage();
      }
    } else {
      ++counter;
    }
  }
  if (counter == letters.length) {
    shortenLife();
  }
}

function shortenLife() {
  if (lives > 1) {
    --lives;
    displayLives();
  } else if (lives == 1) {
    --lives;
    displayLives();
    displayMessage();
  }
}

function displayMessage() {
  var nrLives = document.getElementById("lives");
  if (lives == 0) {
    nrLives.innerHTML = "You've been hanged!";
  } else if (lives > 0) {
    nrLives.innerHTML = "You won!";
  }
}
