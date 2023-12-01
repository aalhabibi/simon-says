var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var gameOn = false;

var redSound = new Audio("./sounds/red.mp3");
var blueSound = new Audio("./sounds/blue.mp3");
var greenSound = new Audio("./sounds/green.mp3");
var yellowSound = new Audio("./sounds/yellow.mp3");
var wrongSound = new Audio("./sounds/wrong.mp3");

document.addEventListener("keydown", function startGame(event) {
  if (gameOn === false) {
    document.getElementById("level-title").innerHTML = "Level " + level;
    nextSequence();

    gameOn = true;
  }
});

for (let index = 0; index < buttonColors.length; index++) {
  document
    .getElementById(buttonColors[index])
    .addEventListener("click", function (event) {
      buttonPressAnimation(this.id);
      playSound(buttonColors[index]);
      userClickedColor = this.id;
      userClickedPattern.push(userClickedColor);
      checkAnswer(userClickedPattern.length - 1);
    });
}

function checkAnswer(lvl) {
  if (gamePattern[lvl] === userClickedPattern[lvl]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    wrongSound.play();
    document.getElementsByTagName("body")[0].classList.add("game-over");
    setTimeout(() => {
      document.getElementsByTagName("body")[0].classList.remove("game-over");
    }, 200);
    document.getElementById("level-title").innerHTML =
      "Game Over, Press Any Key to Restart";
    startOver();
  }
}

/*function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").innerHTML = "Level " + level;
  var randomnum = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColors[randomnum]);
  playSound(buttonColors[randomnum]);
  buttonAnimation(buttonColors[randomnum]);
}*/

function showSequence(i) {
  setTimeout(function () {
    playSound(gamePattern[i]);
    buttonAnimation(gamePattern[i]);
  }, 700 * i);
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").innerHTML = "Level " + level;
  var randomnum = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColors[randomnum]);
  for (let i = 0; i < gamePattern.length; i++) {
    showSequence(i);
  }
}

function buttonPressAnimation(key) {
  document.getElementById(key).classList.add("pressed");
  setTimeout(() => {
    document.getElementById(key).classList.remove("pressed");
  }, 100);
}

function buttonAnimation(key) {
  document.getElementById(key).classList.add("pressed");
  setTimeout(() => {
    document.getElementById(key).classList.remove("pressed");
  }, 500);
}

function playSound(name) {
  switch (name) {
    case "red":
      redSound.play();
      break;
    case "blue":
      blueSound.play();
      break;
    case "green":
      greenSound.play();
      break;
    case "yellow":
      yellowSound.play();
      break;

    default:
      break;
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameOn = false;
}
