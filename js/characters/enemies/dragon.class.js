class Dragon extends MovableObject {
  y = GAME_CONFIG.ENEMY.DRAGON.Y;
  x = GAME_CONFIG.ENEMY.DRAGON.X;
  height = GAME_CONFIG.ENEMY.DRAGON.HEIGHT;
  width = GAME_CONFIG.ENEMY.DRAGON.WIDTH;

  IMAGES_WALKING = [
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Dragon/dragon04_walk1.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Dragon/dragon05_walk2.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Dragon/dragon06_walk3.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Dragon/dragon07_walk4.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Dragon/dragon08_walk5.png',
  ];

  IMAGES_DEATH = [
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Dragon/dragon15_death1.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Dragon/dragon16_death2.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Dragon/dragon17_death3.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Dragon/dragon18_death4.png',
  ];

  constructor() {
    super().loadImage('assets/2d-pixel-art-evil-monster-sprites/PNG/Dragon/dragon01_idle1.png');

    this.x = GAME_CONFIG.ENEMY.DRAGON.START_X + Math.random() * GAME_CONFIG.ENEMY.DRAGON.MAX_X_RANDOM_RANGE;
    this.speed = GAME_CONFIG.ENEMY.DRAGON.MIN_SPEED + Math.random() * GAME_CONFIG.ENEMY.DRAGON.MAX_SPEED_RANGE;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEATH); // Lade auch die Todesanimation
    this.isDead = false; // Initialisiere isDead
    this.markedForRemoval = false; // Flag für vollständige Entfernung
    this.animate();
    this.offset = {
      top: GAME_CONFIG.ENEMY.DRAGON.OFFSET.TOP,
      left: GAME_CONFIG.ENEMY.DRAGON.OFFSET.LEFT,
      right: GAME_CONFIG.ENEMY.DRAGON.OFFSET.RIGHT,
      bottom: GAME_CONFIG.ENEMY.DRAGON.OFFSET.BOTTOM,
    };

    this.startX = this.x;
    this.isActive = true;
    this.movingRight = false;
  }
  animate() {
    this.moveInterval = setTrackedInterval(
      () => {
        if (!gameStarted) return;
        if (!this.isDead) {
          this.moveLeft();
        }
      },
      1000 / GAME_CONFIG.FRAME_RATE,
      'Dragon Movement'
    );

    this.animationInterval = setTrackedInterval(
      () => {
        if (!gameStarted) return;

        if (this.isDead) {
          this.handleDeathAnimation();
        } else {
          this.playAnimation(this.IMAGES_WALKING);
        }
      },
      GAME_CONFIG.ENEMY.DRAGON.ANIMATION_SPEED,
      'Dragon Animation'
    );
  }

  handleDeathAnimation() {
    if (!this.deathAnimationStarted) {
      this.currentImage = 0;
      this.deathAnimationStarted = true;
    }

    if (this.currentImage < this.IMAGES_DEATH.length) {
      this.playAnimation(this.IMAGES_DEATH);
    } else {
      // Hold the last frame
      const lastFramePath = this.IMAGES_DEATH[this.IMAGES_DEATH.length - 1];
      this.img = this.imageCache[lastFramePath];

      // Delay removal for 2 seconds
      if (!this.removalScheduled) {
        this.removalScheduled = true;
        setTimeout(() => {
          this.remove();
        }, GAME_CONFIG.ENEMY.DRAGON.DELAY);
      }
    }
  }

  remove() {
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);
    this.width = 0;
    this.height = 0;
    this.markedForRemoval = true;
  }
}
