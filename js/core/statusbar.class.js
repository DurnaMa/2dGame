class Statusbar {
  y = 150;
  height = 50;
  width = 50;

  percentage = 100;

  CHARACKTER_STATUSBAR = ['assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_bar_full.png'];
  ENERGY = ['assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_full.png'];

  constructor() {
    //super();
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
    this.y = 150;
    this.x = 150;
    console.log('Statusbar liegt auf der y-Achse (y = ' + this.y + ')');
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let pathe = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[pathe];
  }
}
