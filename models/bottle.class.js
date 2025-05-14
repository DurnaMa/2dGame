class Bottle extends Item {
  ITEMS = ['assets/potion-icons-pixel-art/PNG/Transperent/1_0027_Bottle28.png'];

  constructor() {
    super();
    this.loadImages(this.ITEMS);
  }

  animate() {
    setInterval(() => {
      this.playItems(this.ITEMS);
    }, 200);
  }
}
