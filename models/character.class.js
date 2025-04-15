class Character extends MoveleObjekt {
  y = 420;
  x = 40;
  height = 300;
  width = 300;

  IMAGES_WALKING = [
    '/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk1.png',
    '/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk2.png',
    '/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk3.png',
    '/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk4.png',
    '/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk5.png',
    '/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk6.png',
  ];

  currentImage = 0;

  constructor() {
    super().loadImage('/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/rogue.png');
    this.loadImages(this.IMAGES_WALKING);
    (this.x = 0), this.x;

    this.animate();
  }

  animate() {
    setInterval(() => {
      let index = this.currentImage % this.IMAGES_WALKING.length;
      let path = this.IMAGES_WALKING[index];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 100 / 0.5);
  }

  jump() {}
}
