class Sprite extends MoveleObjekt {
    constructor(image, x, y, width, height, frameX = 0, frameY = 0) {
      this.image = image;

      this.x = x; // Position auf dem Canvas
      this.y = y;
      this.width = width; // Breite eines einzelnen Sprites im Sheet
      this.height = height; // Höhe eines einzelnen Sprites im Sheet
      this.frameX = frameX; // Aktueller Frame in der X-Achse des Sheets (für Animation)
      this.frameY = frameY; // Aktueller Frame in der Y-Achse des Sheets (für Animation)
    }
  
    draw(ctx) {
      ctx.drawImage(
        this.image,
        this.frameX * this.width, // sx: Start-X im Sprite Sheet
        this.frameY * this.height, // sy: Start-Y im Sprite Sheet
        this.width,              // sWidth: Breite des Ausschnitts
        this.height,             // sHeight: Höhe des Ausschnitts
        this.x,                  // dx: Ziel-X auf dem Canvas
        this.y,                  // dy: Ziel-Y auf dem Canvas
        this.width,              // dWidth: Breite auf dem Canvas
        this.height              // dHeight: Höhe auf dem Canvas
      );
    }
  }