class StatusBars extends DrawableObjects {
  x;
  y;
  height = 45;
  width = 170;
  percentage;
  IMAGES = [];

  /**
   * Sets the percentage of the status bar and updates the displayed image accordingly
   * @param {number} percentage - The percentage value to set for the status bar
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.getImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * this function returns the number of a to loaded img to represent how much life the player has lost,
   * based on a percentage wich will decreases the damage of player has taken.
   * @returns the number of the to loaded img for the lifebar to represent the amount of collected bottle
   */
  getImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
