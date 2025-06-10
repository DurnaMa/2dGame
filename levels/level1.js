function createBackgroundLayer(imagePath, count, width) {
  const layer = [];
  for (let i = 0; i < count; i++) {
    layer.push(new BackgroundObjeckt(imagePath, i * (width - 1), 0));
  }
  return layer;
}

const CANVAS_WIDTH = 960;
const backgrounds = [
  ...createBackgroundLayer('/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/sky.png', 5, CANVAS_WIDTH),
  ...createBackgroundLayer('/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/clouds1.png', 5, CANVAS_WIDTH),
  ...createBackgroundLayer('/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/clouds2.png', 5, CANVAS_WIDTH),
  ...createBackgroundLayer('/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks.png', 5, CANVAS_WIDTH),
  ...createBackgroundLayer('/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks2.png', 5, CANVAS_WIDTH),
  ...createBackgroundLayer('/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks3.png', 5, CANVAS_WIDTH),
];

const level1 = new Level(
  [new EnemiesAnt(), new Endboss()],
  [new Cloud()],
  backgrounds,
  [new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins()],
  [new Bottle(), new Bottle(), new Bottle()]
);
