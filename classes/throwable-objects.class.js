class ThrowableObjects extends MoveableObject {
  width = 100;
  height = 100;
  speedxX = 30;
  world;
  isSplashing = false;

  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates an instance of ThrowableObjects
   * @param {number} x - The initial x coordinate of the throwable object
   * @param {number} y - The initial y coordinate of the throwable object
   * @param {World} world - The game world object
   */
  constructor(x, y) {
    super().loadImage("./img/7_statusbars/3_icons/icon_salsa_bottle.png");
    this.loadNextImages(this.IMAGES_ROTATION);
    this.loadNextImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.world = world;
    this.otherDirection = world.character.otherDirection;
    this.throw();
  }

  /**
   * Throws the throwable object
   * Applies gravity and animates the object's movement
   */
  throw() {
    this.speedyY = 30;
    this.applyGravity();

    this.animateBottle();

    setInterval(() => {
      if (this.isAboveGround()) {
        if (this.otherDirection) {
          this.x -= this.speedxX;
        } else {
          this.x += this.speedxX;
        }
      }
    }, 75);
  }

  /**
   * Animates the rotation of the throwable object
   */
  animateBottle() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION);
    }, 45);
  }

  /**
   * Animates the splash of the throwable object
   * This animation is triggered upon collision with the ground
   */
  animateBottleSplash() {
    if (!this.isSplashing) {
      setInterval(() => {
        this.playAnimation(this.IMAGES_SPLASH);
      }, 45);
    }
  }
}
