class SoundManagerClass {

  constructor(src, volume = 1.0, loop = false) {
    this.sound = new Audio(src);
    this.sound.volume = volume;
    this.sound.loop = loop;
  }

  play() {
    this.sound.currentTime = 0;
    this.sound.play().catch((error) => {
      console.error("Widergabe fehlgeschlagen (Interaktion erforderlich)", error);
    });
  }

  stop() {
    this.sound.pause();
    this.sound.currentTime = 0;
  }
}