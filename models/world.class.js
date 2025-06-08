class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  coins;
  bottles;
  collisionManager;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.collisionManager = new CollisionManager(this);
    this.setWorld();
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

    this.addObjectesToMap(this.level.backgroundObjecktRocks);
    this.addObjectesToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectesToMap(this.level.enemiesAnt);
    this.addObjectesToMap(this.level.coins);
    this.addObjectesToMap(this.level.bottles);

    this.ctx.translate(-this.camera_x, 0);

    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  // addToMap(mo) {
  //   if (mo.otherDirection) {
  //     this.filpImage(mo);
  //   }
  //   mo.draw(this.ctx);
  //   mo.drawBorder(this.ctx);
  //   mo.drawCollisionBorder(this.ctx)

  //   if (mo.otherDirection) {
  //     this.filpImageBack(mo);
  //   }
  // }

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

  addObjectesToMap(Objectes) {
    Objectes.forEach((o) => {
      this.addToMap(o);
    });
  }

  addCloudToMap(cloud) {
    this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
  }
}
