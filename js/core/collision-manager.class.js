class CollisionManager {
  constructor(world) {
    this.world = world;
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

  // handleEnemyCollision(enemy) {
  //   setTimeout(() => {
  //     this.world.character.energy -= 5;
  //     if (this.world.character.energy <= 0) {
  //       this.world.character.energy = 0;
  //     }
  //     this.world.statusBar.setPercentage(this.world.character.energy);
  //     console.log('Kollision mit Gegner, Energie:', this.world.character.energy);
  //   }, 2.0 * 2000);
  // }
  handleEnemyCollision(enemy) {
    if (!this.world.character.hit && !this.world.character.isDeath()) {
      this.world.character.energy -= 2; // Weniger Schaden
      if (this.world.character.energy <= 0) {
        this.world.character.energy = 0;
        this.world.character.hit = true;
        setTimeout(() => {
          this.world.character.hit = false;
        }, 1500); // Längere Invulnerabilität
      }
      this.world.statusBar.setPercentage(this.world.character.energy);
      console.log('Kollision mit Gegner, Energie:', this.world.character.energy);
    }
  }

  handleCoinCollection(coin) {
    coin.collect();
    // Hier können Sie die Münzen-Punktzahl erhöhen
    console.log('Münze gesammelt!');
  }

  handleBottleCollection(bottle) {
    bottle.collect();
    // Hier können Sie die Flaschen-Punktzahl erhöhen
    console.log('Flasche gesammelt!');
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
