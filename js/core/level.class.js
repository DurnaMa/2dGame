class Level {
  enemiesAnt;
  backgroundObjectRocks;
  level_end_x = 7520;
  coins;
  bottles;
  throwableObject;

  constructor(enemiesAnt, backgroundObjectRocks, coins, bottles, throwableObject = []) {
    this.enemiesAnt = enemiesAnt;
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
