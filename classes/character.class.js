class Character extends MoveableObject {
  x = 10;
  y = 0;
  height = 350;
  currentImage = 0;
  world;

  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_IDLE = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_JUMPING = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_IS_HURT = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];

  collisionBox = {
    right: 35,
    left: 20,
    top: 70,
    bottom: 70,
  };

  /**
   * Constructs a new character instance
   * Loads images for different states, sets world reference,
   * starts animations, applies gravity, and calculates distance to end boss
   * @param {World} world - The game world reference
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_IDLE[0]);
    this.loadNextImages(this.IMAGES_WALKING);
    this.loadNextImages(this.IMAGES_JUMPING);
    this.loadNextImages(this.IMAGES_IS_HURT);
    this.loadNextImages(this.IMAGES_DEAD);
    this.loadNextImages(this.IMAGES_IDLE);

    this.world = world;
    this.animate();
    this.playAnimations();
    this.applyGravity();
    this.distanceToEndboss();
  }

  /**
   * Animates the character's movements based on user input
   */
  animate() {
    setInterval(() => {
      if (
        (this.world.keyboard.RIGHT || this.world.keyboard.D) &&
        this.x < this.world.level.level_end_x
      ) {
        this.moveRightCharacter();
      }

      if ((this.world.keyboard.LEFT || this.world.keyboard.A) && this.x > 0) {
        this.moveLeftCharacter();
      }

      if (
        (this.world.keyboard.UP ||
          this.world.keyboard.SPACE ||
          this.world.keyboard.W) &&
        !this.isAboveGround()
      ) {
        this.jump();
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * Plays the appropriate animation based on the character's state
   */
  playAnimations() {
    let intervall = setInterval(() => {
      if (this.isDead()) {
        this.handleDeadAnimation();
      } else if (this.isHurt()) {
        this.handleHurtAnimation();
      } else if (this.isAboveGround()) {
        this.handleJumpAnimation();
      } else if (this.isOnGround() && this.walkingDirections()) {
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.isOnGround() && !this.isAboveGround() && !this.isDead()) {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 200);
    intervallIds.push(intervall);
  }

  /**
   * Checks if any of the directional keys (right, left, D, or A) is pressed
   * @returns {boolean} - True if at least one of the directional keys is pressed, otherwise false
   */
  walkingDirections() {
    return (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.D ||
      this.world.keyboard.A
    );
  }

  /**
   * Handles jumping animation
   */
  handleJumpAnimation() {
    if (
      this.world.keyboard.UP ||
      this.world.keyboard.SPACE ||
      this.world.keyboard.W
    ) {
      this.playAnimation(this.IMAGES_JUMPING);
    }
  }

  /**
   * Handles hurt animation
   */
  handleHurtAnimation() {
    this.playAnimation(this.IMAGES_IS_HURT);
    sounds.CHARACTER_HURT_AUDIO.play();
    sounds.CHARACTER_HURT_AUDIO.volume = 0.1;
  }

  /**
   * Handles dead animation
   */
  handleDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    sounds.CHARACTER_DEAD_AUDIO.play();
    sounds.CHARACTER_DEAD_AUDIO.volume = 0.1;
    setTimeout(() => {
      for (let i = 1; i < 9999; i++) window.clearInterval(i);
      gameOver();
    }, 1000);
  }

  /**
   * Makes the character jump
   */
  jump() {
    this.speedyY = 30;
  }

  /**
   * Makes the character moving to left
   */
  moveLeftCharacter() {
    this.x -= 15;
    this.otherDirection = true;
    sounds.CHARACTER_WALKING_AUDIO.play();
    sounds.CHARACTER_WALKING_AUDIO.volume = 0.1;
  }

  /**
   * Makes the character moving to right
   */
  moveRightCharacter() {
    this.x += 15;
    this.otherDirection = false;
    sounds.CHARACTER_WALKING_AUDIO.play();
    sounds.CHARACTER_WALKING_AUDIO.volume = 0.1;
  }

  /**
   * Based on the distance between the character and the endboss,
   * a warning message will appear
   */
  distanceToEndboss() {
    setInterval(() => {
      const distanceToEndboss = Math.abs(this.x - this.world.endboss.x);
      if (distanceToEndboss < 850) {
        this.displayDangerMessage();
      }
    }, 1000 / 60);
  }

  /**
   * Displayes danger message
   */
  displayDangerMessage() {
    const dangerMessage = document.getElementById("dangerMessage");
    dangerMessage.innerHTML = "DANGER!";
    setTimeout(() => {
      dangerMessage.style.display = "none";
    }, 3000);
  }
}
