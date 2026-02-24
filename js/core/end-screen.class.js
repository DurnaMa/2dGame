/**
 * Represents a generic end screen (Win/Lose) with visual distinction.
 */
class EndScreen {
  constructor(canvas, imagePath, isWinScreen = false) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.isVisible = false;
    this.isWinScreen = isWinScreen;

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

    // Animation variables
    this.animationTime = 0;
    this.particleArray = [];

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
   * Draws the end screen with overlay, status message and button.
   */
  draw() {
    if (!this.isVisible) return;

    // Update animation
    this.animationTime += 0.02;

    // Draw background with color based on win/lose
    this.drawBackground();

    // Draw particles
    this.updateAndDrawParticles();

    // Draw image
    if (this.imageLoaded) {
      this.ctx.save();
      this.ctx.shadowColor = this.isWinScreen ? 'rgba(255, 215, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)';
      this.ctx.shadowBlur = 20;
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      this.ctx.restore();
    }

    // Draw status message
    this.drawStatusMessage();

    // Draw button
    this.drawButton();
  }

  /**
   * Draws the background with color gradient based on win/lose state.
   */
  drawBackground() {
    this.ctx.save();

    // Dark overlay
    if (this.isWinScreen) {
      // Victory gradient
      const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      gradient.addColorStop(0.5, 'rgba(34, 139, 34, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
      this.ctx.fillStyle = gradient;
    } else {
      // Defeat gradient
      const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      gradient.addColorStop(0.5, 'rgba(139, 0, 0, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
      this.ctx.fillStyle = gradient;
    }

    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
  }

  /**
   * Creates and animates particles (stars for win, fire for lose).
   */
  updateAndDrawParticles() {
    // Create particles periodically
    if (Math.random() < 0.3) {
      if (this.isWinScreen) {
        // Stars for victory
        this.particleArray.push({
          x: Math.random() * this.canvas.width,
          y: -10,
          size: Math.random() * 3 + 2,
          speedY: Math.random() * 2 + 1,
          opacity: 1,
          color: '#FFD700',
        });
      } else {
        // Red particles for defeat
        this.particleArray.push({
          x: Math.random() * this.canvas.width,
          y: -10,
          size: Math.random() * 2 + 1,
          speedY: Math.random() * 1.5 + 0.5,
          opacity: 1,
          color: '#FF4500',
        });
      }
    }

    // Draw and update particles
    for (let i = this.particleArray.length - 1; i >= 0; i--) {
      const p = this.particleArray[i];
      p.y += p.speedY;
      p.opacity -= 0.01;

      if (p.opacity <= 0) {
        this.particleArray.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;

      if (this.isWinScreen) {
        // Draw stars
        this.drawStar(p.x, p.y, p.size);
      } else {
        // Draw fire particles
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }
  }

  /**
   * Draws a star shape.
   */
  drawStar(cx, cy, size) {
    const spikes = 5;
    const step = (Math.PI * 2) / (spikes * 2);
    let rot = -Math.PI / 2;
    let x = cx;
    let y = cy;

    this.ctx.beginPath();
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * size;
      y = cy + Math.sin(rot) * size;
      this.ctx.lineTo(x, y);
      rot += step;
      x = cx + Math.cos(rot) * (size / 2);
      y = cy + Math.sin(rot) * (size / 2);
      this.ctx.lineTo(x, y);
      rot += step;
    }
    this.ctx.lineTo(cx + Math.cos(-Math.PI / 2) * size, cy + Math.sin(-Math.PI / 2) * size);
    this.ctx.fill();
  }

  /**
   * Draws the status message (YOU WIN / GAME OVER).
   */
  drawStatusMessage() {
    this.ctx.save();

    const isMobile = window.innerHeight < 480 || window.innerWidth < 750;
    const fontSize = isMobile ? 48 : 64;

    const scaleAnimation = 0.9 + Math.sin(this.animationTime * 2) * 0.1;

    if (this.isWinScreen) {
      // Victory message
      this.ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
      this.ctx.shadowBlur = 30;
      this.ctx.fillStyle = '#FFD700';
      this.ctx.font = `bold ${fontSize}px Arial`;
    } else {
      // Defeat message
      this.ctx.shadowColor = 'rgba(255, 0, 0, 0.8)';
      this.ctx.shadowBlur = 30;
      this.ctx.fillStyle = '#FF4500';
      this.ctx.font = `bold ${fontSize}px Arial`;
    }

    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.scale(scaleAnimation, scaleAnimation);

    const centerX = this.canvas.width / (2 * scaleAnimation);
    const centerY = this.canvas.height / (3 * scaleAnimation);

    const message = this.isWinScreen ? 'YOU WIN!' : 'GAME OVER!';
    this.ctx.fillText(message, centerX, centerY);

    this.ctx.restore();
  }

  /**
   * Draws the restart button.
   */
  drawButton() {
    this.ctx.save();

    const buttonColor = this.isWinScreen
      ? { fill: this.isHovered ? '#FFD700' : '#228B22', stroke: '#FFD700' }
      : { fill: this.isHovered ? '#FF6347' : '#DC143C', stroke: '#FF4500' };

    this.ctx.fillStyle = buttonColor.fill;
    this.ctx.strokeStyle = buttonColor.stroke;
    this.ctx.lineWidth = 3;
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    this.ctx.shadowBlur = 10;

    // Apply hover scale
    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;
    if (this.isHovered) {
      scale = 1.1;
      offsetX = (this.buttonWidth * (scale - 1)) / 2;
      offsetY = (this.buttonHeight * (scale - 1)) / 2;
    }

    this.roundRect(
      this.ctx,
      this.buttonX - offsetX,
      this.buttonY - offsetY,
      this.buttonWidth * scale,
      this.buttonHeight * scale,
      10,
      true,
      true
    );

    this.ctx.fillStyle = '#fff';
    this.ctx.font = 'bold 18px Arial';
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
    this.particleArray = []; // Clear particles
  }

  /**
   * Shows the screen.
   */
  show() {
    this.isVisible = true;
    this.animationTime = 0;
    this.particleArray = [];
  }
}

class GameOverScreen extends EndScreen {
  constructor(canvas) {
    super(canvas, 'assets/fantasy-platformer-game-ui/PNG/10Defeat/knight_loose.png', false);
  }
}

class WinScreen extends EndScreen {
  constructor(canvas) {
    super(canvas, 'assets/fantasy-platformer-game-ui/PNG/09Victory/knight_win.png', true);
  }
}
