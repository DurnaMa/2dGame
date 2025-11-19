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
      if (this instanceof Rogue && !this.isAboveGround() && this.jumpStarted) {
        this.jumpEnded = new Date().getTime();
        this.lastMoveTime = new Date().getTime();
        this.speedY = 0;
        this.y = this.ground;
        this.jumpStarted = null;
      }
    }, 1000 / GAME_CONFIG.MOVABLE.GRAVITY_UPDATE_RATE);
  }

  isAboveGround() {
    return this.y < this.ground;
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
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
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < GAME_CONFIG.MOVABLE.HURT_DURATION;
  }

  isIdle() {
    let now = new Date().getTime();
    return now - this.lastMoveTime > 3000;
  }
}
