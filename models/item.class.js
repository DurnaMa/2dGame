class Item extends MoveleObjekt {

  SPRITES = [];

  constructor() {
    super();
    this.loadImages(this.SPRITES);
    
  }

  animate() {
    setInterval(() => {
      this.playItems(this.SPRITES);
    }, 150);
  }
}
