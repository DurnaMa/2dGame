class World {
  character = new Character();
  enemiesAnt = [new EnemiesAnt(), new EnemiesAnt(), new EnemiesAnt()];
  clouds = [new Cloud()];
  backgraundObjecktRocks = [
    new BackgraundObjeckt('assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/sky.png'),
    new BackgraundObjeckt('assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/clouds1.png'),
    new BackgraundObjeckt('assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/clouds2.png'),
    new BackgraundObjeckt('assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks.png'),
    new BackgraundObjeckt('assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks2.png'),
    new BackgraundObjeckt('assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks3.png'),
  ];

  canvas;
  ctx;
  keyboard;

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

    this.addObjectesToMap(this.backgraundObjecktRocks);
    this.addObjectesToMap(this.clouds);
    this.addToMap(this.character);
    this.addObjectesToMap(this.enemiesAnt);

    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(mo) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }

  addCloudToMap(cloud) {
    this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
  }

  addObjectesToMap(Objectes) {
    Objectes.forEach((o) => {
      this.addToMap(o);
    });
  }
}
