class Character extends MoveleObjekt {
  y = 320;
  x = 40;
  height = 500;
  width = 500;

  constructor() {
    super().loadImage('/assets/assassin-mage-viking-free-pixel-art-game-heroes/PNG/Rogue/256x256/rogue.png');
  }

  jump() {}
}
