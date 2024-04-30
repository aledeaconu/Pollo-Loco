class BackgroundObject extends MoveableObject {
  width = 720;
  height = 480;

  /**
   * Constructs a new instance of the BackgroundObject class
   * Loads the specified image and sets the initial position
   * @param {string} imagePath - The path to the image file
   * @param {number} x - The initial x-coordinate of the object
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
