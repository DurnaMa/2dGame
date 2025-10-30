class Magicbar extends DrawableObject {
  percentage = 0; // Start with empty magic bar

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
    'assets/fantasy-platformer-game-ui/PNG/16Inner_Interface/magic_bar/12energy-magic.png',
  ];

  constructor() {
    super();
    this.loadImages(this.CHARACTER_MAGIC_BAR);
    this.y = 40;
    this.x = 10;
    this.width = 200;
    this.height = 30;
    this.visible = true;
    this.setPercentage(0); // Start with empty magic bar

    //console.log('Statusbar liegt auf der y-Achse (y = ' + this.y + ')');
  }

  addMagic(amount = 8.34) {
    if (this.percentage < 100) {
      this.setPercentage(Math.min(100, this.percentage + amount));
    }
  }

  useMagic(amount = 8.34) {
    if (this.percentage > 0) {
      this.setPercentage(this.percentage - amount)
    }
  }

  setPercentage(percentage) {
    this.percentage = Math.round(percentage);
    if (this.percentage <= 0) {
      this.percentage = 0;
    //   this.visible = false;
    // } else {
    //   this.visible = true;
    }
    let path = this.CHARACTER_MAGIC_BAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Calculates the correct image index based on the current percentage.
   * There are 12 images for the bar's progression (1 to 12) and one for the empty state (0).
   * The percentage is divided into 12 equal segments.
   * @returns {number} The index of the image to display.
   */
  resolveImageIndex() {
    if (this.percentage <= 0) return 0;

    switch (true) {
      case this.percentage >= 91.67: return 12;
      case this.percentage >= 83.34: return 11;
      case this.percentage >= 75: return 10;
      case this.percentage >= 66.67: return 9;
      case this.percentage >= 58.34: return 8;
      case this.percentage >= 50: return 7;
      case this.percentage >= 41.67: return 6;
      case this.percentage >= 33.34: return 5;
      case this.percentage >= 25: return 4;
      case this.percentage >= 16.67: return 3;
      case this.percentage >= 16.66: return 2;
      case this.percentage >= 8.34: return 1;
      default: return 0;
    }
  }
}
