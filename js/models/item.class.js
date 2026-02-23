class Item extends MovableObject {
  constructor() {
    super();
  }

  collect() {
    this.collected = true;
    this.visible = false;
  }

  isCollected() {
    return this.collected;
  }

  isVisible() {
    return this.visible && !this.collected;
  }
}
