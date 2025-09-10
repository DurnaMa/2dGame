class Coins extends Item {
  y = 550;
  height = 50;
  width = 50;
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

    // Bessere Positionierung innerhalb des sichtbaren Bereichs
    //this.x = 400 + Math.random() * 2500;
    this.x = xPosition;
    this.y = 340 + Math.random() * 150;

    // Sicherstellen, dass das erste Bild geladen ist
    this.img = this.imageCache[this.ITEMS[0]];

    // Debug: Überprüfen der Bildladung
    setTimeout(() => {
      if (this.imageCache[this.ITEMS[0]]) {
        console.log('Münze erfolgreich geladen an Position:', this.x, this.y);
      } else {
        console.warn('Münze konnte nicht geladen werden an Position:', this.x, this.y);
      }
    }, 100);

    //console.log('Münze liegt auf der y-Achse (y = ' + this.y + ')');
  }

  animate() {
    // Animation nur starten, wenn Bilder geladen sind
    if (this.imageCache[this.ITEMS[0]]) {
      setInterval(() => {
        this.playItems(this.ITEMS);
      }, 150);
    }
  }

  // Überschreiben der collect Methode, um Sichtbarkeit zu ändern
  collect() {
    super.collect();
    this.visible = false;
  }


    findCoinPosition(xPosition, tries = 0) {
    if (tries > 20) {
      this.x = xPosition;
      this.y = 320 + Math.random() * 150;
      return;
    }
    this.x = xPosition;
    this.y = 320 + Math.random() * 150;

    let bottle = bottel.find((c) => c !== this && Math.abs(c.x - this.x) < 60);
    let coin = coins.find((c) => Math.abs(c.x - this.x) < 60);

    if (bottle || coin) {
      this.findCoinPosition(xPosition, tries + 1);
    }
  }
}
