class Bottle extends Item {
  ITEMS = ['assets/potion-icons-pixel-art/PNG/Transperent/1_0027_Bottle28.png'];

  constructor() {
    super();
    this.loadImage('assets/potion-icons-pixel-art/PNG/Transperent/1_0027_Bottle28.png');
    this.loadImages(this.ITEMS);
    this.x = 350 + Math.random() * 2000;
    this.y = 380 + Math.random() * 230;
  }

  animate() {
    setInterval(() => {
      this.playItems(this.ITEMS);
      this.zoom = 1;
    }, 200);
  }
}
