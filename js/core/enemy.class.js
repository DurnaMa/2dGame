class Enemy extends MovableObject {
  attackCooldown = false;
  isAttacking = false;
  deathAnimationStarted = false;
  removalScheduled = false;

  getDistanceToCharacter() {
    if (!this.world || !this.world.character) return Infinity;
    return Math.abs(this.x - this.world.character.x);
  }

  getDirectionToCharacter() {
    if (!this.world || !this.world.character) return 0;
    return this.world.character.x - this.x;
  }

  isCharacterNear() {
    return this.getDistanceToCharacter() < Config.ENEMY.DRAGON.CHASE_DISTANCE;
  }

  isInAttackRange() {
    return this.getDistanceToCharacter() < Config.ENEMY.DRAGON.ATTACK_RANGE;
  }

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

  startAttack() {
    if (this.attackCooldown || this.isAttacking) return;
    this.isAttacking = true;
    this.currentImage = 0;

    const direction = this.getDirectionToCharacter();
    this.otherDirection = direction < 0;
  }

  endAttack() {
    this.isAttacking = false;
    this.attackCooldown = true;
    setTimeout(() => {
      this.attackCooldown = false;
    }, Config.ENEMY.DRAGON.ATTACK_COOLDOWN);
  }

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

  remove() {
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);
    this.width = 0;
    this.height = 0;
    this.markedForRemoval = true;
  }
}
