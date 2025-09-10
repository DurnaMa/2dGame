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

  findBottlePosition(xPosition, tries = 0) {
    if (tries > 20) {
      this.x = xPosition;
      this.y = 320 + Math.random() * 150;
      return;
    }
    this.x = xPosition;
    this.y = 320 + Math.random() * 150;

    let bottle = bottel.find((c) => c !== this && Math.abs(c.x - this.x) < 60);
    let coin = coins.find((c) => Math.abs(c.x - this.x) < 60);

    if (coin || bottle) {
      this.findBottlePosition(xPosition, tries + 1);
    }
  }

  animate() {
    setInterval(() => {
      this.playItems(this.ITEMS);
    }, 200);
  }
}
