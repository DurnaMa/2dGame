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
    this.buttonY = (canvas.height - this.buttonHeight) / 2 + 80;

    this.isHovered = false;

    // Animation variables
    this.animationTime = 0;
    this.pulseScale = 1;

    this.playButtonImg.onload = () => {
      this.imageLoaded = true;
      const isMobile = window.innerHeight < 480 || window.innerWidth < 750;
      const scale = isMobile ? 1.0 : 1.5; // Smaller button on mobile
      this.buttonWidth = this.playButtonImg.width * scale;
      this.buttonHeight = this.playButtonImg.height * scale;
      this.buttonX = (canvas.width - this.buttonWidth) / 2;
      this.buttonY = (canvas.height - this.buttonHeight) / 2 + 80;
      this.draw();
    };
  }

  /**
   * Draws the start screen with overlay, title, and play button.
   */
  draw() {
    if (!this.isVisible) return;

    // Semi-transparent dark background
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Gradient overlay für Tiefenwirkung
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gradient.addColorStop(0, 'rgba(70, 130, 180, 0.2)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(139, 69, 19, 0.2)');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw title
    this.drawTitle();

    // Draw button
    this.drawButton();

    // Draw instructions
    this.drawInstructions();

    // Update animation
    this.animationTime += 0.02;
    this.pulseScale = 1 + Math.sin(this.animationTime * 3) * 0.05;
  }

  /**
   * Draws the game title.
   */
  drawTitle() {
    this.ctx.save();

    // Größerer Text für den Titel
    const isMobile = window.innerHeight < 480 || window.innerWidth < 750;
    const titleFontSize = isMobile ? 48 : 72;

    // Glow effect
    this.ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
    this.ctx.shadowBlur = 20;

    this.ctx.fillStyle = '#FFD700';
    this.ctx.font = `bold ${titleFontSize}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('ADVENTURE', this.canvas.width / 2, this.canvas.height / 4);

    // Subtitle
    this.ctx.shadowColor = 'rgba(255, 100, 0, 0.6)';
    this.ctx.shadowBlur = 15;
    this.ctx.fillStyle = '#FF6400';
    this.ctx.font = `bold ${titleFontSize * 0.5}px Arial`;
    this.ctx.fillText('QUEST', this.canvas.width / 2, this.canvas.height / 4 + titleFontSize * 0.6);

    this.ctx.restore();
  }

  /**
   * Draws the play button with hover effects.
   */
  drawButton() {
    if (!this.imageLoaded) {
      this.ctx.save();
      this.ctx.shadowColor = 'rgba(255, 215, 0, 0.5)';
      this.ctx.shadowBlur = 10;
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '24px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('Loading...', this.canvas.width / 2, this.canvas.height / 2);
      this.ctx.restore();
      return;
    }

    this.ctx.save();

    if (this.isHovered) {
      const hoverScale = 1.15;
      const scaledWidth = this.buttonWidth * hoverScale;
      const scaledHeight = this.buttonHeight * hoverScale;
      const offsetX = (scaledWidth - this.buttonWidth) / 2;
      const offsetY = (scaledHeight - this.buttonHeight) / 2;

      this.ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
      this.ctx.shadowBlur = 25;
      this.ctx.globalAlpha = 1;
      this.ctx.drawImage(this.playButtonImg, this.buttonX - offsetX, this.buttonY - offsetY, scaledWidth, scaledHeight);
    } else {
      // Pulse effect when not hovered
      const scaledWidth = this.buttonWidth * this.pulseScale;
      const scaledHeight = this.buttonHeight * this.pulseScale;
      const offsetX = (scaledWidth - this.buttonWidth) / 2;
      const offsetY = (scaledHeight - this.buttonHeight) / 2;

      this.ctx.shadowColor = 'rgba(255, 215, 0, 0.6)';
      this.ctx.shadowBlur = 15;
      this.ctx.globalAlpha = 0.95;
      this.ctx.drawImage(this.playButtonImg, this.buttonX - offsetX, this.buttonY - offsetY, scaledWidth, scaledHeight);
    }

    this.ctx.restore();
  }

  /**
   * Draws instructions text.
   */
  drawInstructions() {
    this.ctx.save();

    const isMobile = window.innerHeight < 480 || window.innerWidth < 750;
    const fontSize = isMobile ? 18 : 24;

    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.ctx.font = `${fontSize}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';

    const instructionY = this.buttonY + this.buttonHeight + 40;
    const text = isMobile ? 'TAP TO START' : 'CLICK TO START';

    // Animierter Text mit Opacity
    const instructionAlpha = 0.6 + Math.sin(this.animationTime * 2) * 0.3;
    this.ctx.fillStyle = `rgba(255, 255, 255, ${instructionAlpha})`;
    this.ctx.fillText(text, this.canvas.width / 2, instructionY);

    this.ctx.restore();
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
    this.animationTime = 0; // Reset animation
  }
}
