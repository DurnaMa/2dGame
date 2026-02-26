class Enemy extends MovableObject {
  attackCooldown = false;
  isAttacking = false;
  deathAnimationStarted = false;
  removalScheduled = false;

  /**
   * Returns the distance to the character.
   * @returns {number} The absolute distance between this enemy and the character
   */
  getDistanceToCharacter() {
    if (!this.world || !this.world.character) return Infinity;
    return Math.abs(this.x - this.world.character.x);
  }

  /**
   * Returns the direction to the character.
   * @returns {number} The directional distance to the character (positive = right, negative = left)
   */
  getDirectionToCharacter() {
    if (!this.world || !this.world.character) return 0;
    return this.world.character.x - this.x;
  }

  /**
   * Checks whether the character is nearby.
   * @returns {boolean} True if the character is within chase distance
   */
  isCharacterNear() {
    return this.getDistanceToCharacter() < Config.ENEMY.DRAGON.CHASE_DISTANCE;
  }

  /**
   * Checks whether the character is within attack range.
   * @returns {boolean} True if the character is within attack range
   */
  isInAttackRange() {
    return this.getDistanceToCharacter() < Config.ENEMY.DRAGON.ATTACK_RANGE;
  }

  /**
   * Moves the opponent toward the character.
   */
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
   * Launch an attack.
   */
  startAttack() {
    if (this.attackCooldown || this.isAttacking) return;
    this.isAttacking = true;
    this.currentImage = 0;

    const direction = this.getDirectionToCharacter();
    this.otherDirection = direction < 0;
  }

  /**
   * Ends the attack and starts the cooldown.
   */
  endAttack() {
    this.isAttacking = false;
    this.attackCooldown = true;

    const healthPercentage = (this.energy / 100) * 100;
    const THRESHOLD_PHASE_2 = Config.ENEMY.ENDBOSS.HEALTH_THRESHOLD_PHASE_2;
    const THRESHOLD_PHASE_3 = Config.ENEMY.ENDBOSS.HEALTH_THRESHOLD_PHASE_3;
    const COOLDOWN_PHASE_2 = Config.ENEMY.ENDBOSS.COOLDOWN_PHASE_2;
    const COOLDOWN_PHASE_3 = Config.ENEMY.ENDBOSS.COOLDOWN_PHASE_3;
    const COOLDOWN_NORMAL = Config.ENEMY.ENDBOSS.ATTACK_COOLDOWN;

    let cooldownTime = COOLDOWN_NORMAL;

    if (healthPercentage < THRESHOLD_PHASE_3) {
      cooldownTime = COOLDOWN_PHASE_3;
    } else if (healthPercentage < THRESHOLD_PHASE_2) {
      cooldownTime = COOLDOWN_PHASE_2;
    }

    setTimeout(() => {
      this.attackCooldown = false;
    }, cooldownTime);
  }

  /**
   * Plays the death animation and schedules removal.
   */
  handleDeathAnimation() {
    if (!this.deathAnimationStarted) {
      this.currentImage = 0;
      this.deathAnimationStarted = true;
    }

    if (this.currentImage < this.IMAGES_DEATH.length) {
      this.playAnimation(this.IMAGES_DEATH);
    } else {
      const lastFramePath = this.IMAGES_DEATH[this.IMAGES_DEATH.length - 1];
      this.img = this.imageCache[lastFramePath];

      if (!this.removalScheduled) {
        this.removalScheduled = true;
        setTimeout(() => {
          this.remove();
        }, this.delay);
      }
    }
  }

  /**
   * Removes the enemy from the game.
   */
  remove() {
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);
    this.width = 0;
    this.height = 0;
    this.markedForRemoval = true;
  }

  /**
   * Starts movement and animation intervals.
   */
  animate() {
    setTrackedInterval(() => this.updateMovement(), 1000 / Config.FRAME_RATE, 'BigKnight Movement');
    setTrackedInterval(() => this.updateAnimation(), this.animation_speed, 'BigKnight Animation');
  }

  /**
   * Updates the enemy's movement per frame.
   */
  updateMovement() {
    if (!gameStarted || this.isDead || this.isAttacking) return;
    const distanceToCharacter = this.getDistanceToCharacter();
    const AWARENESS_RANGE = Config.ENEMY.DRAGON.AWARENESS_RANGE;
    this.updateFacingDirection();

    if (distanceToCharacter > AWARENESS_RANGE) {
      this.patrol();
    } else if (this.isInAttackRange() && !this.attackCooldown) {
      return;
    } else if (this.isCharacterNear()) {
      this.chaseCharacter();
    } else {
      this.patrol();
    }
  }

  /**
   * Updates the facing direction toward the character.
   */
  updateFacingDirection() {
    if (this.isCharacterNear()) {
      const direction = this.getDirectionToCharacter();
      this.otherDirection = direction < 0;
    }
  }

  /**
   * Updates the animation based on the current state.
   */
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
   * Checks if the enemy is ready to attack.
   * @returns {boolean} True if the enemy is in attack range and not on cooldown
   */
  isReadyToAttack() {
    return this.isInAttackRange() && !this.attackCooldown;
  }

  /**
   * Plays the attack animation.
   */
  playAttackAnimation() {
    this.playAnimation(this.IMAGES_ATTACK);
    if (this.currentImage >= this.IMAGES_ATTACK.length) {
      this.endAttack();
    }
  }

  patrol() {
    const PATROL_RANGE = Config.ENEMY.DRAGON.PATROL_RANGE;
    const patrolStart = this.startX - PATROL_RANGE;
    const patrolEnd = this.startX + PATROL_RANGE;

    if (this.x >= patrolEnd) {
      this.moveLeft();
      this.otherDirection = true;
    } else if (this.x <= patrolStart) {
      this.moveRight();
      this.otherDirection = false;
    } else {
      if (!this.patrolDirection) {
        this.patrolDirection = Math.random() > 0.5;
      }

      if (this.patrolDirection) {
        this.moveRight();
        this.otherDirection = false;
      } else {
        this.moveLeft();
        this.otherDirection = true;
      }
    }
  }
}
