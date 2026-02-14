class Config {
  static HALF = 2;

  // ===== CANVAS =====
  static CANVAS_WIDTH = 960;
  static CANVAS_HEIGHT = 540;

  // ===== KAMERA =====
  static CAMERA_OFFSET = 150;

  // ===== PHYSIK =====
  static GROUND_LEVEL = 366;
  static GRAVITY = 1;
  static ACCELERATION = 1;
  static JUMP_POWER = 25;

  // ===== CHARACTER =====
  static CHARACTER = {
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
  };

  // ===== TIMING =====
  static FRAME_RATE = 60;
  static ANIMATION_SPEED = 100;
  static JUMP_ANIMATION_SPEED = 288;
  static JUMP_ANIMATION_DURATION = 1900;

  // ===== KOLLISION =====
  static COLLISION = {
    INVULNERABILITY_SHORT: 500,
    INVULNERABILITY_LONG: 1500,
    DAMAGE_NORMAL: Math.floor(100 / 6),
    DAMAGE_BOSS: 5,
    JUMP_KILL_HEIGHT_MAX: 120,
    JUMP_BOUNCE_POWER: 15,
  };

  // ===== ITEMS =====
  static COIN = {
    WIDTH: 50,
    HEIGHT: 50,
    Y_BASE: 340,
    Y_RANGE: 150,
    ANIMATION_SPEED: 150,
  };

  static BOTTLE = {
    WIDTH: 50,
    HEIGHT: 50,
    Y_BASE: 320,
    Y_RANGE: 150,
    ANIMATION_SPEED: 200,
    MAGIC_AMOUNT: 16.67,
  };

  // ===== LEVEL =====
  static LEVEL_END = 7520;
  static SECTION_COUNT = 8;
  static SECTION_START = 2;
  static SECTION_END = 7;
  static ITEM_MIN_DISTANCE = 50;
  static SECTION_START_ENDBOSS = 6;
  static SECTION_END_ENDBOSS = 7;

  // ===== PARALLAX =====
  static PARALLAX = {
    SKY: 0,
    FAR_CLOUDS: 0.2,
    MID_CLOUDS: 0.25,
    MID_CLOUDS4: 0.8,
    DISTANT_ROCKS: 0.4,
    MID_GROUND: 0.6,
    FOREGROUND: 0.8,
  };

  // ===== Y-OFFSETS (für Background-Layer) =====
  static Y_OFFSET = {
    SKY: 50,
    CLOUDS_HIGH: 25,
    CLOUDS_MID: 20,
    CLOUDS4_MID: 0.5,
    ROCKS_HIGH: 15,
    ROCKS_MID: 10,
    ROCKS_LOW: 5,
  };

  // ===== ENEMIES =====
  static ENEMY = {
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
      DELAY: 2000,
      ATTACK_DISTANCE: 150,
      ATTACK_COOLDOWN: 2000,
      ATTACK_RANGE: 80,
      CHASE_DISTANCE: 300,
      DEAD_ZONE: 30
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
      DELAY: 2000,
      ATTACK_DISTANCE: 150,
      ATTACK_COOLDOWN: 2000,
      ATTACK_RANGE: 80,
      CHASE_DISTANCE: 300,
      DEAD_ZONE: 30
    },
    ENDBOSS: {
      Y: 220,
      START_X: 7500,
      WIDTH: 400,
      HEIGHT: 400,
      MIN_X_RANDOM: 250,
      MAX_X_RANDOM_RANGE: 500,
      MIN_SPEED: 1.5,
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
      ATTACK_DISTANCE: 200,
      ATTACK_COOLDOWN: 1500,
      ATTACK_RANGE: 100,
      ANGER_DURATION: 1000,
      CHASE_DISTANCE: 400,
      HITS_REQUIRED: 3,
      DAMAGE_PER_HIT: 20,
      MIN_ENERGY: 10,
      ANGER_ANIMATION_DELAY: 100,
      DEAD_ZONE: 30
    },
  };

  // ===== MOVABLE OBJECT DEFAULTS =====
  static MOVABLE = {
    SPEED: 0.15,
    SPEED_Y: 0,
    ENERGY: 100,
    GRAVITY_UPDATE_RATE: 25,
    HURT_DURATION: 1,
  };

  // ===== THROWABLE OBJECT =====
  static THROWABLE = {
    SPEED_X: 40,
    UPDATE_RATE: 25,
  };

  // ===== UI =====
  static UI = {
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
  };

  // ===== DRAWABLE DEFAULTS =====
  static DRAWABLE = {
    X: 120,
    Y: 520,
    WIDTH: 100,
    HEIGHT: 150,
    BORDER_WIDTH: 1,
  };

  // ===== WORLD =====
  static WORLD = {
    FIRE_OFFSET_X: 100,
    MAGIC_USE_PER_FIRE: 1,
  };

  // ===== KEYCODES =====
  static KEYS = {
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    ARROW_LEFT: 37,
    SPACE: 32,
    X: 88,
  };

  // ===== SOUNDS =====
  static SOUNDS = {
    VOLUME: 1,
    DELAY: 100,
    LOOP: false,
    ATMOSPHERE: {
      SRC: 'assets/sound/fantasy-space-atmosphere.mp3',
      VOLUME: 1,
      LOOP: true,
    },
  };
}
