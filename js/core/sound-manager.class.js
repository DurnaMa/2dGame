class SoundManagerClass {
  constructor() {
    this.sounds = {};
  }

  addSound(name, src, volume = 1.0, loop = false) {
    let audio = new Audio(src);
    audio.volume = volume;
    audio.loop = loop;
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

      // Ton abspielen
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

  shout() {
    this.soundManager.playSound('shout');
  }

  jumpSound() {
    this.soundManager.playSound('jump');
  }

  walkingSound() {
    setTimeout(() => {
      this.soundManager.playSound('walking');
    }, GAME_CONFIG.SOUNDS.DELAY);
  }
}
