let canvas;
let world;
let keyboard = new Keyboard();
let gameOverScreen;

function init() {
  canvas = document.getElementById('canvas');

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
}

function restartGame() {
  gameOverScreen.hide();
  world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {
  if (e.keyCode == GAME_CONFIG.KEYS.ARROW_UP) {
    keyboard.UP = true;
  }

  if (e.keyCode == GAME_CONFIG.KEYS.ARROW_RIGHT) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == GAME_CONFIG.KEYS.ARROW_DOWN) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == GAME_CONFIG.KEYS.ARROW_LEFT) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == GAME_CONFIG.KEYS.SPACE) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == GAME_CONFIG.KEYS.X) {
    keyboard.X = true;
  }


});

window.addEventListener('keyup', (e) => {
  if (e.keyCode == GAME_CONFIG.KEYS.ARROW_UP) {
    keyboard.UP = false;
  }

  if (e.keyCode == GAME_CONFIG.KEYS.ARROW_RIGHT) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == GAME_CONFIG.KEYS.ARROW_DOWN) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == GAME_CONFIG.KEYS.ARROW_LEFT) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == GAME_CONFIG.KEYS.SPACE) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == GAME_CONFIG.KEYS.X) {
    keyboard.X = false;
  }
});
