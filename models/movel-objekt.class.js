class MoveleObjekt {
  x = 120;
  y = 520;
  img;
  height = 150;
  width = 100

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {}

  moveLeft() {}
}
