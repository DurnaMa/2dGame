class BigKnight extends MovableObject {
  y = GAME_CONFIG.ENEMY.BIGKNIGHT.Y;
  x = GAME_CONFIG.ENEMY.BIGKNIGHT.START_X;
  height = GAME_CONFIG.ENEMY.BIGKNIGHT.HEIGHT;
  width = GAME_CONFIG.ENEMY.BIGKNIGHT.WIDTH;

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
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight19_death4.png',
  ];

  constructor() {
    super().loadImage('assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight14_hurt1.png');

    this.x = GAME_CONFIG.ENEMY.BIGKNIGHT.START_X + Math.random() * GAME_CONFIG.ENEMY.BIGKNIGHT.MAX_X_RANDOM_RANGE;
    this.speed = GAME_CONFIG.ENEMY.BIGKNIGHT.MIN_SPEED + Math.random() * GAME_CONFIG.ENEMY.BIGKNIGHT.MAX_SPEED_RANGE;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEATH);
    this.isDead = false;
    this.markedForRemoval = false;
    this.animate();
    this.offset = {
      top: GAME_CONFIG.ENEMY.BIGKNIGHT.OFFSET.TOP,
      left: GAME_CONFIG.ENEMY.BIGKNIGHT.OFFSET.LEFT,
      right: GAME_CONFIG.ENEMY.BIGKNIGHT.OFFSET.RIGHT,
      bottom: GAME_CONFIG.ENEMY.BIGKNIGHT.OFFSET.BOTTOM,
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
      'BigKnight Movement'
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
      GAME_CONFIG.ENEMY.BIGKNIGHT.ANIMATION_SPEED,
      'BigKnight Animation'
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

      // Delay removal for 2 seconds (using a timeout prevents multiple schedules)
      if (!this.removalScheduled) {
        this.removalScheduled = true;
        setTimeout(() => {
          this.remove();
        }, GAME_CONFIG.ENEMY.BIGKNIGHT.DELAY);
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
