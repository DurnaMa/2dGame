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
    // Optional: Rahmen zeichnen, z.B. für Debug-Zwecke
    // ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
