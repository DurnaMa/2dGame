class StartScreen {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.isVisible = true;
    
    // Play button properties
    this.buttonWidth = 200;
    this.buttonHeight = 60;
    this.buttonX = (canvas.width - this.buttonWidth) / 2;
    this.buttonY = (canvas.height - this.buttonHeight) / 2;
    
    // Hover state
    this.isHovered = false;
  }

  draw() {
    if (!this.isVisible) return;

    // Clear canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw Play button
    this.drawButton();
  }

  drawButton() {
    // Button background
    this.ctx.fillStyle = this.isHovered ? '#4a4a4a' : '#333';
    this.ctx.fillRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);

    // Button border
    this.ctx.strokeStyle = this.isHovered ? '#fff' : '#666';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);

    // Button text
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '32px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('Play', this.buttonX + this.buttonWidth / 2, this.buttonY + this.buttonHeight / 2);
  }

  isButtonClicked(x, y) {
    return x >= this.buttonX && 
           x <= this.buttonX + this.buttonWidth &&
           y >= this.buttonY && 
           y <= this.buttonY + this.buttonHeight;
  }

  checkHover(x, y) {
    this.isHovered = this.isButtonClicked(x, y);
  }

  hide() {
    this.isVisible = false;
  }

  show() {
    this.isVisible = true;
  }
}
