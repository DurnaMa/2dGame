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

    this.buttonWidth = 180;
    this.buttonHeight = 60;
    this.buttonGap = 20;

    this.menuButtonX = canvas.width / 2 - this.buttonWidth - this.buttonGap / 2;
    this.restartButtonX = canvas.width / 2 + this.buttonGap / 2;
    this.buttonY = this.y + this.height + 20;

    this.isMenuHovered = false;
    this.isRestartHovered = false;

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

      this.menuButtonX = canvas.width / 2 - this.buttonWidth - this.buttonGap / 2;
      this.restartButtonX = canvas.width / 2 + this.buttonGap / 2;
      this.buttonY = this.y + this.height + 20;
    };
  }

  /**
   * Draws the end screen with overlay, status message and buttons.
   */
  draw() {
    if (!this.isVisible) return;

    this.animationTime += 0.02;

    this.drawBackground();
    this.updateAndDrawParticles();

    if (this.imageLoaded) {
      this.ctx.save();
      this.ctx.shadowColor = this.isWinScreen ? 'rgba(255, 215, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)';
      this.ctx.shadowBlur = 20;
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      this.ctx.restore();
    }

    this.drawStatusMessage();
    this.drawMenuButton();
    this.drawRestartButton();
  }

  /**
   * Draws the background with color gradient based on win/lose state.
   */
  drawBackground() {
    this.ctx.save();
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
    gradient.addColorStop(0.5, this.isWinScreen ? 'rgba(34, 139, 34, 0.3)' : 'rgba(139, 0, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
  }

  /**
   * Creates and animates particles (stars for win, fire for lose).
   */
  updateAndDrawParticles() {
    if (Math.random() < 0.3) {
      this.particleArray.push(
        this.isWinScreen
          ? {
              x: Math.random() * this.canvas.width,
              y: -10,
              size: Math.random() * 3 + 2,
              speedY: Math.random() * 2 + 1,
              opacity: 1,
              color: '#FFD700',
            }
          : {
              x: Math.random() * this.canvas.width,
              y: -10,
              size: Math.random() * 2 + 1,
              speedY: Math.random() * 1.5 + 0.5,
              opacity: 1,
              color: '#FF4500',
            }
      );
    }

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
        this.drawStar(p.x, p.y, p.size);
      } else {
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

    this.ctx.beginPath();
    for (let i = 0; i < spikes; i++) {
      this.ctx.lineTo(cx + Math.cos(rot) * size, cy + Math.sin(rot) * size);
      rot += step;
      this.ctx.lineTo(cx + Math.cos(rot) * (size / 2), cy + Math.sin(rot) * (size / 2));
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

    Object.assign(this.ctx, {
      shadowColor: this.isWinScreen ? 'rgba(255, 215, 0, 0.8)' : 'rgba(255, 0, 0, 0.8)',
      shadowBlur: 30,
      fillStyle: this.isWinScreen ? '#FFD700' : '#FF4500',
      font: `bold ${fontSize}px Uncial Antiqua`,
      textAlign: 'center',
      textBaseline: 'middle',
    });

    this.ctx.scale(scaleAnimation, scaleAnimation);
    this.ctx.fillText(
      this.isWinScreen ? 'YOU WIN!' : 'GAME OVER!',
      this.canvas.width / (2 * scaleAnimation),
      this.canvas.height / (3 * scaleAnimation)
    );
    this.ctx.restore();
  }

  /**
   * Internal helper – draws a single button.
   */
  _drawButton(bx, hovered, label, fillColor, hoverColor, strokeColor) {
    const scale = hovered ? 1.1 : 1;
    const offsetX = (this.buttonWidth * (scale - 1)) / 2;
    const offsetY = (this.buttonHeight * (scale - 1)) / 2;

    this.ctx.save();
    Object.assign(this.ctx, {
      fillStyle: hovered ? hoverColor : fillColor,
      strokeStyle: strokeColor,
      lineWidth: 3,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowBlur: 10,
    });

    this.roundRect(
      this.ctx,
      bx - offsetX,
      this.buttonY - offsetY,
      this.buttonWidth * scale,
      this.buttonHeight * scale,
      10,
      true,
      true
    );

    Object.assign(this.ctx, {
      fillStyle: '#fff',
      font: 'bold 18px Uncial Antiqua',
      textAlign: 'center',
      textBaseline: 'middle',
      shadowBlur: 0,
    });
    this.ctx.fillText(label, bx + this.buttonWidth / 2, this.buttonY + this.buttonHeight / 2);
    this.ctx.restore();
  }

  /**
   * Draws the Menu button (left).
   */
  drawMenuButton() {
    const c = this.isWinScreen
      ? { fill: '#228B22', hover: '#FFD700', stroke: '#FFD700' }
      : { fill: '#DC143C', hover: '#FF6347', stroke: '#FF4500' };
    this._drawButton(this.menuButtonX, this.isMenuHovered, 'MENÜ', c.fill, c.hover, c.stroke);
  }

  /**
   * Draws the Restart button (right).
   */
  drawRestartButton() {
    const c = this.isWinScreen
      ? { fill: '#1a6b1a', hover: '#FFD700', stroke: '#FFD700' }
      : { fill: '#8B0000', hover: '#FF6347', stroke: '#FF4500' };
    this._drawButton(this.restartButtonX, this.isRestartHovered, 'RESTART', c.fill, c.hover, c.stroke);
  }

  /**
   * Draws a rounded rectangle.
   */
  roundRect(ctx, x, y, width, height, radius = 5, fill, stroke) {
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
   * Checks if the Menu button was clicked.
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  isMenuButtonClicked(x, y) {
    return (
      x >= this.menuButtonX &&
      x <= this.menuButtonX + this.buttonWidth &&
      y >= this.buttonY &&
      y <= this.buttonY + this.buttonHeight
    );
  }

  /**
   * Checks if the Restart button was clicked.
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  isRestartButtonClicked(x, y) {
    return (
      x >= this.restartButtonX &&
      x <= this.restartButtonX + this.buttonWidth &&
      y >= this.buttonY &&
      y <= this.buttonY + this.buttonHeight
    );
  }

  /**
   * Updates hover state for both buttons.
   * @param {number} x
   * @param {number} y
   */
  checkHover(x, y) {
    this.isMenuHovered = this.isMenuButtonClicked(x, y);
    this.isRestartHovered = this.isRestartButtonClicked(x, y);
  }

  /**
   * Returns true if any button is hovered (used for cursor styling).
   * @returns {boolean}
   */
  isAnyButtonHovered() {
    return this.isMenuHovered || this.isRestartHovered;
  }

  /** Hides the screen. */
  hide() {
    this.isVisible = false;
    this.particleArray = [];
  }

  /** Shows the screen. */
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
