class StartScreen {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.isVisible = true;

    this.playButtonImg = new Image();
    this.playButtonImg.src = 'assets/fantasy-platformer-game-ui/PNG/05ogin&pass/play_button.png';
    this.imageLoaded = false;

    this.buttonWidth = 200;
    this.buttonHeight = 80;
    this.buttonX = (canvas.width - this.buttonWidth) / 2;
    this.buttonY = (canvas.height - this.buttonHeight) / 2;

    this.isHovered = false;

    this.playButtonImg.onload = () => {
      this.imageLoaded = true;
      const isMobile = window.innerHeight < 480 || window.innerWidth < 750;
      const scale = isMobile ? 1.0 : 1.5; // Smaller button on mobile
      this.buttonWidth = this.playButtonImg.width * scale;
      this.buttonHeight = this.playButtonImg.height * scale;
      this.buttonX = (canvas.width - this.buttonWidth) / 2;
      this.buttonY = (canvas.height - this.buttonHeight) / 2;
      this.draw();
    };
  }

  draw() {
    if (!this.isVisible) return;

    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawButton();
  }

  drawButton() {
    if (!this.imageLoaded) {
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '24px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('Loading...', this.canvas.width / 2, this.canvas.height / 2);
      return;
    }

    this.ctx.save();

    if (this.isHovered) {
      const hoverScale = 1.05;
      const scaledWidth = this.buttonWidth * hoverScale;
      const scaledHeight = this.buttonHeight * hoverScale;
      const offsetX = (scaledWidth - this.buttonWidth) / 2;
      const offsetY = (scaledHeight - this.buttonHeight) / 2;

      this.ctx.globalAlpha = 0.9;
      this.ctx.drawImage(this.playButtonImg, this.buttonX - offsetX, this.buttonY - offsetY, scaledWidth, scaledHeight);
    } else {
      this.ctx.drawImage(this.playButtonImg, this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
    }

    this.ctx.restore();
  }

  isButtonClicked(x, y) {
    return (
      x >= this.buttonX &&
      x <= this.buttonX + this.buttonWidth &&
      y >= this.buttonY &&
      y <= this.buttonY + this.buttonHeight
    );
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
