class Dragon extends MovableObject {
  y = 352;
  start_x = 40;
  height = 300;
  width = 300;
  min_x_random = 250;
  max_x_random_range = 500;
  min_speed = 1.5;
  max_speed_range = 2.0;
  animation_speed = 200;
  delay = 2000;

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

    this.x = this.start_x + Math.random() * this.max_x_random_range;
    this.speed = this.min_speed + Math.random() * this.max_speed_range;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEATH); // Lade auch die Todesanimation
    this.isDead = false; // Initialisiere isDead
    this.markedForRemoval = false; // Flag für vollständige Entfernung
    this.animate();
    this.offset = {
      top: 112,
      left: 40,
      right: 88,
      bottom: 113,
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
      1000 / Config.FRAME_RATE,
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
      this.animation_speed,
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
        }, this.delay);
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
