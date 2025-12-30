let canvas;
let world;
let keyboard = new Keyboard();
let gameOverScreen;
let startScreen;
let gameStarted = false;

function init() {
  initLevel1();
  canvas = document.getElementById('canvas');

  // Initialize World first (so it's visible in background)
  window.world = new World(canvas, keyboard);
  world = window.world;

  // Then show start screen on top
  startScreen = new StartScreen(canvas);

  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('click', handleClick);

  // Start animation loop for start screen
  animateStartScreen();
}

function animateStartScreen() {
  if (!gameStarted && startScreen && startScreen.isVisible) {
    startScreen.draw();
    requestAnimationFrame(animateStartScreen);
  }
}

function handleMouseMove(event) {
  if (!gameStarted && startScreen && startScreen.isVisible) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    startScreen.checkHover(mouseX, mouseY);
    startScreen.draw();

    // Change cursor style
    if (startScreen.isHovered) {
      canvas.style.cursor = 'pointer';
    } else {
      canvas.style.cursor = 'default';
    }
  }
}

function handleClick(event) {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  if (!gameStarted && startScreen && startScreen.isVisible) {
    if (startScreen.isButtonClicked(clickX, clickY)) {
      startGame();
    }
  }
}

function startGame() {
  gameStarted = true;
  startScreen.hide();
  canvas.style.cursor = 'default';
  // World is already running in background
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
