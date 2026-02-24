class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = Config.DRAWABLE.X;
  y = Config.DRAWABLE.Y;
  height = Config.DRAWABLE.HEIGHT;
  width = Config.DRAWABLE.WIDTH;
  otherDirection;
  offset;

  /**
   * Loads a single image.
   * @param {string} path - Path to the image file
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   */
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
   * Loads multiple images into the cache.
   * @param {string[]} arr - Array of image file paths
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the outer frame (debug only).
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   */
  drawBorder(ctx) {
    if (!Config.DEBUG) return;
    if (
      this instanceof Character ||
      this instanceof BigKnight ||
      this instanceof Endboss ||
      this instanceof Bottle ||
      this instanceof Coin ||
      this instanceof Dragon
    ) {
      ctx.beginPath();
      ctx.lineWidth = Config.DRAWABLE.BORDER_WIDTH;
      ctx.strokeStyle = 'blue';

      if (this.otherDirection) {
        ctx.rect(0, 0, this.width, this.height);
      } else {
        ctx.rect(this.x, this.y, this.width, this.height);
      }
      ctx.stroke();
    }
  }

  /**
   * Draws the collision box (debug only).
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   */
  drawCollisionBorder(ctx) {
    if (!Config.DEBUG) return;
    if (
      this instanceof Character ||
      this instanceof BigKnight ||
      this instanceof Endboss ||
      this instanceof Dragon ||
      this instanceof Bottle ||
      this instanceof Coin
    ) {
      ctx.beginPath();
      ctx.lineWidth = Config.DRAWABLE.BORDER_WIDTH;
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

  /**
   * Draws the collision box for magic objects (debug only).
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   */
  drawCollisionMagic(ctx) {
    if (!Config.DEBUG) return;
    if (this instanceof ThrowableObject) {
      ctx.beginPath();
      ctx.lineWidth = Config.DRAWABLE.BORDER_WIDTH;
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
