class Character extends MovableObject {
  y = GAME_CONFIG.CHARACTER.START_Y
  x = GAME_CONFIG.CHARACTER.START_X;
  speed = GAME_CONFIG.CHARACTER.SPEED;

  moveInterval;

  /**
   * Creates an instance of the character class.
   * Initializes the character's image, position, and offset values.
   * Applies gravity to the character and sets the initial hit status.
   *
   * @constructor
   * @extends {SuperClass} - Replace with the actual superclass name if applicable.
   * @property {Object} offset - The offset values for the character's position.
   * @property {number} x - The initial x-coordinate of the character.
   * @property {number} lastMoveTime - The timestamp of the last movement.
   * @property {boolean} hit - The hit status for collision protection.
   */
  constructor() {
    super().loadImage('assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/rogue.png');
    //super().loadImage('assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/mage.png');

    this.offset = {
      top: GAME_CONFIG.CHARACTER.OFFSET.TOP,
      left: GAME_CONFIG.CHARACTER.OFFSET.LEFT,
      right: GAME_CONFIG.CHARACTER.OFFSET.RIGHT,
      bottom: GAME_CONFIG.CHARACTER.OFFSET.BOTTOM,
    };

    this.x = GAME_CONFIG.CHARACTER.START_X;
    this.applyGravity();

    this.lastMoveTime = new Date().getTime();
    this.hit = false; // Hit-Status für Kollisionsschutz
  }

  isDeath() {
    return this.energy === 0;
  }

  /**
   * Initializes and starts the animation loops for character movement and sprite animation.
   *
   * Sets up two intervals:
   * 1. Movement interval - Handles keyboard input for left/right movement and jumping.
   *    Updates camera position to follow the character.
   * 2. Animation interval - Updates the character's sprite animation.
   *
   * @function animate
   * @returns {void}
   *
   * @description
   * - Processes RIGHT input to move character right (bounded by level_end_x)
   * - Processes LEFT input to move character left (bounded by CHARACTER.START_X)
   * - Processes SPACE input to initiate jump if character is on ground
   * - Updates camera position based on character's x position and configured offset
   * - Runs movement logic at FRAME_RATE fps
   * - Runs animation update at ANIMATION_SPEED fps
   *
   * @private
   */
  animate() {
    this.moveInterval = setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.lastMoveTime = new Date().getTime();
      }
      if (this.world.keyboard.LEFT && this.x > GAME_CONFIG.CHARACTER.START_X) {
        this.moveLeft();
        this.lastMoveTime = new Date().getTime();
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.jumpStarted) {
        this.jump();
        this.jumpStarted = new Date().getTime();
      }

      this.world.camera_x = -this.x + GAME_CONFIG.CAMERA_OFFSET;
    }, 1000 / GAME_CONFIG.FRAME_RATE);

    this.animationInterval = setInterval(() => {
      this.animateSetInterval();
    }, GAME_CONFIG.ANIMATION_SPEED);
  }

  /**
   * Animates the character based on its current state.
   * The animation will change depending on whether the character is:
   * - Dead: Plays the death animation.
   * - Above ground: Handles the jump animation.
   * - Idle: Plays the idle animation.
   * - Hurt: Plays the hurt animation.
   * - Moving left or right: Plays the walking animation.
   * - None of the above: Plays the standing animation.
   *
   * @returns {void} This function does not return a value.
   */
  animateSetInterval() {
    if (this.isDeath()) {
      this.playAnimation(this.IMAGES_DEATH);
    } else if (this.isAboveGround()) {
      this.handleJumpAnimation();
    } else if (this.isIdle()) {
      this.playAnimation(this.IMAGES_IDLE);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.playAnimation(this.IMAGE_IMAGES_STANDING);
    }
  }


  /**
   * Handles the jump animation for the character.
   * This method initiates the jump animation by setting the current image
   * to the first frame and starting an interval to play the jump animation frames.
   * It ensures that the jump animation is not already running by using a flag.
   * The animation will continue for a specified duration before stopping.
   *
   * @function handleJumpAnimation
   * @returns {void}
   */
  handleJumpAnimation() {
    if (!this.checkAlreadyRunning) {
      this.checkAlreadyRunning = true;
      this.currentImage = 0;
      let spacePressed = setInterval(() => {
        this.playAnimation(this.IMAGES_JUMPING);
      }, GAME_CONFIG.JUMP_ANIMATION_SPEED);

      setTimeout(() => {
        this.checkAlreadyRunning = false;
        clearInterval(spacePressed);
      }, GAME_CONFIG.JUMP_ANIMATION_DURATION);
    }
  }

  /**
   * Stops all active intervals related to the character.
   * This includes the movement interval, animation interval,
   * and the game interval if it exists within the world object.
   */
  stopAllIntervals() {
    if (this.moveInterval) clearInterval(this.moveInterval);
    if (this.animationInterval) clearInterval(this.animationInterval);
    if (this.world && this.world.gameInterval) {
      clearInterval(this.world.gameInterval);
    }
  }
}
