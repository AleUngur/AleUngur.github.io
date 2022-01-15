"use strict"; //With strict mode, you can not use undeclared variables
//Delayed execution with browser event:
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#gameboard").addEventListener("click", markField);
  var current = 0,
    players = ["X", "O"],
    winner,
    finished, // game-over flag;
    fields = document.querySelectorAll("#gameboard button"), // the squares
    hint = document.querySelector("#hint");

  function markField(e) {
    var field = e.target;
    field.setAttribute("aria-label", players[current]);
    field.setAttribute("disabled", "disabled");
    current = 1 - current;
    hint.innerText = "Next is: " + players[current];
    checkIfCompleted();
  }

  function checkIfCompleted() {
    var fields = document.querySelectorAll("#gameboard button"), // fields is the list of our fields
      full = true; // we assume that all cells have been used
    // all fields marked?
    for (var i = 0; i < fields.length; i++) {
      if (!fields[i].hasAttribute("disabled")) {
        full = false;
      }
    }
    // if full then game over, if not full then not yet
    if (full) {
      full = true;
    }
    // determine winners
    for (i = 0; i < 3; i++) {
      // 3 vertical
      if (
        fields[0 + i].getAttribute("aria-label") != "" &&
        fields[0 + i].getAttribute("aria-label") ==
          fields[3 + i].getAttribute("aria-label") &&
        fields[3 + i].getAttribute("aria-label") ==
          fields[6 + i].getAttribute("aria-label")
      ) {
        // we have a winner!
        winner = fields[0 + i].getAttribute("aria-label");
        highlightCells([fields[i], fields[3 + i], fields[6 + i]]);
      }
      // 3 horizontal
      if (
        fields[i * 3].getAttribute("aria-label") != "" &&
        fields[i * 3].getAttribute("aria-label") ==
          fields[i * 3 + 1].getAttribute("aria-label") &&
        fields[i * 3 + 1].getAttribute("aria-label") ==
          fields[i * 3 + 2].getAttribute("aria-label")
      ) {
        // we have a winner!
        winner = fields[i * 3].getAttribute("aria-label");
        highlightCells([fields[i * 3], fields[i * 3 + 1], fields[i * 3 + 2]]);
      }
    }
    // diagonally top left to bottom right
    if (
      fields[0].getAttribute("aria-label") != "" &&
      fields[0].getAttribute("aria-label") ==
        fields[4].getAttribute("aria-label") &&
      fields[4].getAttribute("aria-label") ==
        fields[8].getAttribute("aria-label")
    ) {
      winner = fields[0].getAttribute("aria-label");
      highlightCells([fields[0], fields[4], fields[8]]);
    }
    // diagonally top right to bottom left
    if (
      fields[2].getAttribute("aria-label") != "" &&
      fields[2].getAttribute("aria-label") ==
        fields[4].getAttribute("aria-label") &&
      fields[4].getAttribute("aria-label") ==
        fields[6].getAttribute("aria-label")
    ) {
      winner = fields[2].getAttribute("aria-label");
      highlightCells([fields[2], fields[4], fields[6]]);
    }
    // Game over?
    if (full || winner) {
      finished = true;
      if (winner == "X" || winner == "O") {
        hint.innerText = "The game is over because player " + winner + " won!";
        hint.className = "success";
      } else {
        // Game over because all fields are occupied
        hint.innerText =
          "The game ends in a draw because all fields are occupied.";
      }
      //new game?
      var newGame = confirm("New game?", "");
      if (newGame == true) {
        location.reload();
        return false;
      }
    }
  }

  function highlightCells(cells) {
    for (var i = 0; i < 3; i++) {
      cells[i].classList.add("highlighted");
    }
  }
});
