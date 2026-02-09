class Endboss extends MovableObject {
  y = Config.ENEMY.ENDBOSS.Y;
  start_x = Config.ENEMY.ENDBOSS.START_X;
  height = Config.ENEMY.ENDBOSS.HEIGHT;
  width = Config.ENEMY.ENDBOSS.WIDTH;
  min_x_random = Config.ENEMY.ENDBOSS.MIN_X_RANDOM;
  max_x_random_range = Config.ENEMY.ENDBOSS.MAX_X_RANDOM_RANGE;
  min_speed = Config.ENEMY.ENDBOSS.MIN_SPEED;
  animation_speed = Config.ENEMY.ENDBOSS.ANIMATION_SPEED;
  patrol_range = Config.ENEMY.ENDBOSS.PATROL_RANGE;
  activation_distance = Config.ENEMY.ENDBOSS.ACTIVATION_DISTANCE;
  speed = 1;

  otherDirection = true;
  isActive = false;
  movingRight = false;

  IMAGES_WALKING = [
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk1.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk2.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk3.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk4.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk5.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk6.png',
  ];

  IMAGES_HURT = [
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Hurt1.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Hurt2.png',
  ];

  IMAGES_DEATH = [
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Death0.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Death1.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Death2.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Death3.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Death4.png',
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEATH);
    this.offset = {
      top: Config.ENEMY.ENDBOSS.OFFSET.TOP,
      left: Config.ENEMY.ENDBOSS.OFFSET.LEFT,
      right: Config.ENEMY.ENDBOSS.OFFSET.RIGHT,
      bottom: Config.ENEMY.ENDBOSS.OFFSET.BOTTOM,
    }
    this.x = this.start_x + Math.random() * this.max_x_random_range;
    this.animate();
    this.energy = 100;
    this.lastHit = 0;
    this.hitsTaken = 0;
    this.hitsRequired = 3;
  }

  animate() {
    this.animationInterval = setInterval(() => {
      if (this.energy <= 0) {
        this.playAnimation(this.IMAGES_DEATH);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, this.animation_speed);

    this.movementInterval = setInterval(() => {
      if (!gameStarted) return;

      this.checkActivation();
      this.patrol();
    }, 100 / Config.FRAME_RATE);
  }

  patrol() {
    if (!this.isActive || this.energy <= 0) return;

    const patrolStart = Config.SECTION_START_ENDBOSS * (Config.LEVEL_END / Config.SECTION_COUNT);
    const patrolEnd = Config.SECTION_END_ENDBOSS * (Config.LEVEL_END / Config.SECTION_COUNT);

    if (this.movingRight) {
      this.moveRight();
      this.otherDirection = false;

      if (this.x >= patrolEnd) {
        this.movingRight = false;
      }
    } else {
      this.moveLeft();
      this.otherDirection = true;

      if (this.x <= patrolStart) {
        this.movingRight = true;
      }
    }
  }

  checkActivation() {
    if (!this.world || !this.world.character || this.energy <= 0) return;

    let distance = Math.abs(this.x - this.world.character.x);
    if (distance < this.activation_distance) {
      this.isActive = true;
    }
  }

  isDead() {
    return this.energy <= 0;
  }

  hit(damage = 20) {
    if (this.isDead()) return;
    // Setzen Sie lastHit explizit, um sicherzustellen, dass isHurt() funktioniert.
    this.lastHit = new Date().getTime();
    // Increment hits
    this.hitsTaken++;
    console.log('Boss Hit! Hits:', this.hitsTaken, 'Energy before:', this.energy);
    // Apply damage or check hits
    if (this.hitsTaken >= this.hitsRequired) {
      this.energy = 0;
    } else {
      // Optional: Reduce energy slightly if you want a health bar effect,
      // but death is determined by hitsTaken.
      this.energy -= damage;
      if (this.energy < 0) this.energy = 10; // Prevent accidental death by energy drain
    }
  }
}
