class World {
  character = new Character();
  enemiesAnt = [new EnemiesAnt(), new EnemiesAnt(), new EnemiesAnt()];
  clouds = [new Cloud(), new Cloud(), new Cloud()];
  backgraundObjeckt = [new BackgraundObjeckt('/assets/Environments/Day-Platformer/PNG/trees.png')];
  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addToMap(this.character);
    this.addObjectesToMap(this.clouds);
    this.addObjectesToMap(this.enemiesAnt);
    this.addObjectesToMap(this.backgraundObjeckt);

    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(mo) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }

  addCloudToMap(cloud) {
    this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height)
  }

  addObjectesToMap(Objectes) {
    Objectes.forEach(o => {
      this.addToMap(o);
    });
  }
}
