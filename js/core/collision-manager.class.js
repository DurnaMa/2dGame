class CollisionManager {
  constructor(world) {
    this.world = world;
  }

  /**
   * Checks if the player is falling.
   * @param {Character} character - The player character
   * @returns {boolean} True if the player is falling
   */
  isPlayerFalling(character) {
    return character.speedY < 0;
  }

  /**
   * Checks if the player is above the middle of the enemy.
   * @param {Character} character - The player character
   * @param {Enemy} enemy - The enemy object
   * @returns {boolean} True if the player is above the enemy's middle
   */
  isPlayerAboveFalling(character, enemy) {
    const playerMiddle = character.y + character.height / Config.HALF;
    const enemyMiddle = enemy.y + enemy.height / Config.HALF;
    return playerMiddle < enemyMiddle;
  }

  /**
   * Checks if the player's feet hit the enemy's head.
   * @param {Character} character - The player character
   * @param {Enemy} enemy - The enemy object
   * @returns {boolean} True if the feet hit the head within the kill height
   */
  isFeetHitEnemyHead(character, enemy) {
    const enemyTop = enemy.y + enemy.offset.top;
    const characterFeet = character.y + character.height - character.offset.bottom;
    const distanceFeetToHead = characterFeet - enemyTop;
    return distanceFeetToHead >= 0 && distanceFeetToHead <= Config.COLLISION.JUMP_KILL_HEIGHT_MAX;
  }

  /**
   * Checks if the player is jumping on the enemy.
   * @param {Character} character - The player character
   * @param {Enemy} enemy - The enemy object
   * @returns {boolean} True if the player is successfully jumping on the enemy
   */
  isJumpingOnEnemy(character, enemy) {
    const falling = this.isPlayerFalling(character);
    const aboveMiddle = this.isPlayerAboveFalling(character, enemy);
    const feetHitHead = this.isFeetHitEnemyHead(character, enemy);

    return falling && aboveMiddle && feetHitHead;
  }

  /**
   * Checks all collision types.
   */
  checkAllCollisions() {
    if (!this.world.level) return;
    this.checkEnemyCollisions();
    this.checkItemCollisions();
    this.checkEndbossCollisions();
    this.cleanupDeadEnemies();
    this.checkProjectileEnemyCollisions();
  }

  /**
   * Removes dead enemies from the level.
   */
  cleanupDeadEnemies() {
    this.world.level.enemies = this.world.level.enemies.filter((enemy) => !enemy.markedForRemoval);
  }

  /**
   * Checks collisions with enemies.
   */
  checkEnemyCollisions() {
    this.world.level.enemies.forEach((enemy) => {
      if (this.world.character.isColliding(enemy)) {
        this.handleEnemyCollision(enemy);
      }
    });
  }

  /**
   * Checks collisions with items.
   */
  checkItemCollisions() {
    this.world.level.coins.forEach((coin) => {
      if (!coin.isCollected() && this.world.character.isColliding(coin)) {
        this.handleCoinCollection(coin);
      }
    });

    this.world.level.bottles.forEach((bottle) => {
      if (!bottle.isCollected() && this.world.character.isColliding(bottle)) {
        this.handleBottleCollection(bottle);
      }
    });
  }

  /**
   * Checks collisions with the endboss.
   */
  checkEndbossCollisions() {
    this.world.level.endBoss.forEach((endBoss) => {
      if (this.world.character.isColliding(endBoss)) {
        this.handleEndbossCollision(endBoss);
      }
    });
  }

  /**
   * Handles collision with an enemy.
   * @param {Enemy} enemy - The enemy that collided with the player
   */
  handleEnemyCollision(enemy) {
    if (enemy.isDead) return;
    const character = this.world.character;

    if (this.isJumpingOnEnemy(character, enemy)) {
      this.stompEnemy(enemy, character);
      return;
    }
    this.applyEnemyDamage(character);
  }

  /**
   * Kills an enemy by stomping on it.
   * @param {Enemy} enemy - The enemy to stomp
   * @param {Character} character - The player character
   */
  stompEnemy(enemy, character) {
    enemy.isDead = true;
    character.speedY += Config.COLLISION.JUMP_BOUNCE_POWER;
    character.hit = true;
    setTimeout(() => {
      character.hit = false;
    }, Config.COLLISION.INVULNERABILITY_SHORT);
  }

  /**
   * Applies damage to the character from an enemy.
   * @param {Character} character - The player character
   */
  applyEnemyDamage(character) {
    if (!character.hit && !character.isDeath()) {
      character.hit = true;

      this.world.statusBar.reduceHealthBy(character, Config.COLLISION.DAMAGE_NORMAL);
      character.lastHit = new Date().getTime();

      setTimeout(() => {
        character.hit = false;
      }, Config.COLLISION.INVULNERABILITY_LONG);
    }
  }

  /**
   * Handles coin collection.
   * @param {Coin} coin - The coin that was collected
   */
  handleCoinCollection(coin) {
    coin.collect();
  }

  /**
   * Handles bottle collection.
   * @param {Bottle} bottle - The bottle that was collected
   */
  handleBottleCollection(bottle) {
    bottle.collect();
    this.world.magicBar.addMagic(Config.BOTTLE.MAGIC_AMOUNT);
  }

  /**
   * Handles collision with the endboss.
   * @param {Endboss} endBoss - The endboss that collided with the player
   */
  handleEndbossCollision(endBoss) {
    const character = this.world.character;

    if (!character.hit && !character.isDeath()) {
      this.world.statusBar.reduceHealthBy(character, Config.COLLISION.DAMAGE_BOSS);
      character.lastHit = new Date().getTime();

      character.hit = true;
      setTimeout(() => {
        character.hit = false;
      }, Config.COLLISION.INVULNERABILITY_LONG);
    }
  }

  /**
   * Checks projectile-enemy collisions.
   */
  checkProjectileEnemyCollisions() {
    this.world.throwableObject = this.world.throwableObject.filter((projectile) => {
      return !this.handleProjectileCollision(projectile);
    });
  }

  /**
   * Handles projectile collision.
   * @param {ThrowableObject} projectile - The projectile that may have collided
   * @returns {boolean} True if the projectile should be removed
   */
  handleProjectileCollision(projectile) {
    if (this.hitEnemy(projectile)) return true;
    if (this.hitEndBoss(projectile)) return true;
    if (this.isOutOfBounds(projectile)) return true;
    return false;
  }

  /**
   * Checks if a projectile hits an enemy.
   * @param {ThrowableObject} projectile - The projectile to check
   * @returns {boolean} True if the projectile hit an enemy
   */
  hitEnemy(projectile) {
    const enemy = this.world.level.enemies.find((enemy) => !enemy.isDead && projectile.isColliding(enemy));
    if (enemy) {
      enemy.isDead = true;
      return true;
    }
    return false;
  }

  /**
   * Checks if a projectile hits the endboss.
   * @param {ThrowableObject} projectile - The projectile to check
   * @returns {boolean} True if the projectile hit the endboss
   */
  hitEndBoss(projectile) {
    const boss = this.world.level.endBoss.find((boss) => projectile.isColliding(boss));
    if (boss) {
      boss.hit();
      return true;
    }
    return false;
  }

  /**
   * Checks if a projectile is out of bounds.
   * @param {ThrowableObject} projectile - The projectile to check
   * @returns {boolean} True if the projectile is out of bounds
   */
  isOutOfBounds(projectile) {
    return Math.abs(projectile.x - projectile.startX) > Config.CANVAS_WIDTH;
  }
}
