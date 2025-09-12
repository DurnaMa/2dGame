class Bottle extends Item {
  y = 450;
  height = 50;
  width = 50;
  collected = false;
  visible = true;

  ITEMS = ['assets/potion-icons-pixel-art/PNG/Transperent/1_0027_Bottle28.png'];

  constructor(xPosition) {
    super();
    this.loadImages(this.ITEMS);
    this.loadImage('assets/potion-icons-pixel-art/PNG/Transperent/1_0027_Bottle28.png');
    this.x = xPosition;

    //this.findBottlePosition();
    this.y = 320 + Math.random() * 150;
  }

  animate() {
    setInterval(() => {
      this.playItems(this.ITEMS);
    }, 200);
  }
}
