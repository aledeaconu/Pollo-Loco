class EndbossHealthBar extends StatusBars {
  x = 425;
  y = 0;
  height = 60;
  width = 200;

  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  /**
   * Constructs a new StatusHealthEndboss object
   */
  constructor() {
    super();
    this.loadNextImages(this.IMAGES);
    this.setPercentage(100);
  }

  /**
   * Returns the index of the image to be displayed based on the current percentage.
   * @returns {number} The index of the image to be displayed
   */
  getImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage == 80) {
      return 4;
    } else if (this.percentage == 60) {
      return 3;
    } else if (this.percentage == 40) {
      return 2;
    } else if (this.percentage == 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
