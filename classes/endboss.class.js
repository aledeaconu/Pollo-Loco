class Endboss extends MoveableObject {
  x = 4500;
  y = 10;
  width = 350;
  height = 450;
  currentImage = 0;
  isMoving = false;
  world;
  firstContact = false;
  i = 0;
  speed = 0.3;
  maxX = 3800;
  hurt = false;

  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  collisionBox = {
    right: 35,
    left: 20,
    top: 100,
    bottom: 50,
  };

  /**
   * Constructs a new endboss instance
   * Loads images for different states, sets world reference, starts animations
   * @param {World} world - The game world reference
   */
  constructor(world) {
    super();
    this.world = world;
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadNextImages(this.IMAGES_WALKING);
    this.loadNextImages(this.IMAGES_ALERT);
    this.loadNextImages(this.IMAGES_ATTACK);
    this.loadNextImages(this.IMAGES_HURT);
    this.loadNextImages(this.IMAGES_DEAD);
    this.animate();
  }

  /**
   * Animates the endboss's movements
   */
  animate() {
    setInterval(() => {
      if (!this.isMoving) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.hurt) {
        this.playAnimation(this.IMAGES_HURT);
        sounds.ENDBOSS_HURT_AUDIO.play();
        sounds.ENDBOSS_HURT_AUDIO.volume = 0.1;
        setTimeout(() => {
          this.hurt = false;
        }, 500);
      } else if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        sounds.ENDBOSS_DEAD_AUDIO.play();
        sounds.ENDBOSS_DEAD_AUDIO.volume = 0.1;
        setTimeout(() => {
          for (let i = 1; i < 9999; i++) window.clearInterval(i);
          gameOver();
        }, 1500);
      } else {
        this.actionsEndBoss();
        this.playAnimation(this.IMAGES_ATTACK);
      }
    }, 200);
  }

  /**
   * Performs actions for the endboss based on its state
   */
  actionsEndBoss() {
    if (!this.firstContact) {
      this.firstContact = true;
      this.i = 0;
    }
    const distance = Math.abs(this.x - world.character.x);
    const minDistance = 0;

    if (distance > minDistance && world.character.x > 4000) {
      if (this.x > world.character.x) {
        this.moveLeftAndWalk();
      } else if (this.x < world.character.x) {
        this.moveRightAndWalk();
      }
    }
  }

  /**
   * Moves the endboss to the left and plays the walking animation
   */
  moveLeftAndWalk() {
    this.moveLeftChicken();
    this.otherDirection = false;
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Moves the endboss to the right and plays the walking animation
   */
  moveRightAndWalk() {
    this.moveRightChicken();
    this.otherDirection = true;
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Reduces the health of the endboss
   * @param {number} amount - The amount by which to reduce the endboss's health
   */
  reduceHealth(amount) {
    this.energy -= amount;
    this.hurt = true;
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDead();
    }
  }
}
