class Level {
  enemiesAnt;
  clouds;
  backgroundObjecktRocks;
  level_end_x = 3750;
  coins;
  bottle;

  constructor(enemiesAnt, clouds, backgroundObjecktRocks, coins, bottle) {
    this.enemiesAnt = enemiesAnt;
    this.clouds = clouds;
    this.backgroundObjecktRocks = backgroundObjecktRocks;
    this.coins = coins;
    this.bottle = bottle;
    this.initializeCoins();
  }

  initializeCoins() {
    this.coins.forEach(coin => coin.animate());
  }
}
