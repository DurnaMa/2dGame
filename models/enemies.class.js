class EnemiesAnt extends MoveleObjekt {
  y = 350;
  x = 40;
  height = 500;
  width = 500;
  constructor() {

    super().loadImage('/assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight01_idle1.png');

    this.x = 250 + Math.random() * 500;
  }


}
