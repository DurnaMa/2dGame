class EnemiesAnt extends MovableObject {
  y = GAME_CONFIG.ENEMY.ANT.Y;
  x = GAME_CONFIG.ENEMY.ANT.START_X;
  height = GAME_CONFIG.ENEMY.ANT.HEIGHT;
  width = GAME_CONFIG.ENEMY.ANT.WIDTH;

  IMAGES_WALKING = [
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight04_walk1.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight05_walk2.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight06_walk3.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight07_walk4.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight08_walk5.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight09_walk6.png',
  ];

  IMAGES_DEATH = [
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight16_death1.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight17_death2.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight18_death3.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight19_death4.png'
  ]

  constructor() {
    super().loadImage('assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight14_hurt1.png');

    this.x = GAME_CONFIG.ENEMY.ANT.START_X + Math.random() * GAME_CONFIG.ENEMY.ANT.MAX_X_RANDOM_RANGE;
    this.speed = GAME_CONFIG.ENEMY.ANT.MIN_SPEED + Math.random() * GAME_CONFIG.ENEMY.ANT.MAX_SPEED_RANGE;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEATH);  // Lade auch die Todesanimation
    this.isDead = false;  // Initialisiere isDead
    this.animate();
    this.offset = {
      top: GAME_CONFIG.ENEMY.ANT.OFFSET.TOP,
      left: GAME_CONFIG.ENEMY.ANT.OFFSET.LEFT,
      right: GAME_CONFIG.ENEMY.ANT.OFFSET.RIGHT,
      bottom: GAME_CONFIG.ENEMY.ANT.OFFSET.BOTTOM,
    };
  }

  animate() {
    this.moveInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / GAME_CONFIG.FRAME_RATE);

    this.animationInterval = setInterval(() => {
      if (this.isDead) {
        // Todesanimation abspielen
        this.playAnimation(this.IMAGES_DEATH);
        // Nach der Animation verschwinden
        if (this.currentImage >= this.IMAGES_DEATH.length) {
          this.remove();
        }
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, GAME_CONFIG.ENEMY.ANT.ANIMATION_SPEED);
  }

  remove() {
    // Intervalle stoppen
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);
    // Gegner unsichtbar machen
    this.width = 0;
    this.height = 0;
  }
}
