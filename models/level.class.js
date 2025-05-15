class Level {
  enemiesAnt;
  clouds;
  backgroundObjecktRocks;
  level_end_x = 3700;
  coins;
  bottles;

  constructor(enemiesAnt, clouds, backgroundObjecktRocks, coins, bottles) {
    this.enemiesAnt = enemiesAnt;
    this.clouds = clouds;
    this.backgroundObjecktRocks = backgroundObjecktRocks;
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
