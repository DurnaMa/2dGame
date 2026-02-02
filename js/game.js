let globalIntervals = [];
let globalTimeouts = [];

/**
 * Sets a setInterval and tracks it globally.
 * @param {Function} fn - The function to execute.
 * @param {number} time - The interval time in ms.
 * @param {string} [description=''] - Optional description for debugging.
 * @returns {number} The interval ID.
 */
function setTrackedInterval(fn, time, description = '') {
  const id = setInterval(fn, time);
  globalIntervals.push({ id, description });
  return id;
}

/**
 * Sets a setTimeout and tracks it globally.
 * @param {Function} fn - The function to execute.
 * @param {number} time - The timeout time in ms.
 * @param {string} [description=''] - Optional description for debugging.
 * @returns {number} The timeout ID.
 */
function setTrackedTimeout(fn, time, description = '') {
  const id = setTimeout(fn, time);
  globalTimeouts.push({ id, description });
  return id;
}

/**
 * Stops all tracked intervals and timeouts.
 */
function stopAllIntervals() {
  globalIntervals.forEach((interval) => clearInterval(interval.id));
  globalTimeouts.forEach((timeout) => clearTimeout(timeout.id));
  globalIntervals = [];
  globalTimeouts = [];
}

let canvas;
let world;
let keyboard = new Keyboard();
let startScreen;
let gameOverScreen;
let winScreen;
let gameStarted = false;
let gameEnded = false;

function init() {
  initLevel1();
  canvas = document.getElementById('canvas');

  // Initialize World first (so it's visible in background)
  window.world = new World(canvas, keyboard);
  world = window.world;

  // Then show start screen on top
  startScreen = new StartScreen(canvas);
  gameOverScreen = new GameOverScreen(canvas);
  winScreen = new WinScreen(canvas);

  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('click', handleClick);
  canvas.addEventListener('pointerdown', handleClick); // Support touch/modern pointer input

  // Start animation loop for UI
  animateUI();
  
  // Initialize mobile touch controls
  initButtonPressEvents();
}

/**
 * Central animation loop for both game and UI.
 */
function animateUI() {
  if (world) {
    world.draw(); // Draws game world (clears canvas first)
  }

  if (gameStarted && !gameEnded) {
    checkGameState();
  }

  // Draw UI layers if visible (on top of world)
  if (!gameStarted && startScreen && startScreen.isVisible) {
    startScreen.draw();
  } else if (gameEnded) {
    if (gameOverScreen && gameOverScreen.isVisible) {
      gameOverScreen.draw();
    } else if (winScreen && winScreen.isVisible) {
      winScreen.draw();
    }
  }

  requestAnimationFrame(animateUI);
}

function checkGameState() {
  if (world.isGameOver()) {
    endGame(gameOverScreen);
  } else if (world.isWin()) {
    endGame(winScreen);
  }
}

function endGame(screen) {
  gameEnded = true;
  world.stopGame();
  screen.show();
}

function handleMouseMove(event) {
  const rect = canvas.getBoundingClientRect();
  // Scale to internal canvas coordinates (960x540)
  const mouseX = ((event.clientX - rect.left) / rect.width) * canvas.width;
  const mouseY = ((event.clientY - rect.top) / rect.height) * canvas.height;

  if (!gameStarted && startScreen && startScreen.isVisible) {
    startScreen.checkHover(mouseX, mouseY);
    canvas.style.cursor = startScreen.isHovered ? 'pointer' : 'default';
  } else if (gameEnded) {
    if (gameOverScreen && gameOverScreen.isVisible) {
      gameOverScreen.checkHover(mouseX, mouseY);
      canvas.style.cursor = gameOverScreen.isHovered ? 'pointer' : 'default';
    } else if (winScreen && winScreen.isVisible) {
      winScreen.checkHover(mouseX, mouseY);
      canvas.style.cursor = winScreen.isHovered ? 'pointer' : 'default';
    }
  }
}

function handleClick(event) {
  const rect = canvas.getBoundingClientRect();
  // Scale to internal canvas coordinates (960x540)
  const clickX = ((event.clientX - rect.left) / rect.width) * canvas.width;
  const clickY = ((event.clientY - rect.top) / rect.height) * canvas.height;

  if (!gameStarted && startScreen && startScreen.isVisible) {
    if (startScreen.isButtonClicked(clickX, clickY)) {
      startGame();
    }
  } else if (gameEnded) {
    if (
      (gameOverScreen && gameOverScreen.isVisible && gameOverScreen.isButtonClicked(clickX, clickY)) ||
      (winScreen && winScreen.isVisible && winScreen.isButtonClicked(clickX, clickY))
    ) {
      restartGame();
    }
  }
}

function startGame() {
  gameStarted = true;
  gameEnded = false;
  startScreen.hide();
  gameOverScreen.hide();
  winScreen.hide();
  canvas.style.cursor = 'default';
}

function restartGame() {
  gameStarted = false;
  gameEnded = false;
  gameOverScreen.hide();
  winScreen.hide();
  startScreen.show();

  // Re-initialize level and world
  initLevel1();
  window.world = new World(canvas, keyboard);
  world = window.world;
}

// mobile touch controls
function initButtonPressEvents() {
  const setupControl = (id, key) => {
    const btn = document.getElementById(id);
    if (!btn) return;

    // Use Pointer Events for universal support (Touch + Mouse)
    btn.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'touch') return; // Only process touch input
      e.preventDefault();
      keyboard[key] = true;
    });

    btn.addEventListener('pointerup', (e) => {
      if (e.pointerType !== 'touch') return;
      e.preventDefault();
      keyboard[key] = false;
    });

    btn.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'touch') return;
      e.preventDefault();
      keyboard[key] = false;
    });

    // Fallback for older touch devices
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      keyboard[key] = true;
    }, { passive: false });

    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      keyboard[key] = false;
    }, { passive: false });
  };

  setupControl('btnLeft', 'LEFT');
  setupControl('btnRight', 'RIGHT');
  setupControl('btnJump', 'SPACE');
  setupControl('btnAttack', 'X');
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
