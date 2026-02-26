let globalIntervals = [];
let globalTimeouts = [];
let soundManager;

/**
 * Sets a setInterval and tracks it globally.
 * @param {Function} fn - The function to execute
 * @param {number} time - The interval time in milliseconds
 * @param {string} [description=''] - Optional description for debugging
 * @returns {number} The interval ID
 */
function setTrackedInterval(fn, time, description = '') {
  const id = setInterval(fn, time);
  globalIntervals.push({ id, description });
  return id;
}

/**
 * Sets a setTimeout and tracks it globally.
 * @param {Function} fn - The function to execute
 * @param {number} time - The timeout time in milliseconds
 * @param {string} [description=''] - Optional description for debugging
 * @returns {number} The timeout ID
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

/**
 * Initializes the game canvas.
 */
function initCanvas() {
  canvas = document.getElementById('canvas');
}

/**
 * Initializes audio and sound manager.
 */
function initAudio() {
  const savedMuted = localStorage.getItem('fp.soundMuted') === 'true';
  if (typeof SoundManagerClass !== 'undefined') {
    SoundManagerClass.setMuted(savedMuted);
  }

  soundManager = new SoundManagerClass();
  soundManager.addSound(
    'fantasy-space-atmosphere',
    Config.SOUNDS.ATMOSPHERE.SRC,
    Config.SOUNDS.ATMOSPHERE.VOLUME,
    Config.SOUNDS.ATMOSPHERE.LOOP
  );
  window.soundManager = soundManager;
}

/**
 * Initializes the UI screens.
 */
function initUI() {
  startScreen = new StartScreen(canvas);
  gameOverScreen = new GameOverScreen(canvas);
  winScreen = new WinScreen(canvas);

  if (soundManager && typeof soundManager.initButton === 'function') {
    soundManager.initButton(canvas);
    if (typeof soundManager.setButtonMuted === 'function') {
      soundManager.setButtonMuted(SoundManagerClass.isMuted());
    }
  }
}

/**
 * Initializes the world and canvas event listeners.
 */
function initWorld() {
  window.world = new World(canvas, keyboard);
  world = window.world;
}

/**
 * Initializes all event listeners.
 */
function initEventListeners() {
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('pointerdown', handleClick);
  initButtonPressEvents();
}

/**
 * Main initialization function for the game.
 */
function init() {
  initLevel1();
  initCanvas();
  initAudio();
  initWorld();
  initUI();
  initEventListeners();
  animateUI();
}

/**
 * Central animation loop for both game and UI.
 */
function animateUI() {
  if (world) {
    world.draw();
  }

  if (gameStarted && !gameEnded) {
    checkGameState();
  }

  drawScreens();
  drawSoundButton();
  requestAnimationFrame(animateUI);
}

/**
 * Draws the appropriate screen (start, game over, or win).
 */
function drawScreens() {
  if (!gameStarted && startScreen && startScreen.isVisible) {
    startScreen.draw();
  } else if (gameEnded) {
    if (gameOverScreen && gameOverScreen.isVisible) {
      gameOverScreen.draw();
    } else if (winScreen && winScreen.isVisible) {
      winScreen.draw();
    }
  }
}

/**
 * Draws the sound button on the canvas.
 */
function drawSoundButton() {
  if (soundManager && typeof soundManager.drawButton === 'function') {
    soundManager.drawButton();
  }
}

/**
 * Checks the current game state and determines win/lose conditions.
 */
function checkGameState() {
  if (world.isGameOver()) {
    endGame(gameOverScreen);
  } else if (world.isWin()) {
    endGame(winScreen);
  }
}

/**
 * Ends the game and displays the specified end screen.
 * @param {EndScreen} screen - The screen to display (GameOverScreen or WinScreen)
 */
function endGame(screen) {
  gameEnded = true;
  world.stopGame();
  screen.show();
}

/**
 * Converts client coordinates to canvas coordinates.
 * @param {number} clientX - The client X coordinate
 * @param {number} clientY - The client Y coordinate
 * @returns {Object} Object with canvasX and canvasY properties
 */
function getCanvasCoordinates(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  return {
    canvasX: ((clientX - rect.left) / rect.width) * canvas.width,
    canvasY: ((clientY - rect.top) / rect.height) * canvas.height,
  };
}

/**
 * Updates hover state for all screen buttons.
 * @param {number} x - The X coordinate
 * @param {number} y - The Y coordinate
 */
function updateScreenHover(x, y) {
  if (!gameStarted && startScreen && startScreen.isVisible) {
    startScreen.checkHover(x, y);
    canvas.style.cursor = startScreen.isHovered ? 'pointer' : 'default';
  } else if (gameEnded) {
    if (gameOverScreen && gameOverScreen.isVisible) {
      gameOverScreen.checkHover(x, y);
      canvas.style.cursor = gameOverScreen.isHovered ? 'pointer' : 'default';
    } else if (winScreen && winScreen.isVisible) {
      winScreen.checkHover(x, y);
      canvas.style.cursor = winScreen.isHovered ? 'pointer' : 'default';
    }
  }
}

/**
 * Handles mouse move events for hover effects.
 * @param {MouseEvent} event - The mouse move event
 */
function handleMouseMove(event) {
  const { canvasX, canvasY } = getCanvasCoordinates(event.clientX, event.clientY);

  if (soundManager && typeof soundManager.checkButtonHover === 'function') {
    soundManager.checkButtonHover(canvasX, canvasY);
  }

  updateScreenHover(canvasX, canvasY);

  if (soundManager && typeof soundManager.isButtonHovered === 'function' && soundManager.isButtonHovered()) {
    canvas.style.cursor = 'pointer';
  }
}

/**
 * Handles sound button click.
 * @param {number} x - The X coordinate of the click
 * @param {number} y - The Y coordinate of the click
 */
function handleSoundButtonClick(x, y) {
  if (soundManager && typeof soundManager.isButtonClicked === 'function' && soundManager.isButtonClicked(x, y)) {
    SoundManagerClass.toggleMuted();
    if (typeof soundManager.setButtonMuted === 'function') {
      soundManager.setButtonMuted(SoundManagerClass.isMuted());
    }
    localStorage.setItem('fp.soundMuted', SoundManagerClass.isMuted());
    return true;
  }
  return false;
}

/**
 * Handles screen button clicks.
 * @param {number} x - The X coordinate of the click
 * @param {number} y - The Y coordinate of the click
 */
function handleScreenButtonClick(x, y) {
  if (!gameStarted && startScreen && startScreen.isVisible) {
    if (startScreen.isButtonClicked(x, y)) {
      startGame();
    }
  } else if (gameEnded) {
    if (
      (gameOverScreen && gameOverScreen.isVisible && gameOverScreen.isButtonClicked(x, y)) ||
      (winScreen && winScreen.isVisible && winScreen.isButtonClicked(x, y))
    ) {
      restartGame();
    }
  }
}

/**
 * Handles pointer/click events on the canvas.
 * @param {PointerEvent} event - The click event
 */
function handleClick(event) {
  const { canvasX, canvasY } = getCanvasCoordinates(event.clientX, event.clientY);

  if (handleSoundButtonClick(canvasX, canvasY)) {
    return;
  }

  handleScreenButtonClick(canvasX, canvasY);
}

/**
 * Starts the game and hides the start screen.
 */
function startGame() {
  gameStarted = true;
  gameEnded = false;
  startScreen.hide();
  gameOverScreen.hide();
  winScreen.hide();
  canvas.style.cursor = 'default';
  soundManager.playSound('fantasy-space-atmosphere');
}

/**
 * Restarts the game after game over or win.
 */
function restartGame() {
  gameStarted = false;
  gameEnded = false;
  gameOverScreen.hide();
  winScreen.hide();
  startScreen.show();

  initLevel1();
  window.world = new World(canvas, keyboard);
  world = window.world;
}

/**
 * Sets up a single touch control button.
 * @param {string} id - The button element ID
 * @param {string} key - The keyboard property to control
 */
function setupControl(id, key) {
  const btn = document.getElementById(id);
  if (!btn) return;

  const setKey = (value) => {
    keyboard[key] = value;
  };

  btn.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') {
      e.preventDefault();
      setKey(true);
    }
  });

  btn.addEventListener('pointerup', (e) => {
    if (e.pointerType === 'touch') {
      e.preventDefault();
      setKey(false);
    }
  });

  btn.addEventListener('pointerleave', (e) => {
    if (e.pointerType === 'touch') {
      e.preventDefault();
      setKey(false);
    }
  });

  btn.addEventListener(
    'touchstart',
    (e) => {
      e.preventDefault();
      setKey(true);
    },
    { passive: false }
  );

  btn.addEventListener(
    'touchend',
    (e) => {
      e.preventDefault();
      setKey(false);
    },
    { passive: false }
  );
}

/**
 * Initializes touch controls for mobile buttons.
 */
function initButtonPressEvents() {
  setupControl('btnLeft', 'LEFT');
  setupControl('btnRight', 'RIGHT');
  setupControl('btnJump', 'SPACE');
  setupControl('btnAttack', 'X');
}

/**
 * Handles keyboard down events.
 */
function handleKeyDown(e) {
  if (e.keyCode === Config.KEYS.MUTE) {
    SoundManagerClass.toggleMuted();
    if (soundManager && typeof soundManager.setButtonMuted === 'function') {
      soundManager.setButtonMuted(SoundManagerClass.isMuted());
    }
    localStorage.setItem('fp.soundMuted', SoundManagerClass.isMuted());
  }

  if (e.keyCode === Config.KEYS.ARROW_UP) keyboard.UP = true;
  if (e.keyCode === Config.KEYS.ARROW_RIGHT) keyboard.RIGHT = true;
  if (e.keyCode === Config.KEYS.ARROW_DOWN) keyboard.DOWN = true;
  if (e.keyCode === Config.KEYS.ARROW_LEFT) keyboard.LEFT = true;
  if (e.keyCode === Config.KEYS.SPACE) keyboard.SPACE = true;
  if (e.keyCode === Config.KEYS.X) keyboard.X = true;
}

/**
 * Handles keyboard up events.
 */
function handleKeyUp(e) {
  if (e.keyCode === Config.KEYS.ARROW_UP) keyboard.UP = false;
  if (e.keyCode === Config.KEYS.ARROW_RIGHT) keyboard.RIGHT = false;
  if (e.keyCode === Config.KEYS.ARROW_DOWN) keyboard.DOWN = false;
  if (e.keyCode === Config.KEYS.ARROW_LEFT) keyboard.LEFT = false;
  if (e.keyCode === Config.KEYS.SPACE) keyboard.SPACE = false;
  if (e.keyCode === Config.KEYS.X) keyboard.X = false;
}

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);
