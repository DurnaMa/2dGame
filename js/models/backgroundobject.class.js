class BackgroundObject extends MovableObject {
  width = Config.CANVAS_WIDTH;
  height = Config.CANVAS_HEIGHT;
  x = 0;
  parallax = 1; // Standard-Parallax-Faktor

  constructor(imagePath, x, y, parallax = 1) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = y;
    this.parallax = parallax;
  }

  draw(ctx) {
    try {
      ctx.drawImage(this.img, Math.round(this.x), this.y, this.width, this.height);
    } catch (e) {
      console.warn('Dieses Background-Objekt konnte nicht gezeichnet werden:', this);
    }
  }
}
