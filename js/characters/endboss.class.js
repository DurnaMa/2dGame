class Endboss extends Enemy {
  y = Config.ENEMY.ENDBOSS.Y;
  start_x = Config.ENEMY.ENDBOSS.START_X;
  height = Config.ENEMY.ENDBOSS.HEIGHT;
  width = Config.ENEMY.ENDBOSS.WIDTH;
  speed = Config.ENEMY.ENDBOSS.MIN_SPEED;
  animation_speed = Config.ENEMY.ENDBOSS.ANIMATION_SPEED;
  activation_distance = Config.ENEMY.ENDBOSS.ACTIVATION_DISTANCE;

  otherDirection = true;
  isActive = false;

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

  IMAGES_ANGER = [
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Anger1.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Anger2.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Anger3.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Anger4.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Anger5.png',
  ];

  IMAGES_ATTACK = [
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Attack1.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Attack2.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Attack3.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Attack4.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Attack5.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Attack6.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Attack7.png',
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEATH);
    this.loadImages(this.IMAGES_ANGER);
    this.loadImages(this.IMAGES_ATTACK);
    this.offset = {
      top: Config.ENEMY.ENDBOSS.OFFSET.TOP,
      left: Config.ENEMY.ENDBOSS.OFFSET.LEFT,
      right: Config.ENEMY.ENDBOSS.OFFSET.RIGHT,
      bottom: Config.ENEMY.ENDBOSS.OFFSET.BOTTOM,
    };
    this.x = this.start_x;
    this.animate();
    this.energy = 100;
    this.lastHit = 0;
    this.hitsTaken = 0;
    this.hitsRequired = Config.ENEMY.ENDBOSS.HITS_REQUIRED;
    this.isAttacking = false;
    this.attackCooldown = false;
    this.isAngry = false;
    this.moveRight();
  }

  animate() {
    this.animationInterval = setTrackedInterval(
      () => this.updateAnimation(),
      this.animation_speed,
      'Endboss Animation'
    );
    setTrackedInterval(() => this.updateMovement(), 1000 / Config.FRAME_RATE, 'Endboss Movement');
  }

  updateAnimation() {
    if (this.energy <= 0) {
      this.playAnimation(this.IMAGES_DEATH);
    } else if (this.isAngry) {
      this.playAnimation(this.IMAGES_ANGER);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAttacking) {
      this.playAnimation(this.IMAGES_ATTACK);
      if (this.currentImage >= this.IMAGES_ATTACK.length) {
        this.endAttack();
      }
    } else if (this.isInAttackRange() && !this.attackCooldown && this.isActive) {
      this.startAttack();
      this.playAnimation(this.IMAGES_ATTACK);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  updateMovement() {
    if (!this.world) return;
    this.checkActivation();
    if (this.shouldNotMove()) return;
    if (this.isInAttackRange() && !this.attackCooldown) {
    } else if (this.isCharacterNear() && this.isActive) {
      this.chaseCharacter();
    } else {
      this.patrol();
    }
  }

  shouldNotMove() {
    return this.energy <= 0 || this.isAngry || this.isAttacking;
  }

  patrol() {
    if (!this.isActive) return;

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

  hit(damage = Config.ENEMY.ENDBOSS.DAMAGE_PER_HIT) {
    if (this.isDead()) return;
    this.lastHit = new Date().getTime();
    this.hitsTaken++;
    console.log('Boss Hit! Hits:', this.hitsTaken, 'Energy before:', this.energy);

    this.isAngry = true;
    this.isAttacking = false;
    this.currentImage = 0;
    setTimeout(() => {
      this.isAngry = false;
    }, Config.ENEMY.ENDBOSS.ANGER_DURATION);

    if (this.hitsTaken >= this.hitsRequired) {
      this.energy = 0;
    } else {
      this.energy -= damage;
      if (this.energy < 0) this.energy = Config.ENEMY.ENDBOSS.MIN_ENERGY;
    }
  }
}
