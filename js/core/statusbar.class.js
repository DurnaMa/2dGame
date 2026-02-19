class Statusbar extends DrawableObject {
  percentage = Config.UI.STATUSBAR.PERCENTAGE_START;

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
    this.y = Config.UI.STATUSBAR.Y;
    this.x = Config.UI.STATUSBAR.X;
    this.width = Config.UI.STATUSBAR.WIDTH;
    this.height = Config.UI.STATUSBAR.HEIGHT;
    this.visible = true;
    this.setPercentage(Config.UI.STATUSBAR.PERCENTAGE_START);
  }

  /**
   * EN:
   * Subtract exactly one level (20%) from the status bar and
   * synchronizes character.energy accordingly.
   * DE:
   * Zieht genau eine Stufe (20%) von der Statusbar ab und
   * synchronisiert character.energy entsprechend.
   * @param {Character} character
   */
  reduceHealth(character) {
    const newPercentage = Math.max(0, this.percentage - Config.STEP);
    this.setPercentage(newPercentage);
    if (character) {
      character.energy = newPercentage;
    }
  }

  /**
   * EM:
   * Subtracts a smaller amount (e.g., for boss damage),
   * but at least half a step.
   * DE:
   * Zieht einen kleineren Betrag ab (z.B. für Boss-Schaden),
   * jedoch mindestens eine halbe Stufe.
   * @param {Character} character
   * @param {number} amount – Prozentwert der abgezogen wird
   */
  reduceHealthBy(character, amount) {
    const newPercentage = Math.max(0, this.percentage - amount);
    this.setPercentage(newPercentage);
    if (character) {
      character.energy = newPercentage;
    }
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