class Coin extends Item {
  y = 550;
  height = Config.COIN.HEIGHT;
  width = Config.COIN.WIDTH;
  currentImage = 0;
  visible = true;

  ITEMS = [
    'assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin1.png',
    'assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin2.png',
    'assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin3.png',
    'assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin4.png',
    'assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin5.png',
    'assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin6.png',
    'assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin7.png',
    'assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin8.png',
    'assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin9.png',
    'assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin10.png',
  ];

  constructor(xPosition) {
    super();
    this.loadImages(this.ITEMS);

    this.x = xPosition;
    this.y = Config.COIN.Y_BASE + Math.random() * Config.COIN.Y_RANGE;

    this.img = this.imageCache[this.ITEMS[0]];

    setTimeout(() => {
      if (this.imageCache[this.ITEMS[0]]) {
      } else {
        console.warn('Münze konnte nicht geladen werden an Position:', this.x, this.y);
      }
    }, 100);
  }

  animate() {
    if (this.imageCache[this.ITEMS[0]]) {
      setInterval(() => {
        this.playItems(this.ITEMS);
      }, Config.COIN.ANIMATION_SPEED);
    }
  }

  collect() {
    super.collect();
    this.visible = false;
  }
}
