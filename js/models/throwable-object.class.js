/**
 * ThrowableObject - Feuerball, der in die Blickrichtung des Charakters fliegt
 * WICHTIG: Constructor braucht 3 Parameter; x, y, und world
 * - world wird benötigt, um character.otherDirection zu prüfen
 * - WENN otherDirection = true -> Feurball fliegt nach LINKS (negativer speedX)
 * - WENN otherDirection = false ist fliegt nach RECHTS (positiver speedX)
 */

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

  constructor(x, y, world) {
    super();
    this.loadImage(this.IMAGES_FIRE[0]);
    this.loadImages(this.IMAGES_FIRE);
    this.x = x;
    this.y = y;
    this.startX = x;
    this.world = world;
    this.trow()
  }

  trow() {
    if (this.world.character.otherDirection) {
    this.speedX = -GAME_CONFIG.THROWABLE.SPEED_X;
    } else {
      this.speedX = GAME_CONFIG.THROWABLE.SPEED_X;
    }

    setInterval(() => {
      this.x += this.speedX;
    }, 1000 / GAME_CONFIG.THROWABLE.UPDATE_RATE);
  }


}
