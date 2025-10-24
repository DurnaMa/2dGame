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
  }

  run() {
    setInterval(() => {
      this.collisionManager.checkAllCollisions();
      this.checkThrowableObject()
    }, 1000 / 60);
  }

  checkThrowableObject() {
    if (this.keyboard.X && !this.firePressed) {
      let fire = new ThrowableObject(this.character.x + 100, this.character.y)
      this.throwableObject.push(fire);
      this.firePressed = true;
      this.magicBar.useMagic();
    }

    if (!this.keyboard.X) {
      this.firePressed = false;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToMap(this.level.backgroundObjectRocks);

    // Statusbar nur zeichnen, wenn der Spieler noch lebt
    if (!this.character.isDeath()) {
      this.ctx.translate(-this.camera_x, 0); // back
      this.addToMap(this.statusBar);
      this.addToMap(this.magicBar);
      this.ctx.translate(this.camera_x, 0); // Forwards
    }

    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.level.enemiesAnt);

    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);

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

  // binKeyEvents() {
  //   window.addEventListener('keydown', (e) => {
  //     if (e.keyCode === 'X') {
  //       this.magicBar.useMagic();
  //     }
  //   })
  // }
}
