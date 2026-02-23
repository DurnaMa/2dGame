class CollisionManager {
  constructor(world) {
    this.world = world;
  }

  isPlayerFalling(character) {
    return character.speedY < 0;
  }

  isPlayerAboveFalling(character, enemy) {
    const playerMiddle = character.y + character.height / Config.HALF;
    const enemyMiddle = enemy.y + enemy.height / Config.HALF;
    return playerMiddle < enemyMiddle;
  }

  isFeetHitEnemyHead(character, enemy) {
    const enemyTop = enemy.y + enemy.offset.top;
    const characterFeet = character.y + character.height - character.offset.bottom;
    const distanceFeetToHead = characterFeet - enemyTop;
    return distanceFeetToHead >= 0 && distanceFeetToHead <= Config.COLLISION.JUMP_KILL_HEIGHT_MAX;
  }

  isJumpingOnEnemy(character, enemy) {
    const falling = this.isPlayerFalling(character);
    const aboveMiddle = this.isPlayerAboveFalling(character, enemy);
    const feetHitHead = this.isFeetHitEnemyHead(character, enemy);

    return falling && aboveMiddle && feetHitHead;
  }

  checkAllCollisions() {
    if (!this.world.level) return;
    this.checkEnemyCollisions();
    this.checkItemCollisions();
    this.checkEndbossCollisions();
    this.cleanupDeadEnemies();
    this.checkProjectileEnemyCollisions();
  }

  cleanupDeadEnemies() {
    this.world.level.enemies = this.world.level.enemies.filter((enemy) => !enemy.markedForRemoval);
  }

  checkEnemyCollisions() {
    this.world.level.enemies.forEach((enemy) => {
      if (this.world.character.isColliding(enemy)) {
        this.handleEnemyCollision(enemy);
      }
    });
  }

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

  checkEndbossCollisions() {
    this.world.level.endBoss.forEach((endBoss) => {
      if (this.world.character.isColliding(endBoss)) {
        this.handleEndbossCollision(endBoss);
      }
    });
  }

  handleEnemyCollision(enemy) {
    if (enemy.isDead) return;
    const character = this.world.character;

    if (this.isJumpingOnEnemy(character, enemy)) {
      this.stompEnemy(enemy, character);
      return;
    }
    this.applyEnemyDamage(character);
  }

  stompEnemy(enemy, character) {
    enemy.isDead = true;
    character.speedY += Config.COLLISION.JUMP_BOUNCE_POWER;
    character.hit = true;
    setTimeout(() => {
      character.hit = false;
    }, Config.COLLISION.INVULNERABILITY_SHORT);
  }

  applyEnemyDamage(character) {
    if (!character.hit && !character.isDeath()) {
      character.hit = true;

      this.world.statusBar.reduceHealth(character);
      character.lastHit = new Date().getTime();

      setTimeout(() => {
        character.hit = false;
      }, Config.COLLISION.INVULNERABILITY_LONG);
    }
  }

  handleCoinCollection(coin) {
    coin.collect();
  }

  handleBottleCollection(bottle) {
    bottle.collect();
    this.world.magicBar.addMagic(Config.BOTTLE.MAGIC_AMOUNT);
  }

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

  checkProjectileEnemyCollisions() {
    this.world.throwableObject = this.world.throwableObject.filter((projectile) => {
      return !this.handleProjectileCollision(projectile);
    });
  }

  handleProjectileCollision(projectile) {
    if (this.hitEnemy(projectile)) return true;
    if (this.hitEndBoss(projectile)) return true;
    if (this.isOutOfBounds(projectile)) return true;
    return false;
  }

  hitEnemy(projectile) {
    const enemy = this.world.level.enemies.find((enemy) => !enemy.isDead && projectile.isColliding(e));
    if (enemy) {
      enemy.isDead = true;
      return true;
    }
    return false;
  }

  hitEndBoss(projectile) {
    const boss = this.world.level.endBoss.find((boss) => projectile.isColliding(boss));
    if (boss) {
      boss.hit();
      return true;
    }
    return false;
  }

  isOutOfBounds(projectile) {
    return Math.abs(projectile.x - projectile.startX) > Config.CANVAS_WIDTH;
  }
}
