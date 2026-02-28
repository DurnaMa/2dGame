let globalIntervals = [];
let globalTimeouts = [];
let soundManager;

/**
 * Sets a setInterval and tracks it globally.
 * @param {Function} fn - Callback to execute.
 * @param {number} time - Interval delay in ms.
 * @param {string} description - Label for debugging.
 * @returns {number} The interval ID.
 */
function setTrackedInterval(fn, time, description = '') {
  const id = setInterval(fn, time);
  globalIntervals.push({ id, description });
  return id;
}

/**
 * Sets a setTimeout and tracks it globally.
 * @param {Function} fn - Callback to execute.
 * @param {number} time - Timeout delay in ms.
 * @param {string} description - Label for debugging.
 * @returns {number} The timeout ID.
 */
function setTrackedTimeout(fn, time, description = '') {
  const id = setTimeout(fn, time);
  globalTimeouts.push({ id, description });
  return id;
}

/** Clears and resets all tracked intervals and timeouts. */
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

/** Initializes the game canvas element. */
function initCanvas() {
  canvas = document.getElementById('canvas');
}

/** Initializes audio, loads the mute preference, and sets up the sound manager. */
function initAudio() {
  const savedMuted = localStorage.getItem('fp.soundMuted') === 'true';
  if (typeof SoundManagerClass !== 'undefined') SoundManagerClass.setMuted(savedMuted);
  soundManager = new SoundManagerClass();
  soundManager.addSound(
    'fantasy-space-atmosphere',
    Config.SOUNDS.ATMOSPHERE.SRC,
    Config.SOUNDS.ATMOSPHERE.VOLUME,
    Config.SOUNDS.ATMOSPHERE.LOOP
  );
  window.soundManager = soundManager;
}

/** Initializes the UI screens and the sound button. */
function initUI() {
  startScreen = new StartScreen(canvas);
  gameOverScreen = new GameOverScreen(canvas);
  winScreen = new WinScreen(canvas);
  if (soundManager && typeof soundManager.initButton === 'function') {
    soundManager.initButton(canvas);
    if (typeof soundManager.setButtonMuted === 'function') soundManager.setButtonMuted(SoundManagerClass.isMuted());
  }
}

/** Initializes the world instance and attaches it to the window. */
function initWorld() {
  window.world = new World(canvas, keyboard);
  world = window.world;
}

/** Binds all canvas event listeners. */
function initEventListeners() {
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('pointerdown', handleClick);
  initButtonPressEvents();
}

/** Main initialization function for the game. */
function init() {
  initLevel1();
  initCanvas();
  initAudio();
  initWorld();
  initUI();
  initEventListeners();
  animateUI();
}

/** Central animation loop for both game rendering and UI overlays. */
function animateUI() {
  if (world) world.draw();
  if (gameStarted && !gameEnded) checkGameState();
  drawScreens();
  drawSoundButton();
  requestAnimationFrame(animateUI);
}

/** Draws the appropriate overlay screen based on game state. */
function drawScreens() {
  if (!gameStarted && startScreen && startScreen.isVisible) {
    startScreen.draw();
  } else if (gameEnded) {
    if (gameOverScreen && gameOverScreen.isVisible) gameOverScreen.draw();
    else if (winScreen && winScreen.isVisible) winScreen.draw();
  }
}

/** Renders the mute/unmute sound button onto the canvas. */
function drawSoundButton() {
  if (soundManager && typeof soundManager.drawButton === 'function') soundManager.drawButton();
}

/** Checks win/lose conditions and triggers the correct end screen. */
function checkGameState() {
  if (world.isGameOver()) endGame(gameOverScreen);
  else if (world.isWin()) endGame(winScreen);
}

/**
 * Ends the game and displays the specified end screen.
 * @param {EndScreen} screen - The screen to display.
 */
function endGame(screen) {
  gameEnded = true;
  world.stopGame();
  screen.show();
}

/**
 * Converts client pointer coordinates to canvas-relative coordinates.
 * @param {number} clientX
 * @param {number} clientY
 * @returns {{ canvasX: number, canvasY: number }}
 */
function getCanvasCoordinates(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  return {
    canvasX: ((clientX - rect.left) / rect.width) * canvas.width,
    canvasY: ((clientY - rect.top) / rect.height) * canvas.height,
  };
}

/**
 * Updates hover state for all active screen buttons.
 * @param {number} x - Canvas X coordinate.
 * @param {number} y - Canvas Y coordinate.
 */
function updateScreenHover(x, y) {
  if (!gameStarted && startScreen && startScreen.isVisible) {
    startScreen.checkHover(x, y);
    canvas.style.cursor = startScreen.isHovered ? 'pointer' : 'default';
  } else if (gameEnded) {
    const activeScreen = gameOverScreen?.isVisible ? gameOverScreen : winScreen?.isVisible ? winScreen : null;
    if (activeScreen) {
      activeScreen.checkHover(x, y);
      canvas.style.cursor = activeScreen.isAnyButtonHovered() ? 'pointer' : 'default';
    }
  }
}

/**
 * Handles mouse move events for hover effects on buttons.
 * @param {MouseEvent} event
 */
function handleMouseMove(event) {
  const { canvasX, canvasY } = getCanvasCoordinates(event.clientX, event.clientY);
  if (soundManager && typeof soundManager.checkButtonHover === 'function')
    soundManager.checkButtonHover(canvasX, canvasY);
  updateScreenHover(canvasX, canvasY);
  if (soundManager?.isButtonHovered?.()) canvas.style.cursor = 'pointer';
}

/**
 * Handles a click on the sound toggle button.
 * @param {number} x - Canvas X coordinate.
 * @param {number} y - Canvas Y coordinate.
 * @returns {boolean} True if the sound button was clicked.
 */
function handleSoundButtonClick(x, y) {
  if (soundManager?.isButtonClicked?.(x, y)) {
    SoundManagerClass.toggleMuted();
    if (typeof soundManager.setButtonMuted === 'function') soundManager.setButtonMuted(SoundManagerClass.isMuted());
    localStorage.setItem('fp.soundMuted', SoundManagerClass.isMuted());
    return true;
  }
  return false;
}

/**
 * Handles clicks on start screen and end screen buttons.
 * @param {number} x - Canvas X coordinate.
 * @param {number} y - Canvas Y coordinate.
 */
function handleScreenButtonClick(x, y) {
  if (!gameStarted && startScreen && startScreen.isVisible) {
    if (startScreen.isButtonClicked(x, y)) startGame();
    return;
  }
  if (gameEnded) handleEndScreenClick(x, y);
}

/**
 * Routes clicks on the active end screen to menu or restart actions.
 * @param {number} x - Canvas X coordinate.
 * @param {number} y - Canvas Y coordinate.
 */
function handleEndScreenClick(x, y) {
  const activeScreen = gameOverScreen?.isVisible ? gameOverScreen : winScreen?.isVisible ? winScreen : null;
  if (!activeScreen) return;
  if (activeScreen.isMenuButtonClicked(x, y)) goToMenu();
  else if (activeScreen.isRestartButtonClicked(x, y)) restartGame();
}

/**
 * Handles pointer/click events on the canvas.
 * @param {PointerEvent} event
 */
function handleClick(event) {
  const { canvasX, canvasY } = getCanvasCoordinates(event.clientX, event.clientY);
  if (handleSoundButtonClick(canvasX, canvasY)) return;
  handleScreenButtonClick(canvasX, canvasY);
}

/** Starts the game and hides the start screen. */
function startGame() {
  gameStarted = true;
  gameEnded = false;
  startScreen.hide();
  gameOverScreen.hide();
  winScreen.hide();
  canvas.style.cursor = 'default';
  soundManager.playSound('fantasy-space-atmosphere');
}

/** Returns to the start menu and reinitializes the world. */
function goToMenu() {
  gameStarted = false;
  gameEnded = false;
  gameOverScreen.hide();
  winScreen.hide();
  startScreen.show();
  stopAllIntervals();
  initLevel1();
  window.world = new World(canvas, keyboard);
  world = window.world;
}

/** Restarts the game directly without showing the menu. */
function restartGame() {
  gameStarted = true;
  gameEnded = false;
  gameOverScreen.hide();
  winScreen.hide();
  stopAllIntervals();
  initLevel1();
  window.world = new World(canvas, keyboard);
  world = window.world;
  canvas.style.cursor = 'default';
  soundManager.playSound('fantasy-space-atmosphere');
}

/**
 * Sets up a single touch control button and binds keyboard state.
 * @param {string} id - The element ID of the control button.
 * @param {string} key - The keyboard state key to toggle.
 */
function setupControl(id, key) {
  const btn = document.getElementById(id);
  if (!btn) return;
  const setKey = (value) => {
    keyboard[key] = value;
  };
  addPointerListeners(btn, setKey);
  addTouchListeners(btn, setKey);
}

/**
 * Binds pointerdown/up/leave events for touch-only interaction.
 * @param {HTMLElement} btn - The button element.
 * @param {Function} setKey - Setter that toggles the keyboard state.
 */
function addPointerListeners(btn, setKey) {
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
}

/**
 * Binds touchstart and touchend events for mobile control.
 * @param {HTMLElement} btn - The button element.
 * @param {Function} setKey - Setter that toggles the keyboard state.
 */
function addTouchListeners(btn, setKey) {
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

/** Binds all four mobile on-screen control buttons. */
function initButtonPressEvents() {
  setupControl('btnLeft', 'LEFT');
  setupControl('btnRight', 'RIGHT');
  setupControl('btnJump', 'SPACE');
  setupControl('btnAttack', 'X');
}

/** Toggles mute state and persists the preference to localStorage. */
function handleMuteToggle() {
  SoundManagerClass.toggleMuted();
  if (soundManager && typeof soundManager.setButtonMuted === 'function')
    soundManager.setButtonMuted(SoundManagerClass.isMuted());
  localStorage.setItem('fp.soundMuted', SoundManagerClass.isMuted());
}

/**
 * Handles keyboard key-down events.
 * @param {KeyboardEvent} e
 */
function handleKeyDown(e) {
  if (e.keyCode === Config.KEYS.MUTE) handleMuteToggle();
  if (e.keyCode === Config.KEYS.ARROW_UP) keyboard.UP = true;
  if (e.keyCode === Config.KEYS.ARROW_RIGHT) keyboard.RIGHT = true;
  if (e.keyCode === Config.KEYS.ARROW_DOWN) keyboard.DOWN = true;
  if (e.keyCode === Config.KEYS.ARROW_LEFT) keyboard.LEFT = true;
  if (e.keyCode === Config.KEYS.SPACE) keyboard.SPACE = true;
  if (e.keyCode === Config.KEYS.X) keyboard.X = true;
}

/**
 * Handles keyboard key-up events.
 * @param {KeyboardEvent} e
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
