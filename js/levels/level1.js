const CANVAS_WIDTH = 960;
const yOffset = 100;
let coins = [];
let bottles = [];
const SECTIONCOUNT = 8;
const SECTIONSTART = 2;
const SECTIONEND = 7;

const PARALLAX_SKY = 0;
const PARALLAX_FAR_CLOUDS = 0.2;
const PARALLAX_MID_CLOUDS = 0.25;
const PARALLAX_DISTANT_ROCKS = 0.4;
const PARALLAX_MID_GROUND = 0.6;
const PARALLAX_FOREGROUND = 0.8;

const Y_OFFSET_SKY = 0;
const Y_OFFSET_CLOUDS_HIGH = 25;
const Y_OFFSET_CLOUDS_MID = 20;
const Y_OFFSET_ROCKS_HIGH = 15;
const Y_OFFSET_ROCKS_MID = 10;
const Y_OFFSET_ROCKS_LOW = 5;

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

function createBackgroundLayer(imagePath, SECTIONCOUNT, width, yOffset = 1, parallax = 1) {
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
    Y_OFFSET_SKY,
    PARALLAX_SKY
  ),

  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/clouds1.png',
    SECTIONCOUNT,
    CANVAS_WIDTH,
    Y_OFFSET_CLOUDS_HIGH,
    PARALLAX_FAR_CLOUDS
  ),

  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/clouds2.png',
    SECTIONCOUNT,
    CANVAS_WIDTH,
    Y_OFFSET_CLOUDS_MID,
    PARALLAX_MID_CLOUDS
  ),

  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks.png',
    SECTIONCOUNT,
    CANVAS_WIDTH,
    Y_OFFSET_ROCKS_HIGH,
    PARALLAX_DISTANT_ROCKS
  ),

  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks2.png',
    SECTIONCOUNT,
    CANVAS_WIDTH,
    Y_OFFSET_ROCKS_MID,
    PARALLAX_MID_GROUND
  ),

  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks3.png',
    SECTIONCOUNT,
    CANVAS_WIDTH,
    Y_OFFSET_ROCKS_LOW,
    PARALLAX_FOREGROUND
  ),
];

const level1 = new Level([new EnemiesAnt(), new Endboss()], [new Cloud()], backgroundObjects, coins, bottles, );
