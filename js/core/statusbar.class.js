class Statusbar extends DrawableObject {
  percentage = 100;

  CHARACTER_STATUSBAR = [
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/hpBar/hp_bar_full00.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/hpBar/hp_bar_full01.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/hpBar/hp_bar_full02.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/hpBar/hp_bar_full03.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/hpBar/hp_bar_full04.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/hpBar/hp_bar_full05.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/hpBar/hp_bar_full06.png',
  ];

  constructor() {
    super();
    this.loadImages(this.CHARACTER_STATUSBAR);
    this.y = 10;
    this.x = 10;
    this.width = 200;
    this.height = 30;
    this.visible = true;
    this.setPercentage(100);

    console.log('Statusbar liegt auf der y-Achse (y = ' + this.y + ')');
  }

  setPercentage(percentage) {
    this.percentage = Math.round(percentage);
    if (this.percentage <= 0) {
      this.percentage = 0;
      this.visible = false;
    } else {
      this.visible = true;
    }
    let path = this.CHARACTER_STATUSBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage <= 0) return 0;

    switch (true) {
      case this.percentage >= 100: return 6;
      case this.percentage >= 83.33: return 5;
      case this.percentage >= 66.66: return 4;
      case this.percentage >= 50: return 3;
      case this.percentage >= 33.33: return 2;
      case this.percentage >= 16.66: return 1;
      default: return 0;
    }
  }
}
