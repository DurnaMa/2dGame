class World {
  character = new Rogue();

  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  coins;
  bottles;
  collisionManager;
  statusBar = new Statusbar();
  magicBar = new Magicbar();
  throwableObject = [];
  gameInterval;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.collisionManager = new CollisionManager(this);
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
      setWorldOnArray(this.level.enemiesAnt);
      setWorldOnArray(this.level.clouds);
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
    }, 1000 / 60);
  }

  checkThrowableObject() {
    if (this.keyboard.X && !this.firePressed && this.magicBar.percentage > 0) {
      let fire = new ThrowableObject(this.character.x + 100, this.character.y);
      this.throwableObject.push(fire);
      this.firePressed = true;
      this.magicBar.useMagic(1); // Verringert die Magie langsamer
    }

    if (!this.keyboard.X) {
      this.firePressed = false;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToMap(this.level.backgroundObjectRocks);

    // Statusbar zeichnen
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.magicBar);
    this.ctx.translate(this.camera_x, 0);

    // Spielobjekte zeichnen
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.level.enemiesAnt);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);

    // Game Over Screen als letztes zeichnen, damit es über allem anderen liegt
    if (this.character.isDeath()) {
      this.ctx.save();
      if (window.gameOverScreen) {
        // Position relativ zum sichtbaren Bildschirmbereich berechnen
        window.gameOverScreen.show();
        window.gameOverScreen.x = this.camera_x + (this.canvas.width - window.gameOverScreen.width) / 2;
        window.gameOverScreen.y = (this.canvas.height - window.gameOverScreen.height) / 2;
        window.gameOverScreen.draw(this.ctx);
      }
      this.ctx.restore();
    }

  // (Duplicated drawing calls removed) — Game objects were already drawn above.

    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(mo) {
    // Nicht zeichnen wenn Objekt nicht sichtbar ist
    if (mo.visible === false || (mo.isVisible && mo.isVisible() === false)) {
      return;
    }

    this.ctx.save();

    // Parallax-Effekt für BackgroundObjects
    if (mo instanceof BackgroundObject) {
      this.ctx.translate(this.camera_x * mo.parallax, 0);
    } else {
      // Normale Kamera-Bewegung für andere Objekte
      this.ctx.translate(this.camera_x, 0);
    }

    if (mo.otherDirection) {
      this.ctx.translate(mo.x + mo.width, mo.y);
      this.ctx.scale(-1, 1);
      mo.draw(this.ctx);
      mo.drawBorder(this.ctx);
      mo.drawCollisionBorder(this.ctx);
    } else {
      mo.draw(this.ctx);
      mo.drawBorder(this.ctx);
      mo.drawCollisionBorder(this.ctx);
    }
    this.ctx.restore();
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addCloudToMap(cloud) {
    this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
  }

  stopGame() {
    clearInterval(this.gameInterval);
    if (this.character) {
        this.character.stopAllIntervals();
    }
}

  // binKeyEvents() {
  //   window.addEventListener('keydown', (e) => {
  //     if (e.keyCode === 'X') {
  //       this.magicBar.useMagic();
  //     }
  //   })
  // }
}
