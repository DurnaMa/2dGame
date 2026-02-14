class Endboss extends MovableObject {
  y = Config.ENEMY.ENDBOSS.Y;
  start_x = Config.ENEMY.ENDBOSS.START_X;
  height = Config.ENEMY.ENDBOSS.HEIGHT;
  width = Config.ENEMY.ENDBOSS.WIDTH;
  min_x_random = Config.ENEMY.ENDBOSS.MIN_X_RANDOM;
  max_x_random_range = Config.ENEMY.ENDBOSS.MAX_X_RANDOM_RANGE;
  min_speed = Config.ENEMY.ENDBOSS.MIN_SPEED;
  animation_speed = Config.ENEMY.ENDBOSS.ANIMATION_SPEED;
  patrol_range = Config.ENEMY.ENDBOSS.PATROL_RANGE;
  activation_distance = Config.ENEMY.ENDBOSS.ACTIVATION_DISTANCE;
  speed = Config.ENEMY.ENDBOSS.SPEED;

  otherDirection = true;
  isActive = false;
  movingRight = false;

  IMAGES_WALKING = [
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk1.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk2.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk3.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk4.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk5.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Walk6.png',
  ];

  IMAGES_HURT = [
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Hurt1.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Hurt2.png',
  ];

  IMAGES_DEATH = [
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Death0.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Death1.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Death2.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Death3.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Death4.png',
  ];

  IMAGES_ANGER = [
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Anger1.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Anger2.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Anger3.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Anger4.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Anger5.png',
  ];

  IMAGES_ATTACK = [
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Attack1.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Attack2.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Attack3.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Attack4.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Attack5.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Attack6.png',
    'assets/bosses-pixel-art-game-assets-pack/PNG/Boss2/Attack7.png',
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEATH);
    this.loadImages(this.IMAGES_ANGER);
    this.loadImages(this.IMAGES_ATTACK);
    this.offset = {
      top: Config.ENEMY.ENDBOSS.OFFSET.TOP,
      left: Config.ENEMY.ENDBOSS.OFFSET.LEFT,
      right: Config.ENEMY.ENDBOSS.OFFSET.RIGHT,
      bottom: Config.ENEMY.ENDBOSS.OFFSET.BOTTOM,
    };
    this.x = this.start_x + Math.random() * this.max_x_random_range;
    this.animate();
    this.energy = 100;
    this.lastHit = 0;
    this.hitsTaken = 0;
    this.hitsRequired = Config.ENEMY.ENDBOSS.HITS_REQUIRED;
    this.isAttacking = false;
    this.attackCooldown = false;
    this.isAngry = false;
  }

  getDistanceToCharacter() {
    if (!this.world || !this.world.character) return Infinity;
    return Math.abs(this.x - this.world.character.x);
  }

  // NEU: Gibt die Richtung zum Character zurück (für Dead-Zone)
  getDirectionToCharacter() {
    if (!this.world || !this.world.character) return 0;
    return this.world.character.x - this.x; // Positiv = rechts, Negativ = links
  }

  isCharacterNear() {
    return this.getDistanceToCharacter() < Config.ENEMY.ENDBOSS.CHASE_DISTANCE;
  }

  isInAttackRange() {
    return this.getDistanceToCharacter() < Config.ENEMY.ENDBOSS.ATTACK_RANGE;
  }

  // VERBESSERT: Mit Dead-Zone gegen Jitter
  chaseCharacter() {
    if (!this.world || !this.world.character) return;

    const direction = this.getDirectionToCharacter();
    const DEAD_ZONE = Config.ENEMY.ENDBOSS.DEAD_ZONE; // Aus Config

    if (direction > DEAD_ZONE) {
      // Character ist rechts UND weit genug weg
      this.moveRight();
      this.otherDirection = false;
    } else if (direction < -DEAD_ZONE) {
      // Character ist links UND weit genug weg
      this.moveLeft();
      this.otherDirection = true;
    }
    // Wenn direction zwischen -DEAD_ZONE und +DEAD_ZONE: NICHT bewegen (kein Jitter!)
  }

  startAttack() {
    if (this.attackCooldown || this.isAttacking || this.isAngry) return;
    this.isAttacking = true;
    this.currentImage = 0;

    const direction = this.getDirectionToCharacter();
    this.otherDirection = direction < 0;
  }

  endAttack() {
    this.isAttacking = false;
    this.attackCooldown = true;
    setTimeout(() => {
      this.attackCooldown = false;
    }, Config.ENEMY.ENDBOSS.ATTACK_COOLDOWN);
  }

  animate() {
    this.animationInterval = setInterval(() => {
      if (this.energy <= 0) {
        this.playAnimation(this.IMAGES_DEATH);
      } else if (this.isAngry) {
        this.playAnimation(this.IMAGES_ANGER);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAttacking) {
        this.playAnimation(this.IMAGES_ATTACK);
        if (this.currentImage >= this.IMAGES_ATTACK.length) {
          this.endAttack();
        }
      } else if (this.isInAttackRange() && !this.attackCooldown && this.isActive) {
        this.startAttack();
        this.playAnimation(this.IMAGES_ATTACK);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, this.animation_speed);

    this.movementInterval = setInterval(() => {
      if (!gameStarted) return;

      this.checkActivation();

      // WICHTIG: Nicht bewegen wenn...
      if (this.energy <= 0) return;      // Tot
      if (this.isAngry) return;          // Wütend
      if (this.isAttacking) return;      // NEU: Nicht während Angriff!

      if (this.isInAttackRange() && !this.attackCooldown) {
        // Sehr nah -> Nicht bewegen (Angriff wird in Animation gestartet)
        return;
      } else if (this.isCharacterNear() && this.isActive) {
        // In Sichtweite -> Verfolgen (mit Dead-Zone)
        this.chaseCharacter();
      } else {
        // Weit weg -> Patrouillieren
        this.patrol();
      }
    }, 1000 / Config.FRAME_RATE); // NEU: Nutze FRAME_RATE für smoothere Bewegung
  }

  patrol() {
    if (this.energy <= 0) return;

    const patrolStart = Config.SECTION_START_ENDBOSS * (Config.LEVEL_END / Config.SECTION_COUNT);
    const patrolEnd = Config.SECTION_END_ENDBOSS * (Config.LEVEL_END / Config.SECTION_COUNT);

    if (this.movingRight) {
      this.moveRight();
      this.otherDirection = false;

      if (this.x >= patrolEnd) {
        this.movingRight = false;
      }
    } else {
      this.moveLeft();
      this.otherDirection = true;

      if (this.x <= patrolStart) {
        this.movingRight = true;
      }
    }
  }

  checkActivation() {
    if (!this.world || !this.world.character || this.energy <= 0) return;

    let distance = Math.abs(this.x - this.world.character.x);
    if (distance < this.activation_distance) {
      this.isActive = true;
    }
  }

  isDead() {
    return this.energy <= 0;
  }

  hit(damage = Config.ENEMY.ENDBOSS.DAMAGE_PER_HIT) {
    if (this.isDead()) return;
    this.lastHit = new Date().getTime();
    this.hitsTaken++;
    console.log('Boss Hit! Hits:', this.hitsTaken, 'Energy before:', this.energy);

    // Trigger anger animation
    this.isAngry = true;
    this.isAttacking = false;
    this.currentImage = 0;
    setTimeout(() => {
      this.isAngry = false;
    }, Config.ENEMY.ENDBOSS.ANGER_DURATION);

    if (this.hitsTaken >= this.hitsRequired) {
      this.energy = 0;
    } else {
      this.energy -= damage;
      if (this.energy < 0) this.energy = Config.ENEMY.ENDBOSS.MIN_ENERGY;
    }
  }
}
