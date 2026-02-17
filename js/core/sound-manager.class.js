class SoundManagerClass {
  // Global mute flag shared by all instances
  static muted = false;
  static instances = new Set();

  constructor() {
    this.sounds = {};
    // Register instance so global mute can update all audios
    SoundManagerClass.instances.add(this);

    // Canvas UI state (optional until initButton is called)
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

  addSound(name, src, volume = Config.SOUNDS.VOLUME, loop = Config.SOUNDS.LOOP) {
    let audio = new Audio(src);
    audio.volume = volume;
    audio.loop = loop;
    // respect current global mute state
    audio.muted = SoundManagerClass.muted;
    this.sounds[name] = audio;
  }

  playSound(name, delay = 0) {
    let sound = this.sounds[name];
    if (!sound) return;

    try {
      // Prüfen ob der Ton bereits spielt
      if (!sound.paused) {
        return; // Ton spielt bereits, nichts tun
      }

      // Prüfen ob wir noch in der Verzögerungsphase sind
      const now = Date.now();
      const lastEndTime = this.soundEndTimes?.[name] || 0;

      if (now - lastEndTime < delay) {
        return; // Noch in der Verzögerungsphase
      }

      // Ton abspielen (audio.muted wird bei Mute gesetzt)
      sound.currentTime = 0;
      sound.play();

      // Event-Listener für das Ende des Tons (nur einmal)
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

  stop(name) {
    let sound = this.sounds[name];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  // Canvas button initialization: use image assets if available
  initButton(canvas) {
    if (!canvas) return;
    this.ui.canvas = canvas;
    this.ui.ctx = canvas.getContext('2d');
    this._updateButtonPosition();

    // Load icons from assets/icon/ if present
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

    // sync UI muted state
    this.ui.muted = SoundManagerClass.muted;
  }

  _updateButtonPosition() {
    if (!this.ui.canvas) return;
    this.ui.x = this.ui.canvas.width - this.ui.size - this.ui.margin;
    this.ui.y = this.ui.margin;
  }

  drawButton() {
    if (!this.ui || !this.ui.ctx) return;
    this._updateButtonPosition();
    const ctx = this.ui.ctx;
    const x = this.ui.x;
    const y = this.ui.y;
    const s = this.ui.size;

    ctx.save();

    // background circle
    const cx = x + s / 2;
    const cy = y + s / 2;
    const radius = s / 2;

    ctx.globalAlpha = 1;
    ctx.fillStyle = this.ui.isHovered ? '#ffd700' : '#ffa500';
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    // draw icon (image if loaded, fallback to drawn speaker)
    if (this.ui.iconsLoaded && this.ui.imgOn && this.ui.imgOff) {
      const img = this.ui.muted ? this.ui.imgOff : this.ui.imgOn;
      ctx.drawImage(img, x + 4, y + 4, s - 8, s - 8);
    } else {
      // fallback: simple speaker + waves or slash (icon color matches Play‑Button — black)
      ctx.fillStyle = '#000';
      const bodyW = s * 0.18;
      const bodyH = s * 0.26;
      const bodyX = x + s * 0.30 - bodyW / 2;
      const bodyY = y + s * 0.5 - bodyH / 2;
      ctx.fillRect(bodyX, bodyY, bodyW, bodyH);

      // cone (triangle)
      ctx.beginPath();
      ctx.moveTo(bodyX + bodyW, bodyY);
      ctx.lineTo(bodyX + bodyW + s * 0.22, bodyY + bodyH / 2);
      ctx.lineTo(bodyX + bodyW, bodyY + bodyH);
      ctx.closePath();
      ctx.fill();

      if (!this.ui.muted) {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(bodyX + bodyW + s * 0.08, y + s * 0.5, s * 0.18, -0.6, 0.6);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(bodyX + bodyW + s * 0.18, y + s * 0.5, s * 0.28, -0.6, 0.6);
        ctx.stroke();
      } else {
        // muted state indicated by a black cross (consistent with Play button colors)
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x + s * 0.22, y + s * 0.78);
        ctx.lineTo(x + s * 0.78, y + s * 0.22);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  checkButtonHover(px, py) {
    if (!this.ui || !this.ui.canvas) return;
    this.ui.isHovered = this.isButtonClicked(px, py);
  }

  isButtonClicked(px, py) {
    if (!this.ui || !this.ui.canvas) return false;
    return px >= this.ui.x && px <= this.ui.x + this.ui.size && py >= this.ui.y && py <= this.ui.y + this.ui.size;
  }

  isButtonHovered() {
    return !!(this.ui && this.ui.isHovered);
  }

  setButtonMuted(muted) {
    if (!this.ui) return;
    this.ui.muted = !!muted;
  }

  _updateButtonState() {
    if (this.ui) this.ui.muted = SoundManagerClass.muted;
  }

  // Remove instance from registry (call if you ever dispose an instance)
  dispose() {
    SoundManagerClass.instances.delete(this);
  }

  // Instance convenience methods that forward to static API
  setMuted(value) {
    SoundManagerClass.setMuted(value);
  }

  toggleMuted() {
    SoundManagerClass.toggleMuted();
  }

  // Static/global API
  static setMuted(value) {
    SoundManagerClass.muted = !!value;
    for (const inst of SoundManagerClass.instances) {
      for (const key in inst.sounds) {
        const audio = inst.sounds[key];
        if (audio) audio.muted = SoundManagerClass.muted;
      }
      // update UI state for instances that initialized button
      if (typeof inst._updateButtonState === 'function') inst._updateButtonState();
    }
  }

  static toggleMuted() {
    SoundManagerClass.setMuted(!SoundManagerClass.muted);
  }

  static isMuted() {
    return !!SoundManagerClass.muted;
  }
}
