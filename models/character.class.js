class Character extends MoveleObjekt {
  y = 420;
  x = 0;
  height = 300;
  width = 300;

  speed = 1.5;

  IMAGES_WALKING = [
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk1.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk2.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk3.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk4.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk5.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk6.png',
  ];

  IMAGES_JUPING = [
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Jump/jump1.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Jump/jump2.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Jump/jump3.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Jump/jump4.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Jump/jump5.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Jump/jump6.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Jump/jump7.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/rogue.png',
  ];
  world;

  constructor() {
    super().loadImage('assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/rogue.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUPING);
    this.x = 150;
    this.applyGravity();
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

      this.world.camera_x = -this.x + 150;
    }, 100 / 60);

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUPING);
        this.speedY = 30;
      } else {
        //console.log('Aktuelle Position:', this.y.toFixed(0), 'px');

        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 100);
  }

  jump() {}
}
