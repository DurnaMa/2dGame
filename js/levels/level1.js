//const CANVAS_WIDTH = Config.CANVAS_WIDTH;
const CANVAS_WIDTH = Config.CANVAS_WIDTH;

let level1;
let coins = [];
let bottles = [];
let enemies = [];
let endBoss = [];

const SECTIONCOUNT = Config.SECTION_COUNT;
const SECTIONSTART = Config.SECTION_START;
const SECTIONEND = Config.SECTION_END;

const PARALLAX_SKY = Config.PARALLAX.SKY;
const PARALLAX_FAR_CLOUDS = Config.PARALLAX.FAR_CLOUDS;
const PARALLAX_MID_CLOUDS = Config.PARALLAX.MID_CLOUDS;
const PARALLAX_DISTANT_ROCKS = Config.PARALLAX.DISTANT_ROCKS;
const PARALLAX_MID_GROUND = Config.PARALLAX.MID_GROUND;
const PARALLAX_FOREGROUND = Config.PARALLAX.FOREGROUND;
const PARALLAX_MID_CLOUDS4 = Config.PARALLAX.MID_CLOUDS4;

const Y_OFFSET_SKY = Config.Y_OFFSET.SKY;
const Y_OFFSET_CLOUDS_HIGH = Config.Y_OFFSET.CLOUDS_HIGH;
const Y_OFFSET_CLOUDS_MID = Config.Y_OFFSET.CLOUDS_MID;
const Y_OFFSET_ROCKS_HIGH = Config.Y_OFFSET.ROCKS_HIGH;
const Y_OFFSET_ROCKS_MID = Config.Y_OFFSET.ROCKS_MID;
const Y_OFFSET_ROCKS_LOW = Config.Y_OFFSET.ROCKS_LOW;
const Y_OFFSET_CLOUDS4_MID = Config.Y_OFFSET.CLOUDS4_MID;

function spawnEnemies() {
  // Erstelle 1-2 Gegner pro Sektion
  for (let section = SECTIONSTART; section <= SECTIONEND; section++) {
    // Anzahl der Gegner pro Sektion (1 oder 2 zufällig)
    const enemyCount = Math.random() > 0.5 ? 1 : 2;

    for (let i = 0; i < enemyCount; i++) {
      let enemyBigKnight = new BigKnight();
      let enemyDragon = new Dragon();
      enemyBigKnight.x = CANVAS_WIDTH * (section - 1) + Math.random() * (CANVAS_WIDTH - 400);
      enemyDragon.x = CANVAS_WIDTH * (section - 1) + Math.random() * (CANVAS_WIDTH - 350);
      enemies.push(enemyBigKnight, enemyDragon);
    }
  }

  endBoss.push(new Endboss());
}

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
  let elementOnPosition = coinsAndBottles.find(
    (item) => item.x < x + Config.ITEM_MIN_DISTANCE && item.x > x - Config.ITEM_MIN_DISTANCE
  );

  if (elementOnPosition) {
    return getXPosition(index);
  } else {
    return x;
  }
}

function createBackgroundLayer(imagePath, SECTIONCOUNT, width, yOffset = 1, parallax = 1) {
  const layer = [];
  for (let i = 0; i < SECTIONCOUNT; i++) {
    layer.push(new BackgroundObject(imagePath, i * (width - 1), yOffset * parallax, parallax));
  }
  return layer;
}

function initLevel1() {
  // Clear arrays for fresh start
  enemies = [];
  endBoss = [];
  coins = [];
  bottles = [];

  // Re-spawn everything
  spawnItem();
  spawnEnemies();

  level1 = new Level(enemies, endBoss, backgroundObjects, coins, bottles);
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
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/clouds4.png',
    SECTIONCOUNT,
    CANVAS_WIDTH,
    Y_OFFSET_CLOUDS4_MID,
    PARALLAX_MID_CLOUDS4
  ),

  ...createBackgroundLayer(
    '/assets/mountain-platformer-pixel-art-tileset/PNG/Background/bright/rocks3.png',
    SECTIONCOUNT,
    CANVAS_WIDTH,
    Y_OFFSET_ROCKS_LOW,
    PARALLAX_FOREGROUND
  ),
];
