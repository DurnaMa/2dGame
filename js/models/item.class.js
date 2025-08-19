class Item extends MovableObject {
  y = 450;
  height = 50;
  width = 50;
  collected = false;
  visible = true;

  constructor() {
    super();
    // Positionierung entfernt, da sie in den abgeleiteten Klassen gesetzt wird
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
