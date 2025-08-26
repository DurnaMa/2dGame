class Bottle extends Item {
  y = 450;
  height = 50;
  width = 50;
  collected = false;
  visible = true;

  ITEMS = ['assets/potion-icons-pixel-art/PNG/Transperent/1_0027_Bottle28.png'];

  constructor() {
    super();
    this.loadImage('assets/potion-icons-pixel-art/PNG/Transperent/1_0027_Bottle28.png');
    this.loadImages(this.ITEMS);
    this.x = 350 + Math.random() * 2000;
    this.y = 320 + Math.random() * 230;
  }

  animate() {
    setInterval(() => {
      this.playItems(this.ITEMS);
    }, 200);
  }
}
