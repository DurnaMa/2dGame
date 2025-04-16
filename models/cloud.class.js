class Cloud extends MoveleObjekt {
  y = 550;
  width = 1200;
  height = 700;
  // height = 500;
  // width = 1000;

  constructor() {
    super().loadImage('/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/clouds4.png');

    (this.x = 0), this.x;
    this.y = 520 - this.y;

    this.x = Math.random() * 500;
    this.animate();
  }

  animate() {
    this.moveLeft();
  }
}
