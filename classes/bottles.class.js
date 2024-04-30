class Bottles extends ColactableObjects {
  bottle_animate = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Constructs a new instance of the Bottles class
   * Loads the images for bottle animation and sets initial position
   */
  constructor() {
    super();
    this.loadImage(this.bottle_animate[0]);
    this.loadNextImages(this.bottle_animate);
    this.x = 300 + Math.random() * 2500;
    this.y = 350;
    this.height = 80;
    this.width = 80;
    this.animate(this.bottle_animate);
  }
}
