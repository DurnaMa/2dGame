class Character extends MovableObject {
  y = 366;
  x = 0;
  speed = 5;

  moveInterval;
  animateionInterval;

  constructor() {
    super().loadImage('assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/rogue.png');
    //super().loadImage('assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/mage.png');

    this.offset = {
      top: 90,
      left: 35,
      right: 90,
      bottom: 25,
    };

    this.x = 150;
    this.applyGravity();

    this.lastMoveTime = new Date().getTime();
    this.hit = false; // Hit-Status für Kollisionsschutz
  }

  isDeath() {
    if (this.energy == 0) {
      this.stopAllIntervals();
      return true;
    }
    return false;
    //return this.energy == 0;
  }

  animate() {
    this.moveInterval = setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.lastMoveTime = new Date().getTime();
      }
      if (this.world.keyboard.LEFT && this.x > 150) {
        this.moveLeft();
        this.lastMoveTime = new Date().getTime();
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.jumpStarted) {
        this.jump();
        this.jumpStarted = new Date().getTime();
      }

      this.world.camera_x = -this.x + 150;
    }, 1000 / 60);

    this.animationInterval = setInterval(() => {
      this.animateSetInterval();
    }, 100);
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
      }, 288);

      setTimeout(() => {
        this.checkAlreadyRunning = false;
        clearInterval(spacePressed);
      }, 1900);
    }
  }

  stopAllIntervals() {
    if (this.moveInterval) clearInterval(this.moveInterval);
    if (this.animationInterval) clearInterval(this.animationInterval);
    if (this.world && this.world.gameInterval) {
      clearInterval(this.world.gameInterval);
    }
  }
}
