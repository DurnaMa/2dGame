const CANVAS_WIDTH = 960;
const yOffset = 100;

function createBackgroundLayer(imagePath, count, width, yOffset = 0, parallax = 1) {
  const layer = [];
  for (let i = 0; i < count; i++) {
    layer.push(new BackgroundObject(
      imagePath,
      i * (width - 1), yOffset * parallax, parallax));
  }
  return layer;
}

const backgroundObjects = [
  ...createBackgroundLayer('/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/sky.png', 5, CANVAS_WIDTH, 0, 0.2),
  ...createBackgroundLayer('/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/clouds1.png', 5, CANVAS_WIDTH, 50, 0.4),
  ...createBackgroundLayer('/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/clouds2.png', 5, CANVAS_WIDTH, 75, 0.6),
  ...createBackgroundLayer('/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks.png', 5, CANVAS_WIDTH, 100, 0.8),
  ...createBackgroundLayer('/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks2.png', 5, CANVAS_WIDTH, 125, 1),
  ...createBackgroundLayer('/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks3.png', 5, CANVAS_WIDTH, 150, 1.2),
];

const level1 = new Level(
  [new EnemiesAnt(), new Endboss()],
  [new Cloud()],
   backgroundObjects,
  [new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins()],
  [new Bottle(), new Bottle(), new Bottle()],
);
