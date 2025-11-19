class Endboss extends MovableObject {
  height = GAME_CONFIG.ENEMY.BOSS.HEIGHT;
  width = GAME_CONFIG.ENEMY.BOSS.WIDTH;
  y = GAME_CONFIG.ENEMY.BOSS.Y;
  x = 0;

  otherDirection = true;

  IMAGES_WALKING = [
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk1.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk2.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk3.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk4.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk5.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk6.png',
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.offset = {
      top: GAME_CONFIG.ENEMY.BOSS.OFFSET.TOP,
      left: GAME_CONFIG.ENEMY.BOSS.OFFSET.LEFT,
      right: GAME_CONFIG.ENEMY.BOSS.OFFSET.RIGHT,
      bottom: GAME_CONFIG.ENEMY.BOSS.OFFSET.BOTTOM,
    };
    this.x = GAME_CONFIG.ENEMY.BOSS.START_X;
    this.isActive = false;
    this.movingRight = false;
    this.speed = GAME_CONFIG.ENEMY.BOSS.SPEED; // boss speed while patrolling (not active after revert)

    this.animate();
  }

  animate() {
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, GAME_CONFIG.ENEMY.BOSS.ANIMATION_SPEED);

    this.movemantInterval = setInterval(() => {
      this.checkActivation();
      this.patrol();
    }, 1000 / GAME_CONFIG.FRAME_RATE);
  }

  patrol() {
    if (!this.isActive) return;

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
    if (!this.world || !this.world.character) return;

    let distance = Math.abs(this.x - this.world.character.x);

    if (distance < GAME_CONFIG.ENEMY.BOSS.ACTIVATION_DISTANCE) {
      this.isActive = true;
    }
  }
}
