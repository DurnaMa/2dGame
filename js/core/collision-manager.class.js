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
    const above = this.isFeetHitEnemyHead(character, enemy);

    return falling && above;
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

    if (character.speedY > 0) {
      return;
    }
    if (this.isJumpingOnEnemy(this.world.character, enemy)) {
      enemy.isDead = true;
      this.world.character.speedY += Config.COLLISION.JUMP_BOUNCE_POWER;
      this.world.character.hit = true;
      setTimeout(() => {
        this.world.character.hit = false;
      }, Config.COLLISION.INVULNERABILITY_SHORT);
      return;
    }
    if (!this.world.character.hit && !this.world.character.isDeath()) {
      this.world.character.hit = true;
      this.world.character.energy -= Config.COLLISION.DAMAGE_NORMAL;
      if (this.world.character.energy <= 0) {
        this.world.character.energy = 0;
      }
      this.world.statusBar.setPercentage(this.world.character.energy);
      setTimeout(() => {
        this.world.character.hit = false;
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
    if (!this.world.character.hit && !this.world.character.isDeath()) {
      this.world.character.energy -= Config.COLLISION.DAMAGE_BOSS;
      if (this.world.character.energy < 0) {
        this.world.character.energy = 0;
      }

      this.world.character.hit = true;
      setTimeout(() => {
        this.world.character.hit = false;
      }, Config.COLLISION.INVULNERABILITY_LONG);

      this.world.statusBar.setPercentage(this.world.character.energy);
    }
  }

  checkProjectileEnemyCollisions() {
    for (let shotsFire = this.world.throwableObject.length - 1; shotsFire >= 0; shotsFire--) {
      const projectile = this.world.throwableObject[shotsFire];
      let projectileHasHit = false;
      for (const enemy of this.world.level.enemies) {
        if (enemy.isDead) continue;

        if (projectile.isColliding(enemy)) {
          console.log('Collision TRUE with:', enemy.constructor.name);
          enemy.isDead = true;
          projectileHasHit = true;
          break;
        }
      }

      if (projectileHasHit) {
        this.world.throwableObject.splice(shotsFire, 1);
        continue;
      }

      for (const enemy of this.world.level.endBoss) {
        if (projectile.isColliding(enemy)) {
          console.log('--- ENDBOSS HIT TRIGGERED ---');
          enemy.hit();
          projectileHasHit = true;
          break;
        }
      }

      if (projectileHasHit || Math.abs(projectile.x - projectile.startX) > Config.CANVAS_WIDTH) {
        this.world.throwableObject.splice(shotsFire, 1);
      }
    }
  }
}
