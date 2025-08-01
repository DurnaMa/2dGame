class BackgroundObject extends MovableObject {
  width = 960;
  height = 540;
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
