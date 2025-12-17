class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = GAME_CONFIG.DRAWABLE.X;
  y = GAME_CONFIG.DRAWABLE.Y;
  height = GAME_CONFIG.DRAWABLE.HEIGHT;
  width = GAME_CONFIG.DRAWABLE.WIDTH;
  otherDirection;
  offset;

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
      this instanceof BigKnight ||
      this instanceof Endboss ||
      this instanceof Bottle ||
      this instanceof Coin ||
      this instanceof Dragon
    ) {
      ctx.beginPath();
      ctx.lineWidth = GAME_CONFIG.DRAWABLE.BORDER_WIDTH;
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
      this instanceof BigKnight ||
      this instanceof Endboss ||
      this instanceof Dragon
      //this instanceof Bottle ||
      //this instanceof Coins
    ) {
      ctx.beginPath();
      ctx.lineWidth = GAME_CONFIG.DRAWABLE.BORDER_WIDTH;
      ctx.strokeStyle = 'red';

      if (this.otherDirection) {
        ctx.rect(
          this.offset.left,
          this.offset.top,
          this.width - this.offset.right - this.offset.left,
          this.height - this.offset.bottom - this.offset.top,
        );
      } else {
        ctx.rect(
          this.x + this.offset.left,
          this.y + this.offset.top,
          this.width - this.offset.right - this.offset.left,
          this.height - this.offset.bottom - this.offset.top,
        );
      }
      ctx.stroke();
    }
  }

  drawCollisionMagic(ctx) {
    if (this instanceof ThrowableObject) {
      ctx.beginPath();
      ctx.lineWidth = GAME_CONFIG.DRAWABLE.BORDER_WIDTH;
      ctx.strokeStyle = 'yellow';

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
