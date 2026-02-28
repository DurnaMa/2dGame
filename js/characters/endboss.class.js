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
  hadFirstContact = false;
  isIntroAngry = false;

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
    this.loadAllImages();
    this.x = this.start_x;
    this.initOffsets();
    this.initCombatState();
    this.animate();
  }

  /** Loads all animation image sets into the cache. */
  loadAllImages() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEATH);
    this.loadImages(this.IMAGES_ANGER);
    this.loadImages(this.IMAGES_ATTACK);
  }

  /** Sets the collision offset from config. */
  initOffsets() {
    this.offset = {
      top: Config.ENEMY.ENDBOSS.OFFSET.TOP,
      left: Config.ENEMY.ENDBOSS.OFFSET.LEFT,
      right: Config.ENEMY.ENDBOSS.OFFSET.RIGHT,
      bottom: Config.ENEMY.ENDBOSS.OFFSET.BOTTOM,
    };
  }

  /** Initializes all combat-related state variables. */
  initCombatState() {
    this.energy = 100;
    this.lastHit = 0;
    this.hitsTaken = 0;
    this.hitsRequired = Config.ENEMY.ENDBOSS.HITS_REQUIRED;
    this.isAttacking = false;
    this.attackCooldown = false;
    this.isAngry = false;
  }

  /** Starts animation and movement intervals. */
  animate() {
    this.animationInterval = setTrackedInterval(
      () => this.updateAnimation(),
      this.animation_speed,
      'Endboss Animation'
    );
    setTrackedInterval(() => this.updateMovement(), 1000 / Config.FRAME_RATE, 'Endboss Movement');
  }

  /** Updates the animation based on the current state. */
  updateAnimation() {
    if (this.energy <= 0) {
      this.playAnimation(this.IMAGES_DEATH);
      return;
    }
    if (this.isIntroAngry) {
      this.playAnimation(this.IMAGES_ANGER);
      return;
    }
    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      return;
    }
    if (this.isAttacking) {
      this.playAttackAnimation();
      return;
    }
    if (this.isInAttackRange() && !this.attackCooldown && this.isActive) {
      this.startAttack();
      this.playAnimation(this.IMAGES_ATTACK);
      return;
    }
    this.playAnimation(this.IMAGES_WALKING);
  }

  /** Updates the endboss movement per frame. */
  updateMovement() {
    if (!this.world) return;
    this.checkActivation();
    if (this.shouldNotMove()) return;
    this.updateSpeed();
    this.updatePosition();
  }

  /** Updates the movement speed based on current health phase. */
  updateSpeed() {
    const healthPercentage = (this.energy / 100) * 100;
    const THRESHOLD_PHASE_2 = Config.ENEMY.ENDBOSS.HEALTH_THRESHOLD_PHASE_2;
    const THRESHOLD_PHASE_3 = Config.ENEMY.ENDBOSS.HEALTH_THRESHOLD_PHASE_3;
    if (healthPercentage < THRESHOLD_PHASE_3) {
      this.speed = Config.ENEMY.ENDBOSS.SPEED_PHASE_3;
      this.triggerTeleport();
    } else if (healthPercentage < THRESHOLD_PHASE_2) {
      this.speed = Config.ENEMY.ENDBOSS.SPEED_PHASE_2;
    } else {
      this.speed = Config.ENEMY.ENDBOSS.SPEED;
    }
  }

  /** Triggers a positional teleport if the teleport cooldown has expired. */
  triggerTeleport() {
    if (this.teleportCooldown) return;
    this.teleportCooldown = true;
    setTimeout(() => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      this.x = this.world.character.x + direction * Config.ENEMY.ENDBOSS.TELEPORT_DISTANCE;
      this.teleportCooldown = false;
    }, Config.ENEMY.ENDBOSS.TELEPORT_INTERVAL);
  }

  /** Selects movement mode: stop in range, chase, or patrol. */
  updatePosition() {
    if (this.isInAttackRange() && !this.attackCooldown) {
      return;
    } else if (this.isCharacterNear() && this.isActive) {
      this.chaseCharacter();
    } else {
      this.patrol();
    }
  }

  /**
   * Checks if the endboss should skip movement this frame.
   * @returns {boolean}
   */
  shouldNotMove() {
    return this.energy <= 0 || this.isAngry || this.isAttacking || this.isIntroAngry;
  }

  /** Triggers the anger intro animation on first contact with the character. */
  triggerIntroAnger() {
    this.hadFirstContact = true;
    this.isIntroAngry = true;
    this.currentImage = 0;
    const introDuration = this.IMAGES_ANGER.length * this.animation_speed;
    setTimeout(() => {
      this.isIntroAngry = false;
    }, introDuration);
  }

  /** Moves the endboss back and forth within the designated patrol section. */
  patrol() {
    if (!this.isActive) return;
    const patrolStart = Config.SECTION_START_ENDBOSS * (Config.LEVEL_END / Config.SECTION_COUNT);
    const patrolEnd = Config.SECTION_END_ENDBOSS * (Config.LEVEL_END / Config.SECTION_COUNT);
    if (this.movingRight) {
      this.moveRight();
      this.otherDirection = false;
      if (this.x >= patrolEnd) this.movingRight = false;
    } else {
      this.moveLeft();
      this.otherDirection = true;
      if (this.x <= patrolStart) this.movingRight = true;
    }
  }

  /** Activates the endboss when the character comes within range. */
  checkActivation() {
    if (!this.world || !this.world.character || this.energy <= 0) return;
    const distance = Math.abs(this.x - this.world.character.x);
    if (distance < this.activation_distance) {
      if (!this.hadFirstContact) this.triggerIntroAnger();
      this.isActive = true;
    }
  }

  /**
   * Checks if the endboss is dead.
   * @returns {boolean}
   */
  isDead() {
    return this.energy <= 0;
  }

  /**
   * Applies damage, triggers anger state, and updates energy.
   * @param {number} [damage=Config.ENEMY.ENDBOSS.DAMAGE_PER_HIT] - Damage amount.
   */
  hit(damage = Config.ENEMY.ENDBOSS.DAMAGE_PER_HIT) {
    if (this.isDead()) return;
    this.lastHit = new Date().getTime();
    this.hitsTaken++;
    this.applyHitState();
    this.updateEnergyAfterHit(damage);
  }

  /** Sets the angry state and resets attack on hit. */
  applyHitState() {
    this.isAngry = true;
    this.isAttacking = false;
    this.currentImage = 0;
    setTimeout(() => {
      this.isAngry = false;
    }, Config.ENEMY.ENDBOSS.ANGER_DURATION);
  }

  /**
   * Reduces energy or sets it to zero when the hit threshold is reached.
   * @param {number} damage - Damage amount to subtract.
   */
  updateEnergyAfterHit(damage) {
    if (this.hitsTaken >= this.hitsRequired) {
      this.energy = 0;
    } else {
      this.energy -= damage;
      if (this.energy < 0) this.energy = Config.ENEMY.ENDBOSS.MIN_ENERGY;
    }
  }

  /** Begins an attack and spawns a projectile if in phase 2 or later. */
  startAttack() {
    this.isAttacking = true;
    this.currentImage = 0;
    const isPhase2OrLater = this.hitsTaken >= Config.ENEMY.ENDBOSS.PROJECTILE_UNLOCK_AT_HIT;
    if (this.world && isPhase2OrLater) {
      const projectileX = this.x;
      const projectileY = this.y + Config.ENEMY.ENDBOSS.PROJECTILE_Y_OFFSET;
      const projectile = new ThrowableObject(projectileX, projectileY, this.world);
      const direction = this.world.character.x > this.x ? 1 : -1;
      projectile.speedX = direction * Config.ENEMY.ENDBOSS.PROJECTILE_SPEED;
      this.world.throwableObject.push(projectile);
    }
  }
}
