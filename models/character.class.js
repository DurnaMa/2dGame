class Character extends MoveleObjekt {
  y = 366;
  x = 0;
  // height = 200;
  // width = 200;

  speed = 2.5;

  zoom = 1;

  constructor() {
    super().loadImage('assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/rogue.png');
    //super().loadImage('assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/mage.png');

    this.offset = {
      top: 90,
      left: 35,
      right: 90,
      bottom: 25,
    };

    this.x = 150;
    this.applyGravity();
  }

  isDeath() {
    return this.energy == 0;
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
      if (this.isDeath()) {
        this.playAnimation(this.IMAGES_DEATH);
        this.zoom = 1;
      } else if (this.isHurt) {
        this.playAnimation(this.IMAGES_HURT)
        this.zoom = 1;
      }
       else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUPING);
        this.zoom = 1;
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
          this.zoom = 1;
        } else {
          this.playAnimation(this.IMAGES_IDELE);
          this.zoom = 1;
        }
      }
    }, 100);
  }
}
