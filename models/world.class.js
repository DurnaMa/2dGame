class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  coins;
  bottles;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemiesAnt.forEach((enemy) => {
        if (this.character.isColliding(enemy) ) {
          this.character.energy -= 5;
          console.log('Collision with Chracter, enery ', this.character.energy)
        };
      });
    }, 200);
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

  addToMap(mo) {
    if (mo.otherDirection) {
      this.filpImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawBorder(this.ctx);
    mo.drawCollisionBorder(this.ctx)

    if (mo.otherDirection) {
      this.filpImageBack(mo);
    }
  }

  filpImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  filpImageBack(mo) {
    mo.x = mo.x * -1;
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
