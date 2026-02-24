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
    setTimeout(() => {
      this.attackCooldown = false;
    }, Config.ENEMY.DRAGON.ATTACK_COOLDOWN);
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
    this.updateFacingDirection();

    if (this.isInAttackRange() && !this.attackCooldown) return;
    if (this.isCharacterNear()) {
      this.chaseCharacter();
    } else {
      this.moveLeft();
      this.otherDirection = true;
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
}
