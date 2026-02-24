class SoundManagerClass {
  static muted = false;
  static instances = new Set();

  constructor() {
    this.sounds = {};

    SoundManagerClass.instances.add(this);

    this.ui = {
      canvas: null,
      ctx: null,
      size: 44,
      margin: 12,
      x: 0,
      y: 0,
      isHovered: false,
      muted: SoundManagerClass.muted,
      imgOn: null,
      imgOff: null,
      iconsLoaded: false,
    };
  }

  /**
   * Adds a new sound.
   * @param {string} name - The name identifier for the sound
   * @param {string} src - The source path of the sound file
   * @param {number} [volume=Config.SOUNDS.VOLUME] - The volume level (0-1)
   * @param {boolean} [loop=Config.SOUNDS.LOOP] - Whether the sound should loop
   */
  addSound(name, src, volume = Config.SOUNDS.VOLUME, loop = Config.SOUNDS.LOOP) {
    let audio = new Audio(src);
    audio.volume = volume;
    audio.loop = loop;
    audio.muted = SoundManagerClass.muted;
    this.sounds[name] = audio;
  }

  /**
   * Plays a sound.
   * @param {string} name - The name identifier of the sound to play
   * @param {number} [delay=0] - Delay before playing the sound in milliseconds
   */
  playSound(name, delay = 0) {
    let sound = this.sounds[name];
    if (!sound) return;

    try {
      if (!sound.paused) {
        return;
      }

      const now = Date.now();
      const lastEndTime = this.soundEndTimes?.[name] || 0;

      if (now - lastEndTime < delay) {
        return;
      }

      sound.currentTime = 0;
      sound.play();

      if (delay > 0) {
        if (!this.soundEndTimes) {
          this.soundEndTimes = {};
        }

        const onEnded = () => {
          this.soundEndTimes[name] = Date.now();
          sound.removeEventListener('ended', onEnded);
        };

        sound.addEventListener('ended', onEnded);
      }
    } catch (error) {
      console.error('Wiedergabe von ' + name + ' fehlgeschlagen:', error);
    }
  }

  /**
   * Stops a sound.
   * @param {string} name - The name identifier of the sound to stop
   */
  stop(name) {
    let sound = this.sounds[name];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  /**
   * Initializes the mute button on the canvas.
   * @param {HTMLCanvasElement} canvas - The canvas element for the button
   */
  initButton(canvas) {
    if (!canvas) return;
    this.ui.canvas = canvas;
    this.ui.ctx = canvas.getContext('2d');
    this._updateButtonPosition();

    const imgOn = new Image();
    const imgOff = new Image();
    let loaded = 0;
    const onload = () => {
      loaded++;
      if (loaded === 2) this.ui.iconsLoaded = true;
    };

    imgOn.onload = onload;
    imgOff.onload = onload;

    imgOn.src = 'assets/icon/sound-on.svg';
    imgOff.src = 'assets/icon/sound-off.svg';

    this.ui.imgOn = imgOn;
    this.ui.imgOff = imgOff;

    this.ui.muted = SoundManagerClass.muted;
  }

  /**
   * Updates the button position on the canvas.
   * @private
   */
  _updateButtonPosition() {
    if (!this.ui.canvas) return;
    this.ui.x = this.ui.canvas.width - this.ui.size - this.ui.margin;
    this.ui.y = this.ui.margin;
  }

  /**
   * Draws the mute/unmute button.
   */
  drawButton() {
    if (!this.ui?.ctx) return;
    this._updateButtonPosition();
    const { ctx, x, y, size: s, isHovered, muted, iconsLoaded, imgOn, imgOff } = this.ui;
    const cx = x + s / 2,
      cy = y + s / 2;

    ctx.save();

    ctx.fillStyle = isHovered ? '#ffd700' : '#ffa500';
    ctx.beginPath();
    ctx.arc(cx, cy, s / 2, 0, Math.PI * 2);
    ctx.fill();

    if (iconsLoaded && imgOn && imgOff) {
      ctx.drawImage(muted ? imgOff : imgOn, x + 4, y + 4, s - 8, s - 8);
    } else {
      const bodyW = s * 0.18,
        bodyH = s * 0.26;
      const bodyX = x + s * 0.3 - bodyW / 2;
      const bodyY = cy - bodyH / 2;

      ctx.fillStyle = ctx.strokeStyle = '#000';
      ctx.fillRect(bodyX, bodyY, bodyW, bodyH);

      ctx.beginPath();
      ctx.moveTo(bodyX + bodyW, bodyY);
      ctx.lineTo(bodyX + bodyW + s * 0.22, cy);
      ctx.lineTo(bodyX + bodyW, bodyY + bodyH);
      ctx.closePath();
      ctx.fill();

      if (muted) {
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x + s * 0.22, y + s * 0.78);
        ctx.lineTo(x + s * 0.78, y + s * 0.22);
        ctx.stroke();
      } else {
        ctx.lineWidth = 2;
        [
          [s * 0.08, s * 0.18],
          [s * 0.18, s * 0.28],
        ].forEach(([ox, r]) => {
          ctx.beginPath();
          ctx.arc(bodyX + bodyW + ox, cy, r, -0.6, 0.6);
          ctx.stroke();
        });
      }
    }

    ctx.restore();
  }

  /**
   * Checks if the mouse is hovering over the button.
   * @param {number} px - The x coordinate of the mouse
   * @param {number} py - The y coordinate of the mouse
   */
  checkButtonHover(px, py) {
    if (!this.ui || !this.ui.canvas) return;
    this.ui.isHovered = this.isButtonClicked(px, py);
  }

  /**
   * Checks if the button was clicked.
   * @param {number} px - The x coordinate of the click
   * @param {number} py - The y coordinate of the click
   * @returns {boolean} True if the button was clicked
   */
  isButtonClicked(px, py) {
    if (!this.ui || !this.ui.canvas) return false;
    return px >= this.ui.x && px <= this.ui.x + this.ui.size && py >= this.ui.y && py <= this.ui.y + this.ui.size;
  }

  /**
   * Checks if the button is hovered.
   * @returns {boolean} True if the button is currently hovered
   */
  isButtonHovered() {
    return !!(this.ui && this.ui.isHovered);
  }

  /**
   * Sets the visual mute state.
   * @param {boolean} muted - The mute state to display
   */
  setButtonMuted(muted) {
    if (!this.ui) return;
    this.ui.muted = !!muted;
  }

  /**
   * Updates the button state.
   * @private
   */
  _updateButtonState() {
    if (this.ui) this.ui.muted = SoundManagerClass.muted;
  }

  /**
   * Sets the global mute state for all instances.
   * @static
   * @param {boolean} value - The mute state
   */
  static setMuted(value) {
    SoundManagerClass.muted = !!value;
    for (const inst of SoundManagerClass.instances) {
      for (const key in inst.sounds) {
        const audio = inst.sounds[key];
        if (audio) audio.muted = SoundManagerClass.muted;
      }
      if (typeof inst._updateButtonState === 'function') inst._updateButtonState();
    }
  }

  /**
   * Toggles the global mute state.
   * @static
   */
  static toggleMuted() {
    SoundManagerClass.setMuted(!SoundManagerClass.muted);
  }

  /**
   * Gets the current mute state.
   * @static
   * @returns {boolean} The current mute state
   */
  static isMuted() {
    return !!SoundManagerClass.muted;
  }
}
