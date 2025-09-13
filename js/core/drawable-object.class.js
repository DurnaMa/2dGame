class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 520;
  height = 150;
  width = 100;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

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

  drawBorder(ctx) {
    if (
      this instanceof Character ||
      this instanceof EnemiesAnt ||
      this instanceof Endboss ||
      this instanceof Bottle ||
      this instanceof Coin
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
}
