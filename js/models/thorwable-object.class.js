class ThrowableObject extends MovableObject {
  IMAGES_FIRE = [
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire1.png',
    // 'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire2.png',
    // 'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire3.png',
    // 'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire4.png',
    // 'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire5.png',
    // 'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire6.png',
    // 'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire7.png',
    // 'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire8.png',
    // 'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire9.png',
  ];

  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES_FIRE);
    this.x = x;
    this.y = y;
    this.trow()
  }

  trow() {
    this.speedX = GAME_CONFIG.THROWABLE.SPEED_X;
    setInterval(() => {
      this.x += this.speedX;
    }, 1000 / GAME_CONFIG.THROWABLE.UPDATE_RATE);
  }
}
