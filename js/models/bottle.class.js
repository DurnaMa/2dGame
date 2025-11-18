class Bottle extends Item {
  y = 450;
  height = GAME_CONFIG.BOTTLE.HEIGHT;
  width = GAME_CONFIG.BOTTLE.WIDTH;
  collected = false;
  visible = true;

  ITEMS = ['assets/potion-icons-pixel-art/PNG/Transperent/1_0027_Bottle28.png'];

  constructor(xPosition) {
    super();
    this.loadImages(this.ITEMS);
    this.loadImage('assets/potion-icons-pixel-art/PNG/Transperent/1_0027_Bottle28.png');
    this.x = xPosition;

    //this.findBottlePosition();
    this.y = GAME_CONFIG.BOTTLE.Y_BASE + Math.random() * GAME_CONFIG.BOTTLE.Y_RANGE;
  }

  animate() {
    setInterval(() => {
      this.playItems(this.ITEMS);
    }, GAME_CONFIG.BOTTLE.ANIMATION_SPEED);
  }
}
