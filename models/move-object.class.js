class MoveleObjekt {
  x = 120;
  y = 520;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;

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
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 420;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  // draw(ctx) {
  //   try {
  //     ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  //   } catch (e) {
  //     console.warn('Dieses Element konnte nicht gezeichnet werden:', this);
  //   }
  // }

  draw(ctx) {
    try {
      if (this.otherDirection) {
        ctx.drawImage(this.img, 0, 0, this.width, this.height);
      } else {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }
    } catch (e) {
      console.warn('Dieses Element konnte nicht gezeichnet werden:', this);
    }
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
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  // drawCollisionBorder(ctx) {
  //   if (
  //     this instanceof Character ||
  //     this instanceof EnemiesAnt ||
  //     this instanceof Endboss ||
  //     this instanceof Bottle ||
  //     this instanceof Coins
  //   ) {
  //     ctx.beginPath();
  //     ctx.lineWidth = '1';
  //     ctx.strokeStyle = 'red';
  //     ctx.rect(
  //       this.x + this.offset.left,
  //       this.y + this.offset.top,
  //       this.width - this.offset.right - this.offset.left,
  //       this.height - this.offset.bottom - this.offset.top
  //     );
  //     ctx.stroke();
  //   }
  // }
  drawCollisionBorder(ctx) {
    if (
      this instanceof Character ||
      this instanceof EnemiesAnt ||
      this instanceof Endboss ||
      this instanceof Bottle ||
      this instanceof Coins
    ) {
      ctx.beginPath();
      ctx.lineWidth = '1';
      ctx.strokeStyle = 'red';

      const relWidth = this.width - this.offset.right - this.offset.left;
      const relHeight = this.height - this.offset.bottom - this.offset.top;

      if (this.otherDirection) {
        // Im bereits gestarteten Flip‐Kontext zeichnen wir das Kollisionsrechteck
        // bei (offset.right, offset.top), damit es korrekt gespiegelt landet.
        ctx.rect(this.offset.right, this.offset.top, relWidth, relHeight);
      } else {
        // Normal‐Fall: einfach an den echten Koordinaten zeichnen.
        ctx.rect(this.x + this.offset.left, this.y + this.offset.top, relWidth, relHeight);
      }

      ctx.stroke();
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left && // R → L
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // T → B
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // L → R
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    ); // B → T
  }

  /**
   *
   * @param {Array} arr - ['/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk1.png',
   * '/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk2.png' ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
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
    let index = this.currentImage % this.IMAGES_WALKING.length;
    let path = images[index];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playItems(images) {
    let index = this.currentImage % images.length;
    let path = images[index];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
