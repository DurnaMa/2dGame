const GAME_CONFIG = {

  HALF: 2,
  // ===== CANVAS =====
  CANVAS_WIDTH: 960,
  CANVAS_HEIGHT: 540,

  // ===== KAMERA =====
  CAMERA_OFFSET: 150,

  // ===== PHYSIK =====
  GROUND_LEVEL: 366,
  GRAVITY: 1,
  ACCELERATION: 1,
  JUMP_POWER: 25,

  // ===== CHARACTER =====
  CHARACTER: {
    START_X: 150,
    START_Y: 366,
    SPEED: 5,
    WIDTH: 200,
    HEIGHT: 200,
    ENERGY: 100,
    OFFSET: {
      TOP: 90,
      LEFT: 35,
      RIGHT: 90,
      BOTTOM: 25,
    },
  },

  // ===== TIMING =====
  FRAME_RATE: 60,
  ANIMATION_SPEED: 100,
  JUMP_ANIMATION_SPEED: 288,
  JUMP_ANIMATION_DURATION: 1900,

  // ===== KOLLISION =====
  COLLISION: {
    INVULNERABILITY_SHORT: 500,
    INVULNERABILITY_LONG: 1500,
    DAMAGE_NORMAL: Math.floor(100 / 6),
    DAMAGE_BOSS: 5,
    JUMP_KILL_HEIGHT_MAX: 120,
    JUMP_BOUNCE_POWER: 15,
  },

  // ===== ITEMS =====
  COIN: {
    WIDTH: 50,
    HEIGHT: 50,
    Y_BASE: 340,
    Y_RANGE: 150,
    ANIMATION_SPEED: 150,
  },

  BOTTLE: {
    WIDTH: 50,
    HEIGHT: 50,
    Y_BASE: 320,
    Y_RANGE: 150,
    ANIMATION_SPEED: 200,
    MAGIC_AMOUNT: 16.67,
  },

  // ===== LEVEL =====
  LEVEL_END: 7520,
  SECTION_COUNT: 8,
  SECTION_START: 2,
  SECTION_END: 7,
  ITEM_MIN_DISTANCE: 50,

  // ===== PARALLAX =====
  PARALLAX: {
    SKY: 0,
    FAR_CLOUDS: 0.2,
    MID_CLOUDS: 0.25,
    MID_CLOUDS4: 0.8,
    DISTANT_ROCKS: 0.4,
    MID_GROUND: 0.6,
    FOREGROUND: 0.8,
  },

  // ===== Y-OFFSETS (für Background-Layer) =====
  Y_OFFSET: {
    SKY: 50,
    CLOUDS_HIGH: 25,
    CLOUDS_MID: 20,
    CLOUDS4_MID: 0.5,
    ROCKS_HIGH: 15,
    ROCKS_MID: 10,
    ROCKS_LOW: 5,
  },

  // ===== ENEMIES =====
  ENEMY: {
    BIGKNIGHT: {
      Y: 340,
      START_X: 40,
      WIDTH: 300,
      HEIGHT: 300,
      MIN_X_RANDOM: 250,
      MAX_X_RANDOM_RANGE: 500,
      MIN_SPEED: 1.5,
      MAX_SPEED_RANGE: 2.0,
      ANIMATION_SPEED: 200,
      OFFSET: {
        TOP: 95,
        LEFT: 115,
        RIGHT: 105,
        BOTTOM: 100,
      },
    },
    DRAGON: {
      Y: 352,
      START_X: 40,
      WIDTH: 300,
      HEIGHT: 300,
      MIN_X_RANDOM: 250,
      MAX_X_RANDOM_RANGE: 500,
      MIN_SPEED: 1.5,
      MAX_SPEED_RANGE: 2.0,
      ANIMATION_SPEED: 200,
      OFFSET: {
        TOP: 112,
        LEFT: 40,
        RIGHT: 88,
        BOTTOM: 113,
      },
    },
    BOSS: {
      Y: 220,
      START_X: 7500,
      WIDTH: 400,
      HEIGHT: 400,
      SPEED: 1,
      ANIMATION_SPEED: 200,
      PATROL_RANGE: 2000,
      ACTIVATION_DISTANCE: 600,
      OFFSET: {
        TOP: 125,
        LEFT: 165,
        RIGHT: 75,
        BOTTOM: 75,
      },
    },
  },

  // ===== MOVABLE OBJECT DEFAULTS =====
  MOVABLE: {
    SPEED: 0.15,
    SPEED_Y: 0,
    ENERGY: 100,
    GRAVITY_UPDATE_RATE: 25, // FPS für Gravitation
    HURT_DURATION: 1, // Sekunden
  },

  // ===== THROWABLE OBJECT =====
  THROWABLE: {
    SPEED_X: 40,
    UPDATE_RATE: 25, // FPS
  },

  // ===== UI =====
  UI: {
    STATUSBAR: {
      X: 10,
      Y: 10,
      WIDTH: 200,
      HEIGHT: 30,
      PERCENTAGE_START: 100,
    },
    MAGICBAR: {
      X: 10,
      Y: 40,
      WIDTH: 200,
      HEIGHT: 30,
      PERCENTAGE_START: 0,
      MAGIC_USE_AMOUNT: 1,
      MAGIC_ADD_AMOUNT: 8.34,
    },
    GAMEOVER: {
      WIDTH: 400,
      HEIGHT: 300,
      SCREEN_WIDTH: 720,
      SCREEN_HEIGHT: 480,
      TEXT_X: 360,
      TEXT_Y: 200,
      BUTTON_WIDTH: 200,
      BUTTON_HEIGHT: 50,
      BUTTON_Y_OFFSET: 180,
      FONT_SIZE_LARGE: 48,
      FONT_SIZE_SMALL: 24,
    },
  },

  // ===== DRAWABLE DEFAULTS =====
  DRAWABLE: {
    X: 120,
    Y: 520,
    WIDTH: 100,
    HEIGHT: 150,
    BORDER_WIDTH: 1,
  },

  // ===== WORLD =====
  WORLD: {
    FIRE_OFFSET_X: 100,
    MAGIC_USE_PER_FIRE: 1,
  },

  // ===== KEYCODES =====
  KEYS: {
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    ARROW_LEFT: 37,
    SPACE: 32,
    X: 88,
  },
};
