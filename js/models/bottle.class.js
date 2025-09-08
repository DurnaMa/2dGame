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
    this.findBottlePosition();
  }

  findBottlePosition() {
    this.x = 400 + Math.random() * 1500;
    this.y = 320 + Math.random() * 150;

    let bottle = bottel.find(
      (c) =>
        (c.x < this.x && c.x > this.x - 60) ||
        (c.x > this.x && c.x < this.x + 60 && c.y < this.y && c.y > this.y - 60) ||
        (c.y > this.x && c.y < this.y + 60)
    );
    let coin = coins.find(
      (c) =>
        (c.x < this.x && c.x > this.x - 60) ||
        (c.x > this.x && c.x < this.x + 60 && c.y < this.y && c.y > this.y - 60) ||
        (c.y > this.x && c.y < this.y + 60)
    );

    if (coin || bottle) {
      this.findBottlePosition();
    }
  }

  animate() {
    setInterval(() => {
      this.playItems(this.ITEMS);
    }, 200);
  }
}
