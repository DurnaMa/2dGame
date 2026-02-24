/**
 * ThrowableObject - Fireball that flies in the direction of the character.
 * IMPORTANT: Constructor requires 3 parameters; x, y, and world
 * - world is needed to check character.otherDirection
 * - IF otherDirection = true -> Fireball flies LEFT (negative speedX)
 * - IF otherDirection = false -> Fireball flies RIGHT (positive speedX)
 */

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

  constructor(x, y, world) {
    super();
    this.loadImage(this.IMAGES_FIRE[0]);
    this.loadImages(this.IMAGES_FIRE);
    this.x = x;
    this.y = y;
    this.startX = x;
    this.world = world;
    this.trow();
  }

  /**
   * Throws the fireball in the direction of the character.
   */
  trow() {
    if (this.world.character.otherDirection) {
      this.speedX = -Config.THROWABLE.SPEED_X;
    } else {
      this.speedX = Config.THROWABLE.SPEED_X;
    }

    setInterval(() => {
      this.x += this.speedX;
    }, 1000 / Config.THROWABLE.UPDATE_RATE);
  }
}
