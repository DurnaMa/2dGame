class StartScreen {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.isVisible = true;
    
    // Load play button image
    this.playButtonImg = new Image();
    this.playButtonImg.src = 'assets/fantasy-platformer-game-ui/PNG/05ogin&pass/play_button.png';
    this.imageLoaded = false;
    
    // Play button properties - will be adjusted after image loads
    this.buttonWidth = 200;
    this.buttonHeight = 80;
    this.buttonX = (canvas.width - this.buttonWidth) / 2;
    this.buttonY = (canvas.height - this.buttonHeight) / 2;
    
    // Hover state
    this.isHovered = false;
    
    // Load image and adjust button size
    this.playButtonImg.onload = () => {
      this.imageLoaded = true;
      // Keep aspect ratio
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

    // Draw semi-transparent overlay (don't clear canvas!)
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw Play button
    this.drawButton();
  }

  drawButton() {
    if (!this.imageLoaded) {
      // Show loading text while image loads
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '24px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('Loading...', this.canvas.width / 2, this.canvas.height / 2);
      return;
    }

    // Draw the play button image
    this.ctx.save();
    
    // Add hover effect (slight scale and brightness)
    if (this.isHovered) {
      const hoverScale = 1.05;
      const scaledWidth = this.buttonWidth * hoverScale;
      const scaledHeight = this.buttonHeight * hoverScale;
      const offsetX = (scaledWidth - this.buttonWidth) / 2;
      const offsetY = (scaledHeight - this.buttonHeight) / 2;
      
      this.ctx.globalAlpha = 0.9;
      this.ctx.drawImage(
        this.playButtonImg,
        this.buttonX - offsetX,
        this.buttonY - offsetY,
        scaledWidth,
        scaledHeight
      );
    } else {
      this.ctx.drawImage(
        this.playButtonImg,
        this.buttonX,
        this.buttonY,
        this.buttonWidth,
        this.buttonHeight
      );
    }
    
    this.ctx.restore();
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
