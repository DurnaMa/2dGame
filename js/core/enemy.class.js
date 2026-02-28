class Enemy extends MovableObject {
  attackCooldown = false;
  isAttacking = false;
  deathAnimationStarted = false;
  removalScheduled = false;

  /**
   * Returns the distance to the character.
   * @returns {number} The absolute distance between this enemy and the character.
   */
  getDistanceToCharacter() {
    if (!this.world || !this.world.character) return Infinity;
    return Math.abs(this.x - this.world.character.x);
  }

  /**
   * Returns the signed direction toward the character.
   * @returns {number} Positive = right, negative = left.
   */
  getDirectionToCharacter() {
    if (!this.world || !this.world.character) return 0;
    return this.world.character.x - this.x;
  }

  /**
   * Checks whether the character is within chase distance.
   * @returns {boolean}
   */
  isCharacterNear() {
    return this.getDistanceToCharacter() < Config.ENEMY.DRAGON.CHASE_DISTANCE;
  }

  /**
   * Checks whether the character is within attack range.
   * @returns {boolean}
   */
  isInAttackRange() {
    return this.getDistanceToCharacter() < Config.ENEMY.DRAGON.ATTACK_RANGE;
  }

  /** Moves the enemy toward the character, respecting a small dead zone. */
  chaseCharacter() {
    if (!this.world || !this.world.character) return;
    const direction = this.getDirectionToCharacter();
    const DEAD_ZONE = Config.ENEMY.DRAGON.DEAD_ZONE;
    if (direction > DEAD_ZONE) {
      this.moveRight();
      this.otherDirection = false;
    } else if (direction < -DEAD_ZONE) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }

  /**
   * Starts an attack if not already attacking or on cooldown.
   * Switches to the wider attack collision offset if one is defined.
   */
  startAttack() {
    if (this.attackCooldown || this.isAttacking) return;
    this.isAttacking = true;
    this.currentImage = 0;
    this.otherDirection = this.getDirectionToCharacter() < 0;
    this.applyAttackOffset();
  }

  /**
   * Ends the attack, restores the default collision offset, and starts the cooldown timer.
   */
  endAttack() {
    this.isAttacking = false;
    this.attackCooldown = true;
    this.restoreDefaultOffset();
    setTimeout(() => {
      this.attackCooldown = false;
    }, this.resolveCooldownTime());
  }

  /**
   * Switches to the attack offset if the subclass has defined OFFSET_ATTACK.
   * Called automatically by startAttack().
   */
  applyAttackOffset() {
    if (this.OFFSET_ATTACK) this.offset = this.OFFSET_ATTACK;
  }

  /**
   * Restores the default collision offset after an attack ends.
   * Called automatically by endAttack().
   */
  restoreDefaultOffset() {
    if (this.OFFSET_DEFAULT) this.offset = this.OFFSET_DEFAULT;
  }

  /**
   * Calculates the attack cooldown duration based on current health phase.
   * @returns {number} Cooldown duration in milliseconds.
   */
  resolveCooldownTime() {
    const healthPercentage = (this.energy / 100) * 100;
    if (healthPercentage < Config.ENEMY.ENDBOSS.HEALTH_THRESHOLD_PHASE_3) return Config.ENEMY.ENDBOSS.COOLDOWN_PHASE_3;
    if (healthPercentage < Config.ENEMY.ENDBOSS.HEALTH_THRESHOLD_PHASE_2) return Config.ENEMY.ENDBOSS.COOLDOWN_PHASE_2;
    return Config.ENEMY.ENDBOSS.ATTACK_COOLDOWN;
  }

  /** Plays the death animation and schedules removal after it completes. */
  handleDeathAnimation() {
    if (!this.deathAnimationStarted) {
      this.currentImage = 0;
      this.deathAnimationStarted = true;
    }
    if (this.currentImage < this.IMAGES_DEATH.length) {
      this.playAnimation(this.IMAGES_DEATH);
    } else {
      this.img = this.imageCache[this.IMAGES_DEATH[this.IMAGES_DEATH.length - 1]];
      if (!this.removalScheduled) {
        this.removalScheduled = true;
        setTimeout(() => {
          this.remove();
        }, this.delay);
      }
    }
  }

  /** Clears intervals, hides the enemy, and marks it for removal. */
  remove() {
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);
    this.width = 0;
    this.height = 0;
    this.markedForRemoval = true;
  }

  /** Starts movement and animation intervals. */
  animate() {
    setTrackedInterval(() => this.updateMovement(), 1000 / Config.FRAME_RATE, 'BigKnight Movement');
    setTrackedInterval(() => this.updateAnimation(), this.animation_speed, 'BigKnight Animation');
  }

  /** Updates movement per frame based on character distance. */
  updateMovement() {
    if (!gameStarted || this.isDead || this.isAttacking) return;
    this.updateFacingDirection();
    this.selectMovementBehavior();
  }

  /** Selects the correct movement behavior based on character proximity. */
  selectMovementBehavior() {
    const distance = this.getDistanceToCharacter();
    if (distance > Config.ENEMY.DRAGON.AWARENESS_RANGE) {
      this.patrol();
    } else if (this.isInAttackRange() && !this.attackCooldown) {
      return;
    } else if (this.isCharacterNear()) {
      this.chaseCharacter();
    } else {
      this.patrol();
    }
  }

  /** Updates the facing direction to always look toward the character. */
  updateFacingDirection() {
    if (this.isCharacterNear()) {
      this.otherDirection = this.getDirectionToCharacter() < 0;
    }
  }

  /** Updates the animation based on the current enemy state. */
  updateAnimation() {
    if (!gameStarted) return;
    if (this.isDead) {
      this.handleDeathAnimation();
    } else if (this.isReadyToAttack()) {
      this.startAttack();
      this.playAttackAnimation();
    } else if (this.isAttacking) {
      this.playAttackAnimation();
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Checks if the enemy is in range and cooldown has expired.
   * @returns {boolean}
   */
  isReadyToAttack() {
    return this.isInAttackRange() && !this.attackCooldown;
  }

  /** Plays the attack animation and ends the attack when it finishes. */
  playAttackAnimation() {
    this.playAnimation(this.IMAGES_ATTACK);
    if (this.currentImage >= this.IMAGES_ATTACK.length) this.endAttack();
  }

  /** Patrols back and forth within a fixed range around the start position. */
  patrol() {
    const patrolStart = this.startX - Config.ENEMY.DRAGON.PATROL_RANGE;
    const patrolEnd = this.startX + Config.ENEMY.DRAGON.PATROL_RANGE;
    if (this.x >= patrolEnd) {
      this.patrolDirection = false;
    } else if (this.x <= patrolStart) {
      this.patrolDirection = true;
    }
    this.moveInPatrolDirection();
  }

  /** Moves and faces the enemy according to the current patrol direction. */
  moveInPatrolDirection() {
    if (this.patrolDirection) {
      this.moveRight();
      this.otherDirection = false;
    } else {
      this.moveLeft();
      this.otherDirection = true;
    }
  }
}
