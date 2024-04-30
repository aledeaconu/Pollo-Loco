class ColactableObjects extends MoveableObject {
  hoverCounter = 1;

  /**
   * Animates the object by alternating its vertical position periodically
   * @param {Array} array - Array of image paths for animation frames
   */
  animate(array) {
    setInterval(() => {
      this.playAnimation(array);
      if (this.hoverCounter == 1) {
        this.y += 5;
        this.hoverCounter++;
      } else {
        this.y -= 5;
        this.hoverCounter--;
      }
    }, 500);
  }
}
