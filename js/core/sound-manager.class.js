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

  playSound(name) {
    let sound = this.sounds[name];
    try {
      if (sound) {
      sound.currentTime = 0;
      sound.play();
      }
    } catch (error) {
      console.error("Wiedergabe von " + name + " fehlgeschlagen:", error);
    }
  }

stop(name) {
    let sound = this.sounds[name];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }
}