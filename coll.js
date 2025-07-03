handleCharacterAnimation

// character
animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.lastMoveTime = new Date().getTime();
      }
      //console.log(this.world.level.level_end_x)
      if (this.world.keyboard.LEFT && this.x > 150) {
        this.moveLeft();
        this.lastMoveTime = new Date().getTime();
      }
      //console.log("Aktuelle Position:", this.x.toFixed(0), "px");

      if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.jumpStarted) {
        this.jump();
        this.lastMoveTime = new Date().getTime();
        this.jumpStarted = new Date().getTime();
      }
      //console.log('Aktuelle Position:', this.y.toFixed(0), 'px');

      this.world.camera_x = -this.x + 150;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDeath()) {
        this.playAnimation(this.IMAGES_DEATH);
      } else if (this.isAboveGround()) {
        this.handleJumpAnimation();
      } else if (this.isIdle()) {
        this.playAnimation(this.IMAGES_IDLE);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }else{
        this.playAnimation(this.IMAGES_STANDING);
      }
    }, 100);
  }

  handleJumpAnimation(){
    if (!this.checkAlreadyRunning) {
      this.checkAlreadyRunning = true;
      console.log('jump animation start')
            this.currentImage = 0;
            let spacePressed = setInterval(() => {
                this.playAnimation(this.IMAGES_JUMPING);
            }, 288)

            setTimeout(() => {
                this.checkAlreadyRunning = false;
                clearInterval(spacePressed)
            }, 2016)
        }
  }

// movable-objects
applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      if (this instanceof Rogue && !this.isAboveGround() && this.jumpStarted){
        this.jumpEnded = new Date().getTime();
        console.log('Zeit in der Luft:', this.jumpEnded - this.jumpStarted);
        this.jumpStarted = null;
      }
    }, 1000 / 25);

  }

  isAboveGround() {
    return this.y < 366;
  }
