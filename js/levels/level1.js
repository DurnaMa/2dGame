const CANVAS_WIDTH = 960;
const yOffset = 100;
let coins = [];
let bottles = [];
const SECTIONCOUNT = 8;
const SECTIONSTART = 2;
const SECTIONEND = 7;

spawnItem();

function spawnItem() {
  for (let section = SECTIONSTART; section <= SECTIONEND; section++) {
    for (let index = 0; index < 2; index++) {
      let positionX = getXPosition(section);
      let coin = new Coin(positionX);

      coins.push(coin);
      positionX = getXPosition(section);
      let bottle = new Bottle(positionX);
      bottles.push(bottle);
    }
  }
}

function getXPosition(index) {
  const maxWidth = CANVAS_WIDTH * index;
  const minWidth = CANVAS_WIDTH * (index - 1);
  let x = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
  let coinsAndBottles = [...coins, ...bottles];
  let elementOnPosition = coinsAndBottles.find( c => c.x < x + 50 && c.x > x - 50);

  if( elementOnPosition ) {
    return getXPosition(); // Neue Position ermitteln
  } else {
    return x; // Position passt: Position zurückgeben.
  }
}

function createBackgroundLayer(imagePath, SECTIONCOUNT, width, yOffset = 0, parallax = 1) {
  const layer = [];
  for (let i = 0; i < SECTIONCOUNT; i++) {
    layer.push(new BackgroundObject(imagePath, i * (width - 1), yOffset * parallax, parallax));
  }
  return layer;
}

const backgroundObjects = [
  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/sky.png',
    SECTIONCOUNT,
    CANVAS_WIDTH,
    0,
    0
  ),

  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/clouds1.png',
    SECTIONCOUNT,
    CANVAS_WIDTH,
    50,
    0.4
  ),

  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/clouds2.png',
    SECTIONCOUNT,
    CANVAS_WIDTH,
    75,
    0.6
  ),

  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks.png',
    SECTIONCOUNT,
    CANVAS_WIDTH,
    100,
    0.8
  ),

  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks2.png',
    SECTIONCOUNT,
    CANVAS_WIDTH,
    125,
    1
  ),

  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks3.png',
    SECTIONCOUNT,
    CANVAS_WIDTH,
    150,
    1.2
  ),
];

const level1 = new Level([new EnemiesAnt(), new Endboss()], [new Cloud()], backgroundObjects, coins, bottles, );
