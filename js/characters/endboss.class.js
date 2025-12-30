class Endboss extends MovableObject {
  height = GAME_CONFIG.ENEMY.BOSS.HEIGHT;
  width = GAME_CONFIG.ENEMY.BOSS.WIDTH;
  y = GAME_CONFIG.ENEMY.BOSS.Y;
  x = 0;

  otherDirection = true;
  isActive = false;
  movingRight = false;
  speed = GAME_CONFIG.ENEMY.BOSS.SPEED;

  IMAGES_WALKING = [
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk1.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk2.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk3.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk4.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk5.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk6.png',
  ];

  IMAGES_HURT =[
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Hurt1.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Hurt2.png'
  ]

  IMAGES_DEATH =[
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Death0.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Death1.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Death2.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Death3.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Death4.png',
  ]

  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEATH);
    this.offset = {
      top: GAME_CONFIG.ENEMY.BOSS.OFFSET.TOP,
      left: GAME_CONFIG.ENEMY.BOSS.OFFSET.LEFT,
      right: GAME_CONFIG.ENEMY.BOSS.OFFSET.RIGHT,
      bottom: GAME_CONFIG.ENEMY.BOSS.OFFSET.BOTTOM,
    };
    this.x = GAME_CONFIG.ENEMY.BOSS.START_X;
    this.animate();
    this.energy = 100;
    this.lastHit = 0;
    this.hitsTaken = 0
    this.hitsRequired = 3
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
    }, GAME_CONFIG.ENEMY.BOSS.ANIMATION_SPEED);

    this.movementInterval = setInterval(() => {
      if (!gameStarted) return;

      this.checkActivation();
      this.patrol();
    }, 100 / GAME_CONFIG.FRAME_RATE);
  }

  patrol() {
    if (!this.isActive || this.energy <= 0) return;

    const patrolStart = GAME_CONFIG.ENEMY.BOSS.START_X - GAME_CONFIG.ENEMY.BOSS.PATROL_RANGE;
    const patrolEnd = GAME_CONFIG.ENEMY.BOSS.START_X + GAME_CONFIG.ENEMY.BOSS.PATROL_RANGE;

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
    if (distance < GAME_CONFIG.ENEMY.BOSS.ACTIVATION_DISTANCE) {
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
