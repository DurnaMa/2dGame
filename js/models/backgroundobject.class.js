class BackgroundObject extends MovableObject {
  width = 960;
  height = 540;
  x = 0;

  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    try {
      ctx.drawImage(this.img, Math.round(this.x), this.y, this.width, this.height);
    } catch (e) {
      console.warn('Dieses Background-Objekt konnte nicht gezeichnet werden:', this);
    }
  }
}
