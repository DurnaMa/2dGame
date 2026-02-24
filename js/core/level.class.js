class Level {
  enemies;
  endBoss;
  backgroundObjectRocks;
  level_end_x = Config.LEVEL_END;
  coins;
  bottles;
  throwableObject;

  constructor(enemies, endBoss, backgroundObjectRocks, coins, bottles, throwableObject = []) {
    this.enemies = enemies;
    this.endBoss = endBoss;
    this.backgroundObjectRocks = backgroundObjectRocks;
    this.coins = coins;
    this.bottles = bottles;
    this.throwableObject = throwableObject;
    this.initializeCoins();
    this.initializeBottles();
  }

  /**
   * Starts the animation for all coins.
   */
  initializeCoins() {
    this.coins.forEach((coin) => coin.animate());
  }

  /**
   * Starts the animation for all bottles.
   */
  initializeBottles() {
    this.bottles.forEach((bottle) => bottle.animate());
  }
}
