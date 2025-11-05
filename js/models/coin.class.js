class Coin extends Item {
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

      } else {
        //console.warn('Münze konnte nicht geladen werden an Position:', this.x, this.y);
      }
    }, 100);


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

}
