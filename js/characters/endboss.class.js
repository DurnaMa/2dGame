class Endboss extends MovableObject {
  height = 400;
  width = 400;
  y = 220;
  x = 0;

  otherDirection = true;

  IMAGES_WALKING = [
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk1.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk2.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk3.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk4.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk5.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk6.png',
  ];

  constructor() {

    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.offset = {
      top: 125,
      left: 165,
      right: 75,
      bottom: 75,
    };
    this.x = 3000;
    // Boss moves only when the player reaches the last third of the level
    this.isActive = false;
    this.movingRight = false;
    this.speed = 1; // boss speed while patrolling
    this.animate();
  }

  animate() {
    // Animation (sprite frames)
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);

    // Movement / patrol interval
    this.moveInterval = setInterval(() => {
      // Prefer a world reference if available, fall back to global window.world
      const world = this.world || (typeof window !== 'undefined' && window.world) ? (this.world || window.world) : null;
      if (!world || !world.level || !world.character) return;

      const levelEnd = world.level.level_end_x;
      const activationX = Math.floor(levelEnd * 2 / 3); // start of last third
      const charX = world.character.x;

      // Activate boss patrol when character reaches last third
      if (!this.isActive) {
        if (charX >= activationX) {
          this.isActive = true;
          // Define patrol bounds inside the final third, give some margins
          this.leftBound = Math.max(activationX + 50, this.x - 300);
          this.rightBound = Math.min(levelEnd - 200, this.x + 300);
          // Ensure bounds make sense
          if (this.leftBound >= this.rightBound) {
            this.leftBound = Math.max(activationX + 50, levelEnd - 600);
            this.rightBound = levelEnd - 200;
          }
          // Start moving left by default
          this.movingRight = false;
        } else {
          return; // not active yet
        }
      }

      // Patrol movement
      if (this.movingRight) {
        this.x += this.speed;
      } else {
        this.x -= this.speed;
      }

      // Flip direction at bounds
      if (this.x <= this.leftBound) {
        this.movingRight = true;
        this.otherDirection = false;
      } else if (this.x >= this.rightBound) {
        this.movingRight = false;
        this.otherDirection = true;
      }

      // Update offset based on facing direction (keeps collision box correct)
      if (!this.otherDirection) {
        this.offset = {
          top: 125,
          left: 75,
          right: 165,
          bottom: 75
        };
      } else {
        this.offset = {
          top: 125,
          left: 165,
          right: 75,
          bottom: 75
        };
      }
    }, 1000 / 60);
  }
}
