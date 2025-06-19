class Character extends MoveleObjekt {
  y = 366;
  x = 0;
  height = 200;
  width = 200;

  speed = 2.5;

  constructor() {
    //super().loadImage('assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/rogue.png');
    super().loadImage('assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/mage.png');

    this.offset = {
      top: 90,
      left: 35,
      right: 90,
      bottom: 25,
    };

    this.x = 150;
    this.applyGravity();

  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
      }
      //console.log(this.world.level.level_end_x)
      if (this.world.keyboard.LEFT && this.x > 150) {
        this.moveLeft();
      }
      //console.log("Aktuelle Position:", this.x.toFixed(0), "px");

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }
      //console.log('Aktuelle Position:', this.y.toFixed(0), 'px');

      this.world.camera_x = -this.x + 150;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUPING);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        } else {
          this.playAnimation(this.IMAGES_IDELE);
        }
      }
    }, 100);
  }
}
