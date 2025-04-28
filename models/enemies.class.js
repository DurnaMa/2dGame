class EnemiesAnt extends MoveleObjekt {
  y = 350;
  x = 40;
  height = 500;
  width = 500;

  IMAGES_WALKING = [
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/walkLeft/big_knight_walk_left1.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/walkLeft/big_knight_walk_left2.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/walkLeft/big_knight_walk_left3.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/walkLeft/big_knight_walk_left4.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/walkLeft/big_knight_walk_left5.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/walkLeft/big_knight_walk_left6.png',
  ];
  constructor() {
    super().loadImage('/assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/hurt/big_knight_hurt1.png');

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
