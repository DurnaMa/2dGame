class BackgroundObjeckt extends MoveleObjekt {
  width = 960;
  height = 540;
  x = 0;

  constructor(imgePath, x, y) {
    super().loadImage(imgePath);
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
