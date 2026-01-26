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
    this.moveInterval = setTrackedInterval(
      () => this.handleMovement(),
      1000 / GAME_CONFIG.FRAME_RATE,
      'Character Movement'
    );
    this.animationInterval = setTrackedInterval(
      () => this.handleAnimation(),
      GAME_CONFIG.ANIMATION_SPEED,
      'Character Animation'
    );
  }

  handleMovement() {
    if (!this.world.level) return;

    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      if (this.walkingSound) {
        this.walkingSound();
      }
      this.moveRight();
      this.lastMoveTime = new Date().getTime();
    }

    if (this.world.keyboard.LEFT && this.x > GAME_CONFIG.CHARACTER.START_X) {
      if (this.walkingSound) {
        this.walkingSound();
      }
      this.moveLeft();
      this.lastMoveTime = new Date().getTime();
    }

    if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.jumpStarted) {
      if (this.jumpSound) {
        this.jumpSound();
      }
      this.jump();
      this.jumpStarted = new Date().getTime();
    }

    this.world.camera_x = -this.x + GAME_CONFIG.CAMERA_OFFSET;
  }

  handleAnimation() {
    this.animateSetInterval();
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
      let spacePressed = setTrackedInterval(
        () => {
          this.playAnimation(this.IMAGES_JUMPING);
        },
        GAME_CONFIG.JUMP_ANIMATION_SPEED,
        'Character Jump Animation'
      );

      setTrackedTimeout(
        () => {
          this.checkAlreadyRunning = false;
          clearInterval(spacePressed);
        },
        GAME_CONFIG.JUMP_ANIMATION_DURATION,
        'Character Jump Reset'
      );
    }
  }
}
