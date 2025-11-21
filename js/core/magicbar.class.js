class Magicbar extends DrawableObject {
  percentage = GAME_CONFIG.UI.MAGICBAR.PERCENTAGE_START;
  shots = 0

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
    this.y = GAME_CONFIG.UI.MAGICBAR.Y;
    this.x = GAME_CONFIG.UI.MAGICBAR.X;
    this.width = GAME_CONFIG.UI.MAGICBAR.WIDTH;
    this.height = GAME_CONFIG.UI.MAGICBAR.HEIGHT;
    this.visible = true;
    this.setPercentage(GAME_CONFIG.UI.MAGICBAR.PERCENTAGE_START);
  }

  addMagic(amount = GAME_CONFIG.UI.MAGICBAR.MAGIC_ADD_AMOUNT) {
    if (this.shots <= 12) {
      this.shots++;
      const percentage = 100 / 12; // 8.34
      this.setPercentage(percentage * this.shots);
    }
  }

  useMagic(amount = GAME_CONFIG.UI.MAGICBAR.MAGIC_USE_AMOUNT) {
    this.shots--;
    const percentage = 100 / 12; // 8.34
    this.setPercentage(percentage * this.shots);
  }

  setPercentage(percentage) {
    this.percentage = Math.round(percentage);
    if (this.percentage <= 0) {
      this.percentage = 0;
    }
    //let path = this.CHARACTER_MAGIC_BAR[this.resolveImageIndex()];
    let path = this.CHARACTER_MAGIC_BAR[this.shots]
    this.img = this.imageCache[path];
  }
}
