class World {
  character = new Character();
  EnemiesAnt = new EnemiesAnt();

  ctx;

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.draw();
  }

  draw() {
    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height)
    this.ctx.drawImage(this.EnemiesAnt.img, this.EnemiesAnt.x, this.EnemiesAnt.y, this.EnemiesAnt.width, this.EnemiesAnt.height)
  }
}
