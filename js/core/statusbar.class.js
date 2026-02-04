class Statusbar extends DrawableObject {
  percentage = GAME_CONFIG.UI.STATUSBAR.PERCENTAGE_START;

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
    this.y = GAME_CONFIG.UI.STATUSBAR.Y;
    this.x = GAME_CONFIG.UI.STATUSBAR.X;
    this.width = GAME_CONFIG.UI.STATUSBAR.WIDTH;
    this.height = GAME_CONFIG.UI.STATUSBAR.HEIGHT;
    this.visible = true;
    this.setPercentage(GAME_CONFIG.UI.STATUSBAR.PERCENTAGE_START);
  }

  setPercentage(percentage) {
    this.percentage = Math.round(percentage);
    if (this.percentage <= 0) {
      this.percentage = 0;
      if (window.world && window.world.character) {
        window.world.character.energy = 0;
      }
    }
    let path = this.CHARACTER_STATUSBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage === 0) return 0;

    switch (true) {
      case this.percentage >= 100:
        return 6;
      case this.percentage >= 80:
        return 5;
      case this.percentage >= 60:
        return 4;
      case this.percentage >= 40:
        return 3;
      case this.percentage >= 20:
        return 2;
      default:
        return 1;
    }
  }
}
