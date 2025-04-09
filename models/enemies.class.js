class EnemiesAnt extends MoveleObjekt {
  constructor() {

    super().loadImage('/assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight01_idle1.png');

    this.x = 250 + Math.random() * 500;
  }


}
