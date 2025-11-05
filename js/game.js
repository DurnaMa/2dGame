let canvas;
let world;
let keyboard = new Keyboard();
let gameOverScreen;

function init() {
  canvas = document.getElementById('canvas');

  // Erst GameOverScreen initialisieren
  window.gameOverScreen = new GameOverScreen();
  gameOverScreen = window.gameOverScreen;

  // Dann World initialisieren
  window.world = new World(canvas, keyboard);
  world = window.world;

  // Click-Event für den Retry-Button
  canvas.addEventListener('click', handleClick);

  // Add click event listener for retry button
  canvas.addEventListener('click', handleClick);

}

function handleClick(event) {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  if (gameOverScreen.isRetryButtonClicked(clickX, clickY)) {
    restartGame();
  }
}

function restartGame() {
  gameOverScreen.hide();
  world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 88) {
    keyboard.X = true;
  }


});

window.addEventListener('keyup', (e) => {
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 88) {
    keyboard.X = false;
  }
});
