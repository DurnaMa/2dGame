class World {
  character = new Rogue();
  //character = new Mage();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  coins;
  bottles;
  collisionManager;
  statusBar = new Statusbar();

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.collisionManager = new CollisionManager(this);
    this.setWorld();
    this.character.animate();
    this.draw();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.collisionManager.checkAllCollisions();
    }, 1000 / 60);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjectRocks);
    this.addToMap(this.statusBar);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemiesAnt);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);

    this.ctx.translate(-this.camera_x, 0);

    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(mo) {
    this.ctx.save();
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
}
