class CollisionManager {

  constructor(world) {
    this.world = world;
  }

  // Prüft ob der Spieler von oben auf den Gegner springt
 isJumpingOnEnemy(character, enemy) {
    // Berechne die tatsächlichen Kollisionspunkte
    const playerFeet = character.y + character.height - character.offset.bottom;
    const playerCenter = character.y + (character.height / 2);
    const enemyHead = enemy.y + enemy.offset.top;
    const enemyCenter = enemy.y + (enemy.height / 2);
    // 1. Spieler muss fallen
    const isPlayerFalling = character.speedY < 0;
    // 2. Berechne die vertikale Distanz zwischen Spielerfüßen und Gegnerkopf
    const heightDifference = playerFeet - enemyHead;
    // Treffer ist gültig wenn der Abstand positiv aber nicht zu groß ist
    const isHittingWithFeet = heightDifference >= 0 && heightDifference <= GAME_CONFIG.COLLISION.JUMP_KILL_HEIGHT_MAX;
    // 3. Spieler muss sich in der richtigen Position befinden
    const isPositionedAbove = playerCenter < enemyCenter;
    return isPlayerFalling && isHittingWithFeet && isPositionedAbove;
  }
  
  checkAllCollisions() {
    this.checkEnemyCollisions();
    this.checkItemCollisions();
    this.checkEndbossCollisions();
    this.cleanupDeadEnemies();
  }

  cleanupDeadEnemies() {
    // Entferne alle Gegner die markedForRemoval Flag haben
    this.world.level.enemiesAnt = this.world.level.enemiesAnt.filter(
      enemy => !enemy.markedForRemoval
    );
  }

  checkEnemyCollisions() {
    this.world.level.enemiesAnt.forEach((enemy) => {
      if (this.world.character.isColliding(enemy)) {
        this.handleEnemyCollision(enemy);
      }
    });
  }

  checkItemCollisions() {
    this.world.level.coins.forEach((coin) => {
      if (!coin.isCollected() && this.world.character.isColliding(coin)) {
        this.handleCoinCollection(coin);
      }
    });

    this.world.level.bottles.forEach((bottle) => {
      if (!bottle.isCollected() && this.world.character.isColliding(bottle)) {
        this.handleBottleCollection(bottle);
      }
    });
  }

  checkEndbossCollisions() {
    if (this.world.level.enemiesAnt.some((enemy) => enemy instanceof Endboss)) {
      const endboss = this.world.level.enemiesAnt.find((enemy) => enemy instanceof Endboss);
      if (this.world.character.isColliding(endboss)) {
        this.handleEndbossCollision(endboss);
      }
    }
  }

  handleEnemyCollision(enemy) {
    const character = this.world.character;

    // Frühzeitig beenden wenn der Spieler nach oben springt
    if (character.speedY > 0) {
      return false;
    }
    // Prüfen ob Spieler von oben kommt
    if (this.isJumpingOnEnemy(this.world.character, enemy)) {      // 1. Gegner "stirbt"
      enemy.isDead = true;
      // 2. Spieler springt automatisch hoch
      this.world.character.speedY += GAME_CONFIG.COLLISION.JUMP_BOUNCE_POWER;      // 3. Kurze Unverwundbarkeit
      this.world.character.hit = true;
      setTimeout(() => {
        this.world.character.hit = false;
      }, GAME_CONFIG.COLLISION.INVULNERABILITY_SHORT);
      // Keine weitere Kollisionsbehandlung nötig
      return;
    }
    // Normaler Treffer (von der Seite)
    if (!this.world.character.hit && !this.world.character.isDeath()) {
      this.world.character.hit = true;
      // Bei 100 Energie = 6 Stufen, also 100/6 ≈ 16.67 pro Stufe
      this.world.character.energy -= GAME_CONFIG.COLLISION.DAMAGE_NORMAL;
      if (this.world.character.energy <= 0) {
        this.world.character.energy = 0;
      }
      this.world.statusBar.setPercentage(this.world.character.energy);
      // Nach 1.5 Sekunden kann der Charakter wieder getroffen werden
      setTimeout(() => {
        this.world.character.hit = false;
      }, GAME_CONFIG.COLLISION.INVULNERABILITY_LONG);
    }
  }

  handleCoinCollection(coin) {
    coin.collect();
    // Hier können Sie die Münzen-Punktzahl erhöhen
  }

  handleBottleCollection(bottle) {
    bottle.collect();
    // Fill magic bar when collecting a bottle
    this.world.magicBar.addMagic(GAME_CONFIG.BOTTLE.MAGIC_AMOUNT); // Adds 1/6 of the magic bar
  }

  handleEndbossCollision(endboss) {
    if (!this.world.character.hit && !this.world.character.isDeath()) {
      this.world.character.energy -= GAME_CONFIG.COLLISION.DAMAGE_BOSS; // Weniger Schaden vom Endboss
      if (this.world.character.energy <= 0) {
        this.world.character.energy = 0;
        this.world.character.hit = true;
        setTimeout(() => {
          this.world.character.hit = false;
        }, GAME_CONFIG.COLLISION.INVULNERABILITY_LONG);
      }
      this.world.statusBar.setPercentage(this.world.character.energy);
    }
  }
}
