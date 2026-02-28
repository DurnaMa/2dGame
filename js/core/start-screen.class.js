class StartScreen {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.isVisible = true;
    this.isHovered = false;
    this.imageLoaded = false;
    this.initButtonLayout();
    this.initAnimationState();
    this.loadPlayButtonImage();
  }

  /** Sets default button dimensions and centered position. */
  initButtonLayout() {
    this.buttonWidth = 200;
    this.buttonHeight = 80;
    this.buttonX = (this.canvas.width - this.buttonWidth) / 2;
    this.buttonY = (this.canvas.height - this.buttonHeight) / 2 + 80;
  }

  /** Initializes pulse animation variables. */
  initAnimationState() {
    this.animationTime = 0;
    this.pulseScale = 1;
  }

  /** Loads the play button image and updates layout dimensions on load. */
  loadPlayButtonImage() {
    this.playButtonImg = new Image();
    this.playButtonImg.src = 'assets/fantasy-platformer-game-ui/PNG/05ogin&pass/play_button.png';
    this.playButtonImg.onload = () => {
      this.imageLoaded = true;
      const isMobile = window.innerHeight < 480 || window.innerWidth < 750;
      const scale = isMobile ? 1.0 : 1.5;
      this.buttonWidth = this.playButtonImg.width * scale;
      this.buttonHeight = this.playButtonImg.height * scale;
      this.buttonX = (this.canvas.width - this.buttonWidth) / 2;
      this.buttonY = (this.canvas.height - this.buttonHeight) / 2 + 80;
      this.draw();
    };
  }

  /** Draws the start screen with overlay, title, button and instructions. */
  draw() {
    if (!this.isVisible) return;
    this.drawOverlay();
    this.drawTitle();
    this.drawButton();
    this.drawInstructions();
    this.animationTime += 0.02;
    this.pulseScale = 1 + Math.sin(this.animationTime * 3) * 0.05;
  }

  /** Draws the semi-transparent background and depth gradient. */
  drawOverlay() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gradient.addColorStop(0, 'rgba(70, 130, 180, 0.2)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(139, 69, 19, 0.2)');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /** Draws the main title and subtitle text. */
  drawTitle() {
    this.ctx.save();
    const isMobile = window.innerHeight < 480 || window.innerWidth < 750;
    const titleFontSize = isMobile ? 48 : 72;
    this.drawMainTitle(titleFontSize);
    this.drawSubtitle(titleFontSize);
    this.ctx.restore();
  }

  /**
   * Draws the "ADVENTURE" headline with glow effect.
   * @param {number} fontSize - Font size in pixels.
   */
  drawMainTitle(fontSize) {
    this.ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
    this.ctx.shadowBlur = 20;
    this.ctx.fillStyle = '#FFD700';
    this.ctx.font = `bold ${fontSize}px Uncial Antiqua`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('ADVENTURE', this.canvas.width / 2, this.canvas.height / 4);
  }

  /**
   * Draws the "QUEST" subtitle below the main title.
   * @param {number} titleFontSize - Font size of the main title for scaling.
   */
  drawSubtitle(titleFontSize) {
    this.ctx.shadowColor = 'rgba(255, 100, 0, 0.6)';
    this.ctx.shadowBlur = 15;
    this.ctx.fillStyle = '#FF6400';
    this.ctx.font = `bold ${titleFontSize * 0.5}px Uncial Antiqua`;
    this.ctx.fillText('QUEST', this.canvas.width / 2, this.canvas.height / 4 + titleFontSize * 0.6);
  }

  /** Draws the play button – either hovering or pulsing depending on state. */
  drawButton() {
    if (!this.imageLoaded) {
      this.drawLoadingText();
      return;
    }
    this.ctx.save();
    if (this.isHovered) {
      this.drawHoveredButton();
    } else {
      this.drawPulsingButton();
    }
    this.ctx.restore();
  }

  /** Draws a "Loading..." placeholder while the button image is not yet ready. */
  drawLoadingText() {
    this.ctx.save();
    this.ctx.shadowColor = 'rgba(255, 215, 0, 0.5)';
    this.ctx.shadowBlur = 10;
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '24px Uncial Antiqua';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('Loading...', this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.restore();
  }

  /** Draws the play button scaled up with a gold glow on hover. */
  drawHoveredButton() {
    const hoverScale = 1.15;
    const scaledWidth = this.buttonWidth * hoverScale;
    const scaledHeight = this.buttonHeight * hoverScale;
    const offsetX = (scaledWidth - this.buttonWidth) / 2;
    const offsetY = (scaledHeight - this.buttonHeight) / 2;
    this.ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
    this.ctx.shadowBlur = 25;
    this.ctx.globalAlpha = 1;
    this.ctx.drawImage(this.playButtonImg, this.buttonX - offsetX, this.buttonY - offsetY, scaledWidth, scaledHeight);
  }

  /** Draws the play button with a gentle sine-wave pulse animation. */
  drawPulsingButton() {
    const scaledWidth = this.buttonWidth * this.pulseScale;
    const scaledHeight = this.buttonHeight * this.pulseScale;
    const offsetX = (scaledWidth - this.buttonWidth) / 2;
    const offsetY = (scaledHeight - this.buttonHeight) / 2;
    this.ctx.shadowColor = 'rgba(255, 215, 0, 0.6)';
    this.ctx.shadowBlur = 15;
    this.ctx.globalAlpha = 0.95;
    this.ctx.drawImage(this.playButtonImg, this.buttonX - offsetX, this.buttonY - offsetY, scaledWidth, scaledHeight);
  }

  /** Draws the animated "CLICK/TAP TO START" instruction text. */
  drawInstructions() {
    this.ctx.save();
    const isMobile = window.innerHeight < 480 || window.innerWidth < 750;
    const fontSize = isMobile ? 18 : 24;
    const instructionY = this.buttonY + this.buttonHeight + 40;
    const text = isMobile ? 'TAP TO START' : 'CLICK TO START';
    const instructionAlpha = 0.6 + Math.sin(this.animationTime * 2) * 0.3;
    this.ctx.fillStyle = `rgba(255, 255, 255, ${instructionAlpha})`;
    this.ctx.font = `${fontSize}px Uncial Antiqua`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(text, this.canvas.width / 2, instructionY);
    this.ctx.restore();
  }

  /**
   * Checks if the play button was clicked.
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
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
   * Updates the hover state based on mouse position.
   * @param {number} x
   * @param {number} y
   */
  checkHover(x, y) {
    this.isHovered = this.isButtonClicked(x, y);
  }

  /** Hides the start screen. */
  hide() {
    this.isVisible = false;
  }

  /** Shows the start screen and resets the animation. */
  show() {
    this.isVisible = true;
    this.animationTime = 0;
  }
}
