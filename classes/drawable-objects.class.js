class DrawableObjects {
  x = 120;
  y = 350;
  img;
  height = 150;
  width = 200;
  imageCache = [];
  currentImage = 0;

  /**
   * Loads an image from the specified path and adds it to the image cache
   * @param {string} path - the path to the image file
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
    this.imageCache[path] = this.img;
  }

  /**
   * Loads multiple images from an array of paths and adds them to the image cache
   * @param {array} arr - an array of image paths to be loaded
   */
  loadNextImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the drawable object on the canvas context
   * @param {CanvasRenderingContext2D} ctx -  The 2D rendering context of the canvas
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn("couldnt load img", this.img.src);
    }
  }
}
