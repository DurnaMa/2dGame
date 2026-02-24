/**
 * Represents a generic end screen (Win/Lose).
 */
class EndScreen {
  constructor(canvas, imagePath) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.isVisible = false;

    this.img = new Image();
    this.img.src = imagePath;
    this.imageLoaded = false;

    this.width = 400;
    this.height = 300;
    this.x = (canvas.width - this.width) / 2;
    this.y = (canvas.height - this.height) / 2;

    this.buttonWidth = 200;
    this.buttonHeight = 60;
    this.buttonX = (canvas.width - this.buttonWidth) / 2;
    this.buttonY = this.y + this.height + 20;

    this.isHovered = false;

    this.img.onload = () => {
      this.imageLoaded = true;

      const scale = 0.8;
      this.width = this.img.width * scale;
      this.height = this.img.height * scale;
      this.x = (canvas.width - this.width) / 2;
      this.y = (canvas.height - this.height) / 2 - 40;

      this.buttonX = (canvas.width - this.buttonWidth) / 2;
      this.buttonY = this.y + this.height + 20;
    };
  }

  /**
   * Draws the end screen with overlay and button.
   */
  draw() {
    if (!this.isVisible) return;

    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.imageLoaded) {
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    this.drawButton();
  }

  /**
   * Draws the restart button.
   */
  drawButton() {
    this.ctx.save();

    this.ctx.fillStyle = this.isHovered ? '#ffd700' : '#ffa500';
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 3;

    this.roundRect(this.ctx, this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight, 10, true, true);

    this.ctx.fillStyle = '#000';
    this.ctx.font = 'bold 24px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('MENÜ / RESTART', this.canvas.width / 2, this.buttonY + this.buttonHeight / 2);

    this.ctx.restore();
  }

  /**
   * Draws a rounded rectangle.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   * @param {number} x - The x coordinate
   * @param {number} y - The y coordinate
   * @param {number} width - The width of the rectangle
   * @param {number} height - The height of the rectangle
   * @param {number} radius - The radius of the corners
   * @param {boolean} fill - Whether to fill the rectangle
   * @param {boolean} stroke - Whether to stroke the rectangle
   */
  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof radius === 'undefined') radius = 5;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  /**
   * Checks if the button was clicked.
   * @param {number} x - The x coordinate of the click
   * @param {number} y - The y coordinate of the click
   * @returns {boolean} True if the button was clicked
   */
  isButtonClicked(x, y) {
    return (
      x >= this.buttonX &&
      x <= this.buttonX + this.buttonWidth &&
      y >= this.buttonY &&
      y <= this.buttonY + this.buttonHeight
    );
  }

  /**
   * Updates the hover state.
   * @param {number} x - The x coordinate of the mouse
   * @param {number} y - The y coordinate of the mouse
   */
  checkHover(x, y) {
    this.isHovered = this.isButtonClicked(x, y);
  }

  /**
   * Hides the screen.
   */
  hide() {
    this.isVisible = false;
  }

  /**
   * Shows the screen.
   */
  show() {
    this.isVisible = true;
  }
}

class GameOverScreen extends EndScreen {
  constructor(canvas) {
    super(canvas, 'assets/fantasy-platformer-game-ui/PNG/10Defeat/knight_loose.png');
  }
}

class WinScreen extends EndScreen {
  constructor(canvas) {
    super(canvas, 'assets/fantasy-platformer-game-ui/PNG/09Victory/knight_win.png');
  }
}
