class Level {
  enemiesAnt;
  clouds;
  backgroundObjecktRocks;
  level_end_x = 3750;
  coins;

  constructor(enemiesAnt, clouds, backgroundObjecktRocks, coins) {
    this.enemiesAnt = enemiesAnt;
    this.clouds = clouds;
    this.backgroundObjecktRocks = backgroundObjecktRocks;
    this.coins = coins;
    this.initializeCoins();
  }

  initializeCoins() {
    this.coins.forEach(coin => coin.animate());
  }
}
