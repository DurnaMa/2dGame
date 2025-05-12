class Coins extends Item {
  y = 450;
  height = 50;
  width = 50;

  ITEMS = [
    '/assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin1.png',
    '/assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin2.png',
    '/assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin3.png',
    '/assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin4.png',
    '/assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin5.png',
    '/assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin6.png',
    '/assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin7.png',
    '/assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin8.png',
    '/assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin9.png',
    '/assets/mountain-platformer-pixel-art-tileset/PNG/items/Coin/coin10.png',
  ];

  constructor() {
    super();
    this.loadImages(this.ITEMS);
    this.x = 350 + Math.random() * 2000;
    this.y = 380 + Math.random() * 230;

    //console.log('Münze liegt auf der y-Achse (y = ' + this.y + ')');
  }

  animate() {
    setInterval(() => {
      this.playItems(this.ITEMS);
    }, 150 );
  }

}
