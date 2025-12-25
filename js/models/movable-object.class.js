class MovableObject extends DrawableObject {
  speed = GAME_CONFIG.MOVABLE.SPEED;
  otherDirection = false;
  speedY = GAME_CONFIG.MOVABLE.SPEED_Y;
  acceleration = GAME_CONFIG.ACCELERATION;
  energy = GAME_CONFIG.MOVABLE.ENERGY;
  lastHit = 0;
  ground = GAME_CONFIG.GROUND_LEVEL;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      if (!this.isAboveGround() && this.jumpStarted) {
        this.checkJumpReset();
      }
    }, 1000 / GAME_CONFIG.MOVABLE.GRAVITY_UPDATE_RATE);
  }

  checkJumpReset() {
    this.jumpEnded = new Date().getTime();
    this.lastMoveTime = new Date().getTime();
    this.speedY = 0;
    this.y = this.ground;
  }

  isAboveGround() {
    return this.y < this.ground;
  }

  isColliding(movableObject) {
    return (
      this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
      this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
      this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
      this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom
    );
  }

  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  jump() {
    this.speedY = GAME_CONFIG.JUMP_POWER;
  }

  playAnimation(images) {
    try {
      let index = this.currentImage % images.length;
      let path = images[index];
      this.img = this.imageCache[path];
      this.currentImage++;
    } catch (e) {
      console.warn('Dieses Element konnte nicht gezeichnet werden:', this);
    }
  }

  playItems(images) {
    let index = this.currentImage % images.length;
    let path = images[index];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  hit() {
    this.energy -= GAME_CONFIG.COLLISION.DAMAGE_BOSS;
    if (this.energy < 1) {
      this.energy = 1;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timestamped = new Date().getTime() - this.lastHit;
    timestamped = timestamped / 1000;
    return timestamped < GAME_CONFIG.MOVABLE.HURT_DURATION;
  }

  isIdle() {
    let now = new Date().getTime();
    return now - this.lastMoveTime > 3000;
  }
}
