class Cloud extends MoveableObject {
  y = 10;
  width = 400;
  height = 300;
  speed = 0.15;

  /**
   * Constructs a new instance of the Cloud class
   * Loads the cloud image, sets initial position, and starts animation
   */
  constructor() {
    super();
    this.loadImage("./img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 3500;
    this.animate();
  }

  /**
   * Animates the cloud by moving it leftwards
   */
  animate() {
    this.moveLeft();
  }
}
