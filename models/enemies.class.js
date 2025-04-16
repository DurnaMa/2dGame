class EnemiesAnt extends MoveleObjekt {
  y = 350;
  x = 40;
  height = 500;
  width = 500;

  IMAGES_WALKING = [
    '/assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/walkLeft/big_knight_walk1_left.png',
    '/assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/walkLeft/big_knight_walk2_left.png',
    '/assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/walkLeft/big_knight_walk3_left.png',
    '/assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/walkLeft/big_knight_walk4_left.png',
    '/assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/walkLeft/big_knight_walk5_left.png',
    '/assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/walkLeft/big_knight_walk6_left.png',
  ];
  constructor() {
    super().loadImage('/assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/idleLeft/big_knight01_idleLeft1.png');

    this.x = 250 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.55;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate() {
    this.moveLeft();
    setInterval(() => {
      let index = this.currentImage % this.IMAGES_WALKING.length;
      let path = this.IMAGES_WALKING[index];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 200);
  }
}
