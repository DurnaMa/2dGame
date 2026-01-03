class Character extends MovableObject {
  y = GAME_CONFIG.CHARACTER.START_Y;
  x = GAME_CONFIG.CHARACTER.START_X;
  speed = GAME_CONFIG.CHARACTER.SPEED;

  moveInterval;

  constructor() {
    super();
    this.loadImage('assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/rogue.png');
    //this.loadImage('assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/mage.png');

    this.offset = {
      top: GAME_CONFIG.CHARACTER.OFFSET.TOP,
      left: GAME_CONFIG.CHARACTER.OFFSET.LEFT,
      right: GAME_CONFIG.CHARACTER.OFFSET.RIGHT,
      bottom: GAME_CONFIG.CHARACTER.OFFSET.BOTTOM,
    };

    this.x = GAME_CONFIG.CHARACTER.START_X;
    this.applyGravity();

    this.lastMoveTime = new Date().getTime();
    this.hit = false;
  }

  isDeath() {
    return this.energy === 0;
  }

  animate() {
    this.moveInterval = setInterval(() => {
      if (!this.world.level) return;
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
}
