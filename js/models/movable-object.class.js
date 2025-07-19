class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  lastHit = 0;

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
        console.log('Zeit in der Luft:', this.jumpEnded - this.jumpStarted);
        this.jumpStarted = null;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 366;
  }

  drawBorder(ctx) {
    if (
      this instanceof Character ||
      this instanceof EnemiesAnt ||
      this instanceof Endboss ||
      this instanceof Bottle ||
      this instanceof Coins
    ) {
      ctx.beginPath();
      ctx.lineWidth = '1';
      ctx.strokeStyle = 'blue';

      if (this.otherDirection) {
        ctx.rect(0, 0, this.width, this.height);
      } else {
        ctx.rect(this.x, this.y, this.width, this.height);
      }
      ctx.stroke();
    }
  }

  drawCollisionBorder(ctx) {
    if (
      this instanceof Character ||
      this instanceof EnemiesAnt ||
      this instanceof Endboss
      //this instanceof Bottle ||
      //this instanceof Coins
    ) {
      ctx.beginPath();
      ctx.lineWidth = '1';
      ctx.strokeStyle = 'red';

      if (this.otherDirection) {
        ctx.rect(
          this.offset.left,
          this.offset.top,
          this.width - this.offset.right - this.offset.left,
          this.height - this.offset.bottom - this.offset.top
        );
      } else {
        ctx.rect(
          this.x + this.offset.left,
          this.y + this.offset.top,
          this.width - this.offset.right - this.offset.left,
          this.height - this.offset.bottom - this.offset.top
        );
      }
      ctx.stroke();
    }
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
    this.speedY = 25;
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
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isIdle() {
    let now = new Date().getTime();
    return now - this.lastMoveTime > 3000;
  }
}
