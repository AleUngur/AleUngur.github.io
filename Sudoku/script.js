var number; //number from [1,9] chosen by player
var matrix = []; //random generated matrix with gaps to be filled by player
var frequency = Array(10).fill(0); //frequency array for checking the matrix
var nrEmptyCells; //number of cells to be empty, set by player

window.onload = createGameboard();

function startGame() {
  nrEmptyCells = document.getElementById("emptyCellsNumber").value;
  displayEmptyMatrix();
  selectCell();
  selectNumber();
}

function createGameboard() {
  //adding the buttons in the gameboard
  var gameboard = document.getElementById("gameboard");
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var button = document.createElement("button");
      button.id = i + "-" + j;
      button.className = "white";
      if (i == 2 || i == 5) {
        setAttribute(button, "border-bottom", "4px solid #8e7dbe");
      }
      if (j == 2 || j == 5) {
        setAttribute(button, "border-right", "4px solid #8e7dbe");
      }
      if (
        (i == 2 && j == 2) ||
        (i == 5 && j == 5) ||
        (i == 2 && j == 5) ||
        (i == 5 && j == 2)
      ) {
        setAttribute(button, "border-right", "4px solid #8e7dbe");
        setAttribute(button, "border-bottom", "4px solid #8e7dbe");
      }
      gameboard.appendChild(button);
    }
  }
}

function setAttribute(element, key, value) {
  element.style[key] = value;
}

function selectCell() {
  //changing the color of the selected cell
  var buttons = document.querySelectorAll(".gameboard button");
  for (btn of buttons) {
    btn.onclick = function () {
      colorToBlue(this);
    };
  }
}

function colorToBlue(btn) {
  //changing the class name to color the cell
  var blueButton = document.querySelectorAll(".blue")[0];
  if (btn.className == "white") {
    if (blueButton) {
      blueButton.className = "white";
    }
    btn.className = "blue";
  }
}

function selectNumber() {
  //when clicking on a number
  var numbers = document.querySelectorAll(".numbers button");
  for (btn of numbers) {
    btn.onclick = function () {
      var blueButton = document.querySelector(".blue");
      if (!blueButton) {
        //if a cell isn't selected when clicking a number it displays a message
        document.getElementById("msg").innerHTML =
          "Select a cell on the gameboard first!";
      }
      numberClicked(this.id);
      addNumberOnGameboard(blueButton, number);
      addNumberInMatrix(blueButton, number);
      displayMessage(blueButton);
      gameOver();
    };
  }
}

function addNumberOnGameboard(btnClicked, nr) {
  //put in gameboard the number chosen
  btnClicked.innerHTML = nr;
}

function numberClicked(idNrClicked) {
  number = document.getElementById(idNrClicked).innerHTML;
  return number;
}

function newGame() {
  location.reload();
}

function addNumberInMatrix(btn, nr) {
  var i = btn.id.charAt(0),
    j = btn.id.charAt(2);
  matrix[i][j] = nr;
  //console.log("number ", nr, "in matrix at [", i, "][", j, "]");
  //console.log("matrix after adding a number: ", matrix);
}

function resetFrequency() {
  frequency = Array(10).fill(0);
}

function checkInMatrix(line, col) {
  //checking for the element added to not have doubles on line, column and 3x3 square
  var ok = 1;
  //iterating through the elements on the line to check for doubles
  for (var j = 0; j < 9 && ok == 1; ++j) {
    if (matrix[line][j] != 0) {
      ++frequency[matrix[line][j]];
    }
    if (frequency[matrix[line][j]] > 1) {
      ok = 0;
    }
  }
  resetFrequency();
  //iterating through the elements on the column to check for doubles
  for (var i = 0; i < 9 && ok == 1; ++i) {
    if (matrix[i][col] != 0) {
      ++frequency[matrix[i][col]];
    }
    if (frequency[matrix[i][col]] > 1) {
      ok = 0;
    }
  }
  resetFrequency();
  //selecting the 3x3 square to look into
  var x1, y1, x2, y2;
  if (line >= 0 && line <= 2) {
    x1 = 0;
    x2 = 2;
  } else if (line >= 3 && line <= 5) {
    x1 = 3;
    x2 = 5;
  } else if (line >= 6 && line <= 8) {
    x1 = 6;
    x2 = 8;
  }
  if (col >= 0 && col <= 2) {
    y1 = 0;
    y2 = 2;
  } else if (col >= 3 && col <= 5) {
    y1 = 3;
    y2 = 5;
  } else if (col >= 6 && col <= 8) {
    y1 = 6;
    y2 = 8;
  }
  //iterating through the elements of the square to check for doubles
  for (var i = x1; i <= x2 && ok == 1; ++i) {
    for (var j = y1; j <= y2 && ok == 1; ++j) {
      if (matrix[i][j] != 0) {
        ++frequency[matrix[i][j]];
      }
      if (frequency[matrix[i][j]] > 1) {
        ok = 0;
      }
    }
  }
  resetFrequency();
  if (ok == 1) {
    //console.log("corect");
    return true; //the element is placed correctly
  } else {
    //console.log("incorect");
    return false; //the element is placed incorrectly
  }
}

function deleteNumber() {
  var blueButton = document.querySelector(".blue");
  var line = blueButton.id.charAt(0),
    col = blueButton.id.charAt(2);
  /*console.log(
    "number ",
    blueButton.innerHTML,
    "will be deleted from [",
    line,
    "][",
    col,
    "]"
  );*/
  blueButton.innerHTML = ""; //deleting element from gameboard
  matrix[line][col] = 0; //deleting element from matrix
  //console.log("matrix after delete: ", matrix);
  displayMessage();
}

function displayMessage(blueButton) {
  var msg = document.getElementById("msg");
  var i = blueButton.id.charAt(0),
    j = blueButton.id.charAt(2);
  console.log("checking number ", blueButton.innerHTML, "in matrix");
  if (!checkInMatrix(i, j)) {
    //console.log("wrong");
    msg.innerHTML = "Wrong!";
  } else {
    //console.log("correct");
    msg.innerHTML = "Correct!";
  }
}

function generateMatrix() {
  var v = generateArray();
  matrix[0] = v;
  matrix[1] = shiftArray(matrix[0], 3);
  matrix[2] = shiftArray(matrix[1], 3);
  matrix[3] = shiftArray(matrix[2], 1);
  matrix[4] = shiftArray(matrix[3], 3);
  matrix[5] = shiftArray(matrix[4], 3);
  matrix[6] = shiftArray(matrix[5], 1);
  matrix[7] = shiftArray(matrix[6], 3);
  matrix[8] = shiftArray(matrix[7], 3);
  //console.log("genrated matrix: ", matrix);
  return matrix;
}

function generateArray() {
  var min = 1;
  var max = 9;
  var stop = 9;
  var numbers = [];
  for (let i = 0; i < stop; i++) {
    var n = Math.floor(Math.random() * max) + min;
    var check = numbers.includes(n);
    if (check === false) {
      numbers.push(n);
    } else {
      while (check === true) {
        n = Math.floor(Math.random() * max) + min;
        check = numbers.includes(n);
        if (check === false) {
          numbers.push(n);
        }
      }
    }
  }
  return numbers;
}

function shiftArray(arr, nr) {
  arr = arr.map((_, b) => arr[(b + nr) % arr.length]); // shift left by nr
  return arr;
}

function deleteRandomNumbers(amountToHide) {
  matrix = generateMatrix();
  for (let i = 0; i < amountToHide; ) {
    let randomX = Math.floor(Math.random() * 8);
    let randomY = Math.floor(Math.random() * 8);
    if (matrix[randomX][randomY] != 0) {
      matrix[randomX][randomY] = 0;
      i++;
    }
  }
  return matrix;
}

function displayEmptyMatrix() {
  matrix = deleteRandomNumbers(nrEmptyCells);
  var buttons = document.querySelectorAll(".gameboard button");
  for (btn of buttons) {
    var line = btn.id.charAt(0);
    var col = btn.id.charAt(2);
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (matrix[i][j] != 0 && line == i && col == j) {
          btn.innerHTML = matrix[i][j];
          setAttribute(btn, "color", "#8e7dbe");
          setAttribute(btn, "backgroundColor", "#f1e3d3");
        }
      }
    }
  }
}

function isMatrixFull() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (matrix[i][j] == 0) {
        return false; //the matrix is not full
      }
    }
  }
  return true; //the matrix is full
}

function isMatrixCorrect() {
  var ok = 1;
  //checking for doubles on lines
  for (var i = 0; i < 9 && ok == 1; ++i) {
    for (var j = 0; j < 9 && ok == 1; ++j) {
      ++frequency[matrix[i][j]];
      if (frequency[matrix[i][j]] > 1) {
        ok = 0;
      }
    }
    resetFrequency();
  }
  //checking for doubles on columns
  for (var j = 0; j < 9 && ok == 1; ++j) {
    for (var i = 1; i < 9 && ok == 1; ++i) {
      ++frequency[matrix[i][j]];
      if (frequency[matrix[i][j]] > 1) {
        ok = 0;
      }
    }
    resetFrequency();
  }
  //checking for doubles on each 3x3 square
  var x1, y1, x2, y2;
  x1 = 0;
  x2 = 2;
  y1 = 0;
  y2 = 2;
  while (x1 <= 6 && x2 <= 8) {
    while (y1 <= 6 && y2 <= 8) {
      for (var i = x1; i <= x2 && ok == 1; ++i) {
        for (var j = y1; j <= y2 && ok == 1; ++j) {
          ++frequency[matrix[i][j]];
          if (frequency[matrix[i][j]] > 1) {
            ok = 0;
          }
        }
      }
      resetFrequency();
      y1 = y2 + 3;
      y2 += 3;
    }
    x1 = x2 + 3;
    x2 += 3;
  }
  if (ok == 1) return true;
  //the matrix is solved correctly
  else return false; //the matrix is solved incorrectly
}

function gameOver() {
  var msg = document.getElementById("msg");
  if (isMatrixFull()) {
    if (isMatrixCorrect()) {
      msg.innerHTML = "Congradulations! You solved the puzzle!";
    } else if (!isMatrixCorrect()) {
      msg.innerHTML =
        "There seems to be a mistake on the board. Check thoroughly and make the needed changes. You can do it!";
      setAttribute(msg, "font-size", "20px");
    }
  }
}
