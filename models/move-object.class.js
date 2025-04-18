class MoveleObjekt {
  x = 120;
  y = 520;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   *
   * @param {Array} arr - ['/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk1.png',
   * '/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/Walk/walk2.png' ...]
   */
  loadImages(arr) {
    arr.forEach( (path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });

  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  moveRight() {}
}
