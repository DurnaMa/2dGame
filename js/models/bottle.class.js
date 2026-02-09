class Bottle extends Item {
  y = 450;
  height = Config.BOTTLE.HEIGHT;
  width = Config.BOTTLE.WIDTH;
  collected = false;
  visible = true;

  ITEMS = ['assets/potion-icons-pixel-art/PNG/Transperent/1_0027_Bottle28.png'];

  constructor(xPosition) {
    super();
    this.loadImages(this.ITEMS);
    this.loadImage('assets/potion-icons-pixel-art/PNG/Transperent/1_0027_Bottle28.png');
    this.x = xPosition;

    //this.findBottlePosition();
    this.y = Config.BOTTLE.Y_BASE + Math.random() * Config.BOTTLE.Y_RANGE;
  }

  animate() {
    setInterval(() => {
      this.playItems(this.ITEMS);
    }, Config.BOTTLE.ANIMATION_SPEED);
  }
}
