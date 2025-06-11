class EnemiesAnt extends MoveleObjekt {
  y = 340;
  x = 40;
  height = 300;
  width = 300;

  IMAGES_WALKING = [
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight04_walk1.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight05_walk2.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight06_walk3.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight07_walk4.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight08_walk5.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight09_walk6.png',
  ];
  constructor() {
    super().loadImage('assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight14_hurt1.png');

    this.x = 250 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.55;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
    this.offset = {
      top: 95,
      left: 115,
      right: 105,
      bottom: 100,
    };
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
      this.otherDirection = true;
    }, 200);
  }
}
