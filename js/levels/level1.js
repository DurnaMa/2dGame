const CANVAS_WIDTH = 960;
const yOffset = 100;
let coins = [];
let bottles = [];


// for (let index = 2; index < 4; index++) {
//   const maxWidth = CANVAS_WIDTH * index;
//   const minWidth = CANVAS_WIDTH * (index - 1);
//   for (let index = 1; index < 3; index++) {
//     let coin = new Coins(Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth);
//     coins.push(coin);
//   }
// }

// for (let index = 2; index < 4; index++) {
//   const maxWidth = CANVAS_WIDTH * index;
//   const minWidth = CANVAS_WIDTH * (index - 1);
//   for (let index = 0; index < 3; index++){
//     let bottle = new Bottle(Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth);
//     bottel.push(bottle);
//   }
// }

for (let index = 2; index < 4; index++) {
  for (let index = 0; index < 3; index++) {
    let positionX = getXPosition(index);
    let coin = new Coins(positionX);
    coins.push(coin);
  }
}

for (let index = 2; index < 4; index++) {

  for (let index = 0; index < 3; index++){
    let positionX = getXPosition(index);
    let bottel = new Bottle(positionX);
    bottles.push(bottel);
  }
}

function getXPosition(index) {
  const maxWidth = CANVAS_WIDTH * index;
  const minWidth = CANVAS_WIDTH * (index - 1);
  let x = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
  let coinsAndBottles = [...coins, ...bottles];

  let elementOnPosition = coinsAndBottles.find(c => Math.abs( c.x - x ) < 50 );

  if( elementOnPosition ) {
    return getXPosition(index); // Neue Position ermitteln
  } else {
    return x; // Position passt: Position zurückgeben.
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

const level1 = new Level([new EnemiesAnt(), new Endboss()], [new Cloud()], backgroundObjects, coins, bottles);
