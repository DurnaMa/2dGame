class Character extends MoveleObjekt {
  y = 420;
  x = 0;
  height = 300;
  width = 300;

  speed = 2;

  IMAGES_WALKING = [
    '/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk1.png',
    '/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk2.png',
    '/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk3.png',
    '/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk4.png',
    '/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk5.png',
    '/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk6.png',
  ];
  world;

  constructor() {
    super().loadImage('/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/rogue.png');
    this.loadImages(this.IMAGES_WALKING);
    this.x = 150

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
      }
      //console.log(this.world.level.level_end_x)
      if (this.world.keyboard.LEFT && this.x > 150) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      //console.log("Aktuelle Position:", this.x.toFixed(0), "px");
      this.world.camera_x = -this.x +150;
    }, 100 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING)
      }
    }, 100);
  }

  jump() {}
}
