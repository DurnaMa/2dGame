class BigKnight extends Enemy {
  y = Config.ENEMY.BIGKNIGHT.Y;
  start_x = Config.ENEMY.BIGKNIGHT.START_X;
  height = Config.ENEMY.BIGKNIGHT.HEIGHT;
  width = Config.ENEMY.BIGKNIGHT.WIDTH;
  min_x_random = Config.ENEMY.BIGKNIGHT.MIN_X_RANDOM;
  max_x_random_range = Config.ENEMY.BIGKNIGHT.MAX_X_RANDOM_RANGE;
  min_speed = Config.ENEMY.BIGKNIGHT.MIN_SPEED;
  max_speed_range = Config.ENEMY.BIGKNIGHT.MAX_SPEED_RANGE;
  animation_speed = Config.ENEMY.BIGKNIGHT.ANIMATION_SPEED;
  delay = Config.ENEMY.BIGKNIGHT.DELAY;

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

  IMAGES_ATTACK = [
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight10_attack1.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight11_attack2.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight12_attack3.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight13_attack4.png',
  ];

  IMAGES_HURT = [
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight14_hurt1.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight15_hurt2.png',
  ];

  constructor() {
    super().loadImage('assets/2d-pixel-art-evil-monster-sprites/PNG/Big_knight/big_knight14_hurt1.png');

    this.x = this.start_x + this.min_x_random + Math.random() * this.max_x_random_range;
    this.speed = this.min_speed + Math.random() * this.max_speed_range;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEATH);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.isDead = false;
    this.markedForRemoval = false;
    this.isAttacking = false;
    this.attackCooldown = false;
    this.animate();
    this.offset = {
      top: Config.ENEMY.BIGKNIGHT.OFFSET.TOP,
      left: Config.ENEMY.BIGKNIGHT.OFFSET.LEFT,
      right: Config.ENEMY.BIGKNIGHT.OFFSET.RIGHT,
      bottom: Config.ENEMY.BIGKNIGHT.OFFSET.BOTTOM,
    };

    this.startX = this.x;
    this.isActive = true;
    this.moveRight();
  }

  animate() {
    this.moveInterval = setTrackedInterval(
      () => {
        if (!gameStarted) return;
        if (this.isDead) return;
        if (this.isAttacking) return;
        if (this.isCharacterNear()) {
          const direction = this.getDirectionToCharacter();
          this.otherDirection = direction < 0;
        }
        if (this.isInAttackRange() && !this.attackCooldown) {
          return;
        } else if (this.isCharacterNear()) {
          if (!this.isAttacking) {
            this.chaseCharacter();
          }
        } else {
          this.moveLeft();
          this.otherDirection = true;
        }
      },
      1000 / Config.FRAME_RATE,
      'BigKnight Movement'
    );

    this.animationInterval = setTrackedInterval(
      () => {
        if (!gameStarted) return;

        if (this.isDead) {
          this.handleDeathAnimation();
        } else if (this.isInAttackRange() && !this.attackCooldown) {
          this.startAttack();
          this.playAnimation(this.IMAGES_ATTACK);
          if (this.currentImage >= this.IMAGES_ATTACK.length) {
            this.endAttack();
          }
        } else if (this.isAttacking) {
          this.playAnimation(this.IMAGES_ATTACK);
          if (this.currentImage >= this.IMAGES_ATTACK.length) {
            this.endAttack();
          }
        } else {
          this.playAnimation(this.IMAGES_WALKING);
        }
      },
      this.animation_speed,
      'BigKnight Animation'
    );
  }
}
