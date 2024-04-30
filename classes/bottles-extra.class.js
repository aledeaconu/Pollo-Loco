class ExtraBottles extends ColactableObjects {
  bottle_animate = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Constructs a new instance of the ExtraBottles class
   * Loads the images for bottle animation and sets initial position
   */
  constructor() {
    super();
    this.loadImage(this.bottle_animate[0]);
    this.loadNextImages(this.bottle_animate);
    this.x = 5000 + Math.random() * 200;
    this.y = 150 + Math.random() * 200;
    this.height = 80;
    this.width = 80;
    this.animate(this.bottle_animate);
  }
}
