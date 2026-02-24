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
    this.character.animate();
    this.draw();
    this.run();
    this.statusBar.setPercentage(this.character.energy);
  }

  /**
   * Sets the world reference on all game objects.
   */
  setWorld() {
    this.character.world = this;
    const setWorldOnArray = (arr) => {
      if (Array.isArray(arr)) {
        arr.forEach((obj) => {
          if (obj) obj.world = this;
        });
      }
    };
    this.drawObjectLvel(setWorldOnArray);
    setWorldOnArray(this.throwableObject);
    if (this.statusBar) this.statusBar.world = this;
    if (this.magicBar) this.magicBar.world = this;
  }

  /**
   * Sets the world reference on all level objects.
   * @param {Function} setWorldOnArray - Function to set world on array elements
   */
  drawObjectLvel(setWorldOnArray) {
    if (this.level) {
      setWorldOnArray(this.level.enemies);
      setWorldOnArray(this.level.endBoss);
      setWorldOnArray(this.level.backgroundObjectRocks);
      setWorldOnArray(this.level.coins);
      setWorldOnArray(this.level.bottles);
      setWorldOnArray(this.level.throwableObject);
    }
  }

  /**
   * Starts the main game loop.
   */
  run() {
    this.gameInterval = setTrackedInterval(
      () => {
        this.collisionManager.checkAllCollisions();
        this.checkThrowableObject();
      },
      1000 / Config.FRAME_RATE,
      'World Core Loop'
    );
  }

  /**
   * Checks if the player is firing a projectile.
   */
  checkThrowableObject() {
    if (this.keyboard.X && !this.firePressed && this.magicBar.shots > 0) {
      this.character.shooting();
      let fire = new ThrowableObject(this.character.x + Config.WORLD.FIRE_OFFSET_X, this.character.y, this);
      this.throwableObject.push(fire);
      this.firePressed = true;
      this.magicBar.useMagic(Config.WORLD.MAGIC_USE_PER_FIRE); // Verringert die Magie langsamer
    }
    if (!this.keyboard.X) {
      this.firePressed = false;
    }
  }

  /**
   * Draws all game objects on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addObjectsToMap(this.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.magicBar);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObject);

    if (this.level) {
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.level.endBoss);
      this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.level.bottles);
    }
  }

  /**
   * Adds an object to the canvas map.
   * @param {MovableObject} movableObject - The object to add to the map
   */
  addToMap(movableObject) {
    if (movableObject.visible === false || (movableObject.isVisible && movableObject.isVisible() === false)) {
      return;
    }
    this.ctx.save();
    if (movableObject instanceof BackgroundObject) {
      this.ctx.translate(this.camera_x * movableObject.parallax, 0);
    } else {
      this.ctx.translate(this.camera_x, 0);
    }
    this.updateMovableObjectOtherDirection(movableObject);
    this.ctx.restore();
  }

  /**
   * Draws the object mirrored if necessary.
   * @param {MovableObject} movableObject - The object to draw
   */
  updateMovableObjectOtherDirection(movableObject) {
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
  }

  /**
   * Adds an array of objects to the map.
   * @param {MovableObject[]} objects - Array of objects to add to the map
   */
  addObjectsToMap(objects) {
    objects.forEach((gameObject) => {
      this.addToMap(gameObject);
    });
  }

  /**
   * Stops the game loop and all intervals.
   */
  stopGame() {
    this.drawLoopRunning = false;
    stopAllIntervals();
  }

  /**
   * Checks if the game is over.
   * @returns {boolean} True if the game is over
   */
  isGameOver() {
    return this.character.energy <= 0;
  }

  /**
   * Checks if the player has won.
   * @returns {boolean} True if the player has won
   */
  isWin() {
    return this.level && this.level.endBoss && this.level.endBoss.every((boss) => boss.isDead && boss.isDead());
  }
}
