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

  handleEnemyCollision(enemy) {
    setTimeout(() => {
      this.world.character.energy -= 5;
      if (this.world.character.energy <= 0) {
        this.world.character.energy = 0;
      }
      this.world.statusBar.setPercentage(this.world.character.energy);
      console.log('Kollision mit Gegner, Energie:', this.world.character.energy);
    }, 2.0 * 2000);
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
    this.world.character.energy -= 10;
    console.log('Kollision mit Endboss, Energie:', this.world.character.energy);
  }
}
