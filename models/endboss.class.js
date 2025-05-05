class Endboss extends MoveleObjekt {
  height = 700;
  width = 650;
  y = 116;
  x = 0;

  IMAGES_WALKING = [
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Idle1.png',
    '/assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk1.png',
    '/assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk2.png',
    '/assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk3.png',
    '/assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk4.png',
    '/assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk5.png',
    '/assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk6.png',
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 2700;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
      this.otherDirection = true;
    }, 200);
  }
}
