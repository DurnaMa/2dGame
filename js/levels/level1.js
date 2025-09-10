const CANVAS_WIDTH = 960;
const yOffset = 100;
let coins = [];
let bottel = [];


for (let index = 1; index < 7; index++) {
  const maxWidth = CANVAS_WIDTH * index;
  const minWidth = CANVAS_WIDTH * (index - 1);
  for (let index = 0; index < 5; index++) {
    let coin = new Coins(Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth);
    coins.push(coin);
  }
}

for (let index = 0; index < 6; index++) {
  const maxWidth = CANVAS_WIDTH * index;
  const minWidth = CANVAS_WIDTH * (index - 1);
  for (let index = 0; index < 5; index++){
    let bottle = new Bottle(Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth);
    bottel.push(bottle);
  }
}

function createBackgroundLayer(imagePath, count, width, yOffset = 0, parallax = 1) {
  const layer = [];
  for (let i = 0; i < count; i++) {
    layer.push(new BackgroundObject(imagePath, i * (width - 1), yOffset * parallax, parallax));
  }
  return layer;
}

const backgroundObjects = [
  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/sky.png',
    5,
    CANVAS_WIDTH,
    0,
    0
  ),
  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/clouds1.png',
    5,
    CANVAS_WIDTH,
    50,
    0.4
  ),
  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/clouds2.png',
    5,
    CANVAS_WIDTH,
    75,
    0.6
  ),
  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks.png',
    5,
    CANVAS_WIDTH,
    100,
    0.8
  ),
  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks2.png',
    5,
    CANVAS_WIDTH,
    125,
    1
  ),
  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks3.png',
    5,
    CANVAS_WIDTH,
    150,
    1.2
  ),
];

const level1 = new Level([new EnemiesAnt(), new Endboss()], [new Cloud()], backgroundObjects, coins, bottel);
