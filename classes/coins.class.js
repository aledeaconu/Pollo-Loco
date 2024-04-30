class Coins extends ColactableObjects {
  height = 170;
  width = 170;

  coin_animate = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  collisionBox = {
    right: 0,
    left: 0,
    top: -30,
    bottom: 100,
  };

  /**
   * Constructs a new instance of the Coins class
   * Loads coin images, sets initial position, and starts animation
   */
  constructor() {
    super();
    this.loadImage(this.coin_animate[0]);
    this.loadNextImages(this.coin_animate);
    this.x = 800 + Math.random() * 2500;
    this.y = -50 + Math.random() * 200;
    this.animate(this.coin_animate);
  }
}
