class Character extends MovableObject {
  y = Config.CHARACTER.START_Y;
  x = Config.CHARACTER.START_X;
  speed = Config.CHARACTER.SPEED;

  moveInterval;

  constructor() {
    super();
    this.loadImage('assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/rogue.png');
    //this.loadImage('assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/mage.png');

    this.offset = {
      top: Config.CHARACTER.OFFSET.TOP,
      left: Config.CHARACTER.OFFSET.LEFT,
      right: Config.CHARACTER.OFFSET.RIGHT,
      bottom: Config.CHARACTER.OFFSET.BOTTOM,
    };

    this.x = Config.CHARACTER.START_X;
    this.applyGravity();

    this.lastMoveTime = new Date().getTime();
    this.hit = false;
  }

  isDeath() {
    return this.energy === 0;
  }

  animate() {
    this.moveInterval = setTrackedInterval(() => this.handleMovement(), 1000 / Config.FRAME_RATE, 'Character Movement');
    this.animationInterval = setTrackedInterval(
      () => this.handleAnimation(),
      Config.ANIMATION_SPEED,
      'Character Animation'
    );
  }

  handleMovement() {
    if (!gameStarted) return;
    if (!this.world.level) return;

    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      if (this.walkingSound) {
        this.walkingSound();
      }
      this.moveRight();
      this.lastMoveTime = new Date().getTime();
    }

    if (this.world.keyboard.LEFT && this.x > Config.CHARACTER.START_X) {
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

    this.world.camera_x = -this.x + Config.CAMERA_OFFSET;
  }

  handleAnimation() {
    this.animateSetInterval();
  }

  animateSetInterval() {
    if (!gameStarted) return;

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
        Config.JUMP_ANIMATION_SPEED,
        'Character Jump Animation'
      );

      setTrackedTimeout(
        () => {
          this.checkAlreadyRunning = false;
          clearInterval(spacePressed);
        },
        Config.JUMP_ANIMATION_DURATION,
        'Character Jump Reset'
      );
    }
  }
}
