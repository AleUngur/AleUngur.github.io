var snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
];
var gameboard = document.getElementById("gameboard");
var gameboard_ctx = gameboard.getContext("2d");
var changing_direction;
var score = 0;
var move_x = 10;
var move_y = 0;
var dot_x;
var dot_y;
document.addEventListener("keydown", changeDirection);

// startGame() function called repeatedly to keep the game running
function startGame() {
  if (gameOver()) return;
  //add a slight delay between each call of the functions
  setTimeout(function repeat() {
    changing_direction = false;
    //remove all previous positions of the snake
    clearBoard();
    drawDots();
    moveSnake();
    drawSnake();
    startGame();
  }, 100);
}

//draw a border around the canvas
function clearBoard() {
  gameboard_ctx.fillStyle = "#eff1f3";
  gameboard_ctx.strokestyle = "#1a535c";
  gameboard_ctx.fillRect(0, 0, gameboard.width, gameboard.height);
  gameboard_ctx.strokeRect(0, 0, gameboard.width, gameboard.height);
}

//class for drawing snake and food dots
class Circle {
  constructor(x, y, radius, radians, fill) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.radians = radians;
    this.fill = fill;

    this.render = function (gameboard_ctx) {
      gameboard_ctx.beginPath();
      gameboard_ctx.arc(this.x, this.y, this.radius, 0, this.radians, false);
      gameboard_ctx.fillStyle = fill;
      gameboard_ctx.fill();
    };
  }
}

// Draw the snake on the canvas
function drawSnake() {
  snake.forEach(function drawSnakeBody(bodyPart) {
    var circle = new Circle(bodyPart.x, bodyPart.y, 5, Math.PI * 2, "#5c9ead");
    circle.render(gameboard_ctx);
  });
}

function moveSnake() {
  // Create the new Snake's head
  var head = { x: snake[0].x + move_x, y: snake[0].y + move_y };
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  if (snake[0].x == dot_x && snake[0].y == dot_y) {
    score += 10;
    document.getElementById("score").innerHTML = score;
    generateDots();
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}

function changeDirection(event) {
  var LEFT_KEY = 37;
  var RIGHT_KEY = 39;
  var UP_KEY = 38;
  var DOWN_KEY = 40;
  if (changing_direction) return;
  changing_direction = true;
  var keyPressed = event.keyCode;
  // Prevent the snake from reversing
  if (move_y == -10) {
    var direction_Up = true;
  } else if (move_y == 10) {
    var direction_Down = true;
  } else if (move_x == 10) {
    var direction_Right = true;
  } else if (move_x == -10) {
    var direction_Left = true;
  }
  //changing direction of the snake
  if (keyPressed == LEFT_KEY && !direction_Right) {
    move_x = -10;
    move_y = 0;
  }
  if (keyPressed == UP_KEY && !direction_Down) {
    move_x = 0;
    move_y = -10;
  }
  if (keyPressed == RIGHT_KEY && !direction_Left) {
    move_x = 10;
    move_y = 0;
  }
  if (keyPressed == DOWN_KEY && !direction_Up) {
    move_x = 0;
    move_y = 10;
  }
}

function generateDots() {
  dot_x = randomDots(0, gameboard.width - 10);
  dot_y = randomDots(0, gameboard.height - 10);
  // if the new dot location is where the snake currently is, generate a new dot location
  for (bodyPart in snake) {
    if (bodyPart.x == dot_x && bodyPart.y == dot_y) {
      generateDots();
    }
  }
}

function drawDots() {
  var circle = new Circle(dot_x, dot_y, 5, Math.PI * 2, "#e39774");
  circle.render(gameboard_ctx);
}

function randomDots(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function gameOver() {
  for (var i = 2; i < snake.length; i++) {
    //the head hit a body part
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      return true;
    }
  }
  if (
    /*hit left border*/ snake[0].x < 0 ||
    /*hit right border*/ snake[0].x > gameboard.width - 10 ||
    /*hit top border*/ snake[0].y < 0 ||
    /*hit down border*/ snake[0].y > gameboard.height - 10
  ) {
    return true;
  }
}

function newGame() {
  location.reload();
}
