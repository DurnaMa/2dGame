class World {
  character = new Rogue();

  level = level1;
  backgroundObjects = backgroundObjects;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  collisionManager;
  statusBar = new Statusbar();
  magicBar = new Magicbar();
  throwableObject = [];
  gameInterval;
  drawLoopRunning = true;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = level1;
    this.collisionManager = new CollisionManager(this);
    this.setWorld();
    this.setWorld();
    this.character.animate();
    this.draw();
    this.run();
    this.statusBar.setPercentage(this.character.energy);
  }

  setWorld() {
    this.character.world = this;

    // Helper to assign world to every object in an array
    const setWorldOnArray = (arr) => {
      if (Array.isArray(arr)) {
        arr.forEach((obj) => {
          if (obj) obj.world = this;
        });
      }
    };

    // Assign world to all relevant level objects so they can access world via this.world
    if (this.level) {
      setWorldOnArray(this.level.enemies);
      setWorldOnArray(this.level.endBoss);
      setWorldOnArray(this.level.backgroundObjectRocks);
      setWorldOnArray(this.level.coins);
      setWorldOnArray(this.level.bottles);
      setWorldOnArray(this.level.throwableObject);
    }

    // Also set world for any runtime arrays / UI elements
    setWorldOnArray(this.throwableObject);
    if (this.statusBar) this.statusBar.world = this;
    if (this.magicBar) this.magicBar.world = this;
  }

  run() {
    this.gameInterval = setInterval(() => {
      this.collisionManager.checkAllCollisions();
      this.checkThrowableObject();
    }, 1000 / GAME_CONFIG.FRAME_RATE);
  }

  checkThrowableObject() {
    if (this.keyboard.X && !this.firePressed && this.magicBar.shots > 0) {
      let fire = new ThrowableObject(this.character.x + GAME_CONFIG.WORLD.FIRE_OFFSET_X, this.character.y, this);
      this.throwableObject.push(fire);
      this.firePressed = true;
      this.magicBar.useMagic(GAME_CONFIG.WORLD.MAGIC_USE_PER_FIRE); // Verringert die Magie langsamer
    }

    if (!this.keyboard.X) {
      this.firePressed = false;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToMap(this.backgroundObjects);

    // Statusbar zeichnen
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.magicBar);
    this.ctx.translate(this.camera_x, 0);

    // Spielobjekte zeichnen
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObject);

    if (this.level) {
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.level.endBoss);
      this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.level.bottles);
    }
  }

  addToMap(movableObject) {
    // Nicht zeichnen wenn Objekt nicht sichtbar ist
    if (movableObject.visible === false || (movableObject.isVisible && movableObject.isVisible() === false)) {
      return;
    }

    this.ctx.save();

    // Parallax-Effekt für BackgroundObjects
    if (movableObject instanceof BackgroundObject) {
      this.ctx.translate(this.camera_x * movableObject.parallax, 0);
    } else {
      // Normale Kamera-Bewegung für andere Objekte
      this.ctx.translate(this.camera_x, 0);
    }

    if (movableObject.otherDirection) {
      this.ctx.translate(movableObject.x + movableObject.width, movableObject.y);
      this.ctx.scale(-1, 1);
      movableObject.draw(this.ctx);
      movableObject.drawBorder(this.ctx);
      movableObject.drawCollisionBorder(this.ctx);
      movableObject.drawCollisionMagic(this.ctx);
    } else {
      movableObject.draw(this.ctx);
      movableObject.drawBorder(this.ctx);
      movableObject.drawCollisionBorder(this.ctx);
      movableObject.drawCollisionMagic(this.ctx);
    }
    this.ctx.restore();
  }

  addObjectsToMap(objects) {
    objects.forEach((gameObject) => {
      this.addToMap(gameObject);
    });
  }

  stopGame() {
    this.drawLoopRunning = false;
    clearInterval(this.gameInterval);
    if (this.character) {
      this.character.stopAllIntervals();
    }
    // Also stop enemies and endboss
    if (this.level) {
      this.level.enemies.forEach(e => e.stopAllIntervals && e.stopAllIntervals());
      this.level.endBoss.forEach(e => e.stopAllIntervals && e.stopAllIntervals());
    }
  }

  isGameOver() {
    return this.character.energy <= 0;
  }

  isWin() {
    return this.level && this.level.endBoss && this.level.endBoss.every(boss => boss.isDead && boss.isDead());
  }
}
