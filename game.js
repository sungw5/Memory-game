////////////////////////////////////////////////////////
////////////////////// Variables ///////////////////////
////////////////////////////////////////////////////////

let buttonColors = ["red", "blue", "green", "yellow", "white"];
// clicked colors go in
let userClickedPattern = [];
// random colors go in
let gamePattern = [];

let level = 0;
let gameStarted = false;

const WRONG = "wrong";
////////////////////////////////////////////////////////
////////////////////// Functions ///////////////////////
////////////////////////////////////////////////////////

/////////////////// nextSequence ///////////////////////
function nextSequence() {
  // Reset the user clicked pattern
  userClickedPattern = [];
  // level up
  level++;
  $("#level-title").html("Level " + level);

  let rnum = Math.floor(Math.random() * 5);
  let randomChosenColor = buttonColors[rnum];
  //  random color -> game pattern
  gamePattern.push(randomChosenColor);

  // random color blink
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor); // random color sound played
  animatePress(randomChosenColor); // add pressed animation
}
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

function clickColor() {
  userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor); // clicked color sound played
  animatePress(userChosenColor); // add pressed animation

  // check latest clicked is correct answer
  checkAnswer(userClickedPattern.length - 1);
}

// EFFECTS
function playSound(name) {
  let audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}
function animatePress(currentColor) {
  $(`.${currentColor}`).addClass("pressed");
  //   remove class after 100 ms
  setTimeout(function () {
    $(`.${currentColor}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  // correct click
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
      setTimeout(function () {
        $("<h2>SUCCESS!</h2>")
          .addClass("success")
          .prependTo("body")
          .slideToggle(2000)
          .fadeOut(1000);
      }, 200);
    }
  }
  //   Game over
  else {
    $("body").addClass("game-over");
    playSound(WRONG);
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    // Reset the game
    startOver();
  }
}

function startOver() {
  // Reset
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

////////////////////////////////////////////////////////
///////////////////////// MAIN /////////////////////////
////////////////////////////////////////////////////////

function init() {
  // Start the game by pressing a button
  $(document).keypress(function () {
    if (!gameStarted) {
      gameStarted = true;
      $("#level-title").html("Level " + level);
      nextSequence();
    }
  });

  $(".btn").click(clickColor);
}

init();
