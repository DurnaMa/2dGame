class ThrowableObject extends MovableObject {
  IMAGES_FIRE = [
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire1.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire2.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire3.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire4.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire5.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire6.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire7.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire8.png',
    'assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Mage/Fire/fire9.png',
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES_FIRE);
    this.x;
    this.y;
  }
}
