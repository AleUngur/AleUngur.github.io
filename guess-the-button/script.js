function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createButtons() {
  var input_number = document.getElementById("numberField").value; //number of buttons to be created
  var random_number = generateRandomNumber(1, input_number); //winning number
  //console.log("Winning number: " + random_number);
  var container = document.getElementsByClassName("container")[0];
  for (var i = 1; i <= input_number; ++i) {
    let button = document.createElement("button");
    button.className = "btn btn-success my-3 mx-1";
    button.innerHTML = i;
    button.type = "button";
    button.id = i;
    button.style = "width: 50px; height: 50px";
    container.appendChild(button);
    if (random_number == i) {
      button.onclick = function () {
        alert("Congratulations! You guessed right");
      };
    } else {
      button.onclick = function () {
        alert("You guessed wrong");
      };
    }
  }
  var p = document.createElement("p");
  p.innerHTML =
    "If you want to try again please reload the page and repeat the process";
  container.appendChild(p);
}
