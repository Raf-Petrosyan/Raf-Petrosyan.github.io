const board = document.getElementById("game-board");
const logo = document.getElementById("logo");
const level2 = document.getElementById("logo1");
const level = document.getElementById("LEVEL")
const score = document.getElementById("score");
const highScoreText = document.getElementById("highscore");
var myAudio = document.getElementById("myAudio");
const level1 = document.getElementById("LEVEL1")
function togglePlay() {
  return myAudio.paused ? myAudio.play() : myAudio.pause();
};
let snake = [{ y: 10, x: 10 }];
let gridsize = 20;
let food = generateFood();
let gameSpeed = 500;
let direction = "right";
let gameintervalID;
let isgamestart = "false";
let islevelstart = "false";
let highScore = 0; 
level1.style.display = "none"
level2.style.display = "none";
let music = new Audio("./aa.mp3")
// let music1 = new Audio("./ss.mp3")
let music2 = new Audio("./dd.mp3")
function draw() {
  board.innerHTML = "";
  drawsnake();
  drawfood();
  // leveltwo();
  updateScore();
}
function drawsnake() {
  snake.forEach((segment) => {
    const snakeElement = createElement("div", "snake");
    setposition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}
function createElement(tag, classname) {
  const element = document.createElement(tag);
  element.className = classname;
  return element;
}
function setposition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

function drawfood() {
  let foodElement = createElement("div", "food");
  setposition(foodElement, food);
  board.appendChild(foodElement);
}
function generateFood() {
  let x = Math.floor(Math.random() * gridsize) + 1;
  let y = Math.floor(Math.random() * gridsize) + 1;
  return { x, y };
}

function move() {
  let head = { ...snake[0] };
  // console.log(head);
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }
  snake.unshift(head);
  //   snake.pop();
  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    music.play()
    clearInterval(gameintervalID);
    gameintervalID = setInterval(() => {
      move();
      checkColision();
      draw();
    }, gameSpeed);
  } else {
    snake.pop();
  }
} // draw();
// move()

// setInterval(()=>{
// move()
// draw()

// },100)

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") direction = "up";
      break;
    case "ArrowDown":
      if (direction !== "up") direction = "down";
      break;
    case "ArrowLeft":
      if (direction !== "right") direction = "left";
      break;
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
  }
});
function StartGame() {

  isgamestart = true;
  level1.style.display = "none"
  level.style.display = "block"
  level2.style.display = "none"
  
  gameintervalID = setInterval(() => {
    move();
    checkColision();
    draw();

  }, gameSpeed);
}
function Startnewlevel() {
  gameSpeed -= 400

  islevelstart = true;
  level.style.display = "none"
  level1.style.display = "block"

  gameintervalID = setInterval(() => {
    move();
    checkColision();
    draw();
  }, gameSpeed);
}

function handlekeyPress(event) {
  if (event.code === "Space" || event.key === " ") {
    logo.style.display = "none";
    StartGame();
  } else if (event.code === "Enter" || event.key === "Enter") {
    level2.style.display = "none";
    Startnewlevel();
  }
}

document.addEventListener("keydown", handlekeyPress);

function checkColision() {
  let head = { ...snake[0] };
  if (head.x > gridsize || head.x < 1 || head.y > gridsize || head.y < 1) {
    resetGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) [resetGame()];
  }
}
function resetGame() {
  if (snake.length - 1 >= 1) {

    nextlevelgame();
updateHighScore();

  } else if (islevelstart = true) {
    stopGame();
    music2.play();
  }

  else {
    updateHighScore();
    stopGame();
    logo.style.display = "block"

  }

  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = "right";
  gameSpeed = 500;
  updateScore();
}
function stopGame() {
  clearInterval(gameintervalID);
  isgamestart = false;
  logo.style.display = "block";

}

function nextlevelgame() {
  clearInterval(gameintervalID);
  islevelstart = false;
  level2.style.display = "block";

}

function updateScore() {
  const currentScore = snake.length - 1;
  score.textContent = currentScore.toString().padStart(3, "0");
}

function updateHighScore() {
  const currentScore = snake.length - 1;
  if (currentScore > highScore) {
    highScore = currentScore;
  }

  highScoreText.textContent = highScore.toString().padStart(3, "0");
}
