class Chicken extends MoveableObject {
  width = 80;
  height = 80;
  speed = 0.15;
  currentImage = 0;
  chickenIsDead = false;

  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  collisionBox = {
    right: 10,
    left: 10,
    top: -50,
    bottom: -30,
  };

  /**
   * Constructs a new instance of the ChickenSmall class
   * Loads images for walking animation, sets initial position and speed,
   * and starts the animation
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadNextImages(this.IMAGES_WALKING);

    this.x = 1000 + Math.random() * 3000;
    this.speed = this.speed + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Animates the chicken's movements
   */
  animate() {
    if (!this.chickenIsDead) {
      this.moveLeftChicken();
      this.interval1 = setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
      }, 200);
    } else {
      this.chickenIsDead = true;
      sounds.CHICKEN_DEAD_SOUND.play();
      sounds.CHICKEN_DEAD_SOUND.volume = 0.1;
      this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
      clearInterval(this.interval1);
      this.speed = 0
    }
  }
}
