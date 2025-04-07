// Farbdefinition und Variableninitialisierung
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Änderung: Spielstart ohne Sound beim ersten Klick
$(".btn").click(function() {
  if (!started) {
    var clickedColor = $(this).attr("id");
    // Nur Animation, kein Sound
    animatePress(clickedColor);
    
    $("#level-title").text("Get ready...");
    
    setTimeout(function() {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }, 1500);
    
    return;
  }
  
  // Normale Spielinteraktion mit Sound
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

// Rest des Codes bleibt gleich...
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Klicke auf eine Farbe zum Neustart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

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

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Verbesserte animatePress-Funktion mit intensiveren Effekten
function animatePress(currentColor) {
  var $button = $("#" + currentColor);
  
  // Intensivere Animationseffekte
  $button.addClass("pressed");
  $button.css({
    "box-shadow": "0 0 50px 15px rgba(255,255,255,0.8)", // Stärkerer und größerer Glow
    "transform": "scale(0.9)", // Deutlichere Schrumpfung
    "filter": "brightness(1.5)", // Erhöhte Helligkeit
    "border-color": "white" // Weißer Rand für Kontrast
  });
  
  setTimeout(function () {
    $button.removeClass("pressed");
    $button.css({
      "box-shadow": "0 5px 15px rgba(0,0,0,0.3)",
      "transform": "scale(1)",
      "filter": "brightness(1)",
      "border-color": "black"
    });
  }, 50); // Etwas längere Animationsdauer
}

// Verbesserte nextSequence für konsistente Effekte
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Verstärkte Animation für Programm-Aktivierung
  var $button = $("#" + randomChosenColour);
  $button.fadeTo(100, 0.3).fadeTo(100, 1).fadeTo(100, 0.3).fadeTo(100, 1, function() {
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
  });
}