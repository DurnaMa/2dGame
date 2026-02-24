class Item extends MovableObject {
  constructor() {
    super();
  }

  /**
   * Marks the item as collected.
   */
  collect() {
    this.collected = true;
    this.visible = false;
  }

  /**
   * Checks if the item has been collected.
   * @returns {boolean} True if the item has been collected
   */
  isCollected() {
    return this.collected;
  }

  /**
   * Checks if the item is visible.
   * @returns {boolean} True if the item is visible and not collected
   */
  isVisible() {
    return this.visible && !this.collected;
  }
}
