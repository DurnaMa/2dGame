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

  CHARACTER_MAGIC_BAR = [
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/magic_bar/00energy-magic.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/magic_bar/01energy-magic.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/magic_bar/02energy-magic.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/magic_bar/03energy-magic.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/magic_bar/04energy-magic.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/magic_bar/05energy-magic.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/magic_bar/06energy-magic.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/magic_bar/07energy-magic.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/magic_bar/08energy-magic.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/magic_bar/09energy-magic.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/magic_bar/10energy-magic.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/magic_bar/11energy-magic.png',
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/magic_bar/12energy-magic.png'
  ]

  constructor() {
    super();
    //this.loadImages(this.IMAGES);
    this.loadImages(this.CHARACTER_STATUSBAR);
    this.y = 0;
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
