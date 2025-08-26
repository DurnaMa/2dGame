class Item extends MovableObject {


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
