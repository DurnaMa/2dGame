class Level {
  enemiesAnt;
  clouds;
  backgroundObjectRocks;
  level_end_x = 7520;
  coins;
  bottles;

  constructor(enemiesAnt, clouds, backgroundObjectRocks, coins, bottles) {
    this.enemiesAnt = enemiesAnt;
    this.clouds = clouds;
    this.backgroundObjectRocks = backgroundObjectRocks;
    this.coins = coins;
    this.bottles = bottles;
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
