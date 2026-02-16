class Dragon extends Enemy {
  y = Config.ENEMY.DRAGON.Y;
  start_x = Config.ENEMY.DRAGON.START_X;
  height = Config.ENEMY.DRAGON.HEIGHT;
  width = Config.ENEMY.DRAGON.WIDTH;
  min_x_random = Config.ENEMY.DRAGON.MIN_X_RANDOM;
  max_x_random_range = Config.ENEMY.DRAGON.MAX_X_RANDOM_RANGE;
  min_speed = Config.ENEMY.DRAGON.MIN_SPEED;
  max_speed_range = Config.ENEMY.DRAGON.MAX_SPEED_RANGE;
  animation_speed = Config.ENEMY.DRAGON.ANIMATION_SPEED;
  delay = Config.ENEMY.DRAGON.DELAY;

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

  IMAGES_ATTACK = [
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Dragon/dragon09_attack1.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Dragon/dragon10_attack2.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Dragon/dragon11_attack3.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Dragon/dragon12_attack4.png',
  ];

  IMAGES_HURT = [
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Dragon/dragon13_hurt1.png',
    'assets/2d-pixel-art-evil-monster-sprites/PNG/Dragon/dragon14_hurt2.png',
  ];

  constructor() {
    super().loadImage('assets/2d-pixel-art-evil-monster-sprites/PNG/Dragon/dragon01_idle1.png');

    this.x = this.start_x + Math.random() * this.max_x_random_range;
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
      top: Config.ENEMY.DRAGON.OFFSET.TOP,
      left: Config.ENEMY.DRAGON.OFFSET.LEFT,
      right: Config.ENEMY.DRAGON.OFFSET.RIGHT,
      bottom: Config.ENEMY.DRAGON.OFFSET.BOTTOM,
    };

    this.startX = this.x;
    this.isActive = true;
    this.movingRight = false;
  }

  animate() {
    this.moveInterval = setTrackedInterval(
      () => {
        if (!gameStarted) return;
        if (this.isDead) return;
        if (this.isCharacterNear()) {
          const direction = this.getDirectionToCharacter();
          this.otherDirection = direction < 0;
        }
        if (this.isAttacking) return;
        if (this.isInAttackRange() && !this.attackCooldown) {
          return;
        } else if (this.isCharacterNear()) {
          if (!this.isAttacking) {
            this.chaseCharacter();
          }
        } else {
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
      'Dragon Animation'
    );
  }
}
