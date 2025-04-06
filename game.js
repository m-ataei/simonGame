// Farbdefinition und Variableninitialisierung
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []; // Speichert das vom Spiel generierte Muster
var userClickedPattern = []; // Speichert das vom Benutzer geklickte Muster

var started = false; // Gibt an, ob das Spiel gestartet wurde
var level = 0; // Aktueller Spiellevel

// Spielstart bei Tastendruck
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Behandlung von Button-Klicks
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1); // Überprüfung der Benutzerantwort
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      // Wenn der Benutzer das aktuelle Muster korrekt wiederholt hat
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      // Behandlung falscher Antwort
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Drücke eine Taste zum Neustart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

// Generiert die nächste Sequenz
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Animation beim Drücken eines Buttons
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Sound abspielen
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Spiel zurücksetzen
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}