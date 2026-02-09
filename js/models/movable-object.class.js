class MovableObject extends DrawableObject {
  speed = Config.MOVABLE.SPEED;
  otherDirection = false;
  speedY = Config.MOVABLE.SPEED_Y;
  acceleration = Config.ACCELERATION;
  energy = Config.MOVABLE.ENERGY;
  lastHit = 0;
  ground = Config.GROUND_LEVEL;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  applyGravity() {
    this.gravityInterval = setTrackedInterval(
      () => {
        if (!gameStarted) return;
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        }
        if (!this.isAboveGround() && this.jumpStarted) {
          this.checkJumpReset();
        }
      },
      1000 / Config.MOVABLE.GRAVITY_UPDATE_RATE,
      'Gravity Update'
    );
  }

  checkJumpReset() {
    this.jumpEnded = new Date().getTime();
    this.lastMoveTime = new Date().getTime();
    this.speedY = 0;
    this.y = this.ground;
    this.jumpStarted = null;
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
    this.speedY = Config.JUMP_POWER;
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
    this.energy -= Config.COLLISION.DAMAGE_BOSS;
    if (this.energy < 0) {
      this.energy = 0;
    }
    this.lastHit = new Date().getTime();
  }

  isHurt() {
    let timestamped = new Date().getTime() - this.lastHit;
    timestamped = timestamped / 1000;
    return timestamped < Config.MOVABLE.HURT_DURATION;
  }

  isIdle() {
    let now = new Date().getTime();
    return now - this.lastMoveTime > 3000;
  }

  stopAllIntervals() {
    if (this.moveInterval) clearInterval(this.moveInterval);
    if (this.animationInterval) clearInterval(this.animationInterval);
    if (this.gravityInterval) clearInterval(this.gravityInterval);
  }
}
