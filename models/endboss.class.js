class Endboss extends MoveleObjekt {
  height = 400;
  width = 400;
  y = 116;

  otherDirection = false;

  IMAGES_WALKING = [
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk1.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk2.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk3.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk4.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk5.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk6.png',
  ];

  constructor() {
    super().loadImage('assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk1.png');
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
    this.offset = {
      top: 125,
      left: 165,
      right: 75,
      bottom: 75,
    };
    this.x = 400;
  }

  animate() {
    // setInterval(() => {
    //   this.moveLeft();
    // }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
      this.moveLeft();
    }, 200);

  }
}
