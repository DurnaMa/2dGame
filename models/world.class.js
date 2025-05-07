class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  coins;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectesToMap(this.level.backgroundObjecktRocks);
    this.addObjectesToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectesToMap(this.level.enemiesAnt);
    this.addObjectesToMap(this.level.coins)

    this.ctx.translate(-this.camera_x, 0);

    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

    if (mo.otherDirection) {
      this.ctx.restore();
      mo.x = mo.x * -1;
    }
  }

  addObjectesToMap(Objectes) {
    Objectes.forEach((o) => {
      this.addToMap(o);
    });
  }

  addCloudToMap(cloud) {
    this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
    //this.ctx.drawImage(coins.img, coins.x, coins.y, coins.width, coins.height);
  }
}
