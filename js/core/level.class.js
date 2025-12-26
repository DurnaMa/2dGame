class Level {
  enemiesAnt;
  endBoss;
  backgroundObjectRocks;
  level_end_x = GAME_CONFIG.LEVEL_END;
  coins;
  bottles;
  throwableObject;

  constructor(enemiesAnt, endBoss, backgroundObjectRocks, coins, bottles, throwableObject = []) {
    this.enemiesAnt = enemiesAnt;
    this.endBoss = endBoss;
    this.backgroundObjectRocks = backgroundObjectRocks;
    this.coins = coins;
    this.bottles = bottles;
    this.throwableObject = throwableObject;
    this.initializeCoins();
    this.initializeBottles();
  }

  initializeCoins() {
    this.coins.forEach(coin => coin.animate());
  }

  initializeBottles() {
    this.bottles.forEach(bottle => bottle.animate());
  }
}
