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

  /**
   *Applies gravity over an interval.
   */
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

  /**
   * Resets the jump state upon landing.
   */
  checkJumpReset() {
    this.jumpEnded = new Date().getTime();
    this.lastMoveTime = new Date().getTime();
    this.speedY = 0;
    this.y = this.ground;
    this.jumpStarted = null;
  }

  /**
   * Checks whether the object is above the ground.
   * @returns {boolean}
   */
  isAboveGround() {
    return this.y < this.ground;
  }

  /**
   * Checks for collision with another object.
   * @param movableObject
   * @returns {boolean}
   */
  isColliding(movableObject) {
    return (
      this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
      this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
      this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
      this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom
    );
  }

  /**
   * Move the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  /**
   * Move the object to the right.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Makes the object jump.
   */
  jump() {
    this.speedY = Config.JUMP_POWER;
  }

  /**
   * Play an animation.
   * @param images
   */
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

  /**
   * Play an Item animation.
   * @param images
   */
  playItems(images) {
    let index = this.currentImage % images.length;
    let path = images[index];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Reduces energy when hit.
   */
  hit() {
    this.energy -= Config.COLLISION.DAMAGE_BOSS;
    if (this.energy < 0) {
      this.energy = 0;
    }
    this.lastHit = new Date().getTime();
  }

  /**
   * Checks whether the object has been hit recently.
   * @returns {boolean}
   */
  isHurt() {
    let timestamped = new Date().getTime() - this.lastHit;
    timestamped = timestamped / 1000;
    return timestamped < Config.MOVABLE.HURT_DURATION;
  }

  /**
   * Checks whether the object has been inactive for 3 seconds.
   * @returns {boolean}
   */
  isIdle() {
    let now = new Date().getTime();
    return now - this.lastMoveTime > 3000;
  }
}
