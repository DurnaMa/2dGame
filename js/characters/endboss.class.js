class Endboss extends MovableObject {
  height = 400;
  width = 400;
  y = 220;
  x = 0;

  otherDirection = true;

  IMAGES_WALKING = [
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk1.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk2.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk3.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk4.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk5.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk6.png',
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.offset = {
      top: 125,
      left: 165,
      right: 75,
      bottom: 75,
    };
    this.x = 7500;
    this.isActive = false;
    this.movingRight = false;
    this.speed = 1; // boss speed while patrolling (not active after revert)
    this.animate();
  }

  animate() {
    // Animation (sprite frames)
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
