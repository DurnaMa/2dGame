class Statusbar extends DrawableObject {
  y = 150;
  height = 50;
  width = 50;

  percentage = 100;

  CHARACTER_STATUSBAR = ['assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_bar_full.png'];
  ENERGY = ['assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_full.png'];
  IMAGES = [
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_full6/00_hp_full6.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_full6/01_hp_full6.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_full6/02_hp_full6.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_full6/03_hp_full6.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_full6/04_hp_full6.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_full6/05_hp_full6.png',
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
    this.y = 150;
    this.x = 150;
    console.log('Statusbar liegt auf der y-Achse (y = ' + this.y + ')');
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  setPercentage(percentage) {
    this.percentage = percentage;
  }

  resolveImageIndex() {
    if (this.perecentage == 100) {
      return 5;
    } else if (this.perecentage > 80) {
      return 4;
    } else if (this.perecentage > 60) {
      return 3;
    } else if (this.perecentage > 40) {
      return 2;
    } else if (this.perecentage > 20) {
      return 1;
    } else if (this.perecentage > 0) {
      return 0;
    }
  }
}
