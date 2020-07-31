let buttonColors = ["red", "blue", "green", "yellow", "white"];
// clicked colors go in
let userClickedPattern = [];
// random colors go in
let gamePattern = [];

function nextSequence() {
  let rnum = Math.floor(Math.random() * 5);
  let randomChosenColor = buttonColors[rnum];
  gamePattern.push(randomChosenColor);

  // random color blink
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
  // random color sound played
  playSound(randomChosenColor);
}

function clickColor() {
  userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  // clicked color sound played
  playSound(userChosenColor);
}

function playSound(name) {
  let audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

function init() {
  nextSequence();
  $(".btn").click(clickColor);
}

init();
