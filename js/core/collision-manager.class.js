class CollisionManager {
  constructor(world) {
    this.world = world;
  }

  // Prüft ob der Spieler von oben auf den Gegner springt
  isJumpingOnEnemy(character, enemy) {
    // 1. Spieler muss fallen (speedY < 0)
    // 2. Spieler muss über dem Gegner sein
    // 3. Kollision muss im oberen Drittel des Gegners stattfinden
    const isPlayerFalling = character.speedY < 0;
    const playerBottom = character.y + character.height;
    const enemyTopThird = enemy.y + enemy.height / 3;

    return isPlayerFalling && playerBottom < enemyTopThird;
  }

  checkAllCollisions() {
    this.checkEnemyCollisions();
    this.checkItemCollisions();
    this.checkEndbossCollisions();
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
    // Debug-Informationen ausgeben
    console.log('=== Kollision mit Gegner ===');
    console.log('Spieler Position Y:', this.world.character.y);
    console.log('Gegner Position Y:', enemy.y);
    console.log('Spieler speedY:', this.world.character.speedY);
    console.log('Spieler Höhe:', this.world.character.height);
    console.log('Gegner Höhe:', enemy.height);

    // Prüfen ob Spieler von oben kommt
    if (this.isJumpingOnEnemy(this.world.character, enemy)) {
      console.log('Treffer von oben!');
      // Hier später: Gegner eliminieren
      return;
    }

    // Normaler Treffer (von der Seite)
    if (!this.world.character.hit && !this.world.character.isDeath()) {
      this.world.character.hit = true;
      // Bei 100 Energie = 6 Stufen, also 100/6 ≈ 16.67 pro Stufe
      this.world.character.energy -= Math.floor(100 / 6);
      if (this.world.character.energy <= 0) {
        this.world.character.energy = 0;
      }
      this.world.statusBar.setPercentage(this.world.character.energy);
      console.log('Kollision mit Gegner, Energie:', this.world.character.energy);

      // Nach 1.5 Sekunden kann der Charakter wieder getroffen werden
      setTimeout(() => {
        this.world.character.hit = false;
      }, 1500);
    }
  }

  handleCoinCollection(coin) {
    coin.collect();
    // Hier können Sie die Münzen-Punktzahl erhöhen
    console.log('Münze gesammelt!');
  }

  handleBottleCollection(bottle) {
    bottle.collect();
    // Fill magic bar when collecting a bottle
    this.world.magicBar.addMagic(16.67); // Adds 1/6 of the magic bar
    console.log('Flasche gesammelt! Magic erhöht!');
  }

  handleEndbossCollision(endboss) {
    if (!this.world.character.hit && !this.world.character.isDeath()) {
      this.world.character.energy -= 5; // Weniger Schaden vom Endboss
      if (this.world.character.energy <= 0) {
        this.world.character.energy = 0;
        this.world.character.hit = true;
        setTimeout(() => {
          this.world.character.hit = false;
        }, 1500);
      }
      this.world.statusBar.setPercentage(this.world.character.energy);
      console.log('Kollision mit Endboss, Energie:', this.world.character.energy);
    }
  }
}
