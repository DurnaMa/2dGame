class Bottle extends Item {
  height = 50;
  width = 50;

  constructor() {
    super();
    this.loadImage(this.SPRITES);
    this.x = 350 + Math.random() * 2000;
    this.y = 340 + Math.random() * 150;

    console.log('Bottle liegt auf der y-Achse (y = ' + this.y + ')');
  }

  SPRITES = ['/assets/sprite-effects/1_0027_Bottle28.png'];
}
