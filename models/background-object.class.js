class BackgroundObjeckt extends MoveleObjekt {
  width = 1200;
  height = 700;
  x = 0;

  constructor(imgePath, x, y) {
    super().loadImage(imgePath);
    this.x = x;
    this.y = y; 
  }
}
