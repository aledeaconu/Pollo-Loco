class MoveableObject extends DrawableObjects {
  speed = 0.15;
  otherDirection = false;
  speedyY = 0;
  accelerator = 2.5;
  energy = 100;
  lastHit = 0;

  collisionBox = {
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  };

  moveLeft() {}
  /**
   * Applies gravity to the objects on the map
   */
  applyGravity() {
    if (!this.isSplashing) {
      setInterval(() => {
        if (this.isAboveGround() || this.speedyY > 0) {
          this.y -= this.speedyY;
          this.speedyY -= this.accelerator;
        }
      }, 1000 / 25);
    }
  }

  /**
   * Checks if the object is above ground level
   * @returns {boolean} True if the object is above ground, false otherwise
   */
  isAboveGround() {
    if (this instanceof ThrowableObjects) {
      return true;
    } else {
      return this.y < 90;
    }
  }

  /**
   * Plays the images to create an animation
   * @param {array} images - Array of image paths for the animation
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Checks if the object is colliding with another movable object
   * @param {object} movable - The object to check collision with
   * @returns {boolean} True if collision occurs, false otherwise
   */
  isColliding(movable) {
    return (
      this.x + this.width - this.collisionBox.right >
        movable.x + movable.collisionBox.left && //R -> L
      this.y + this.height - this.collisionBox.bottom >
        movable.y + movable.collisionBox.top && // T -> B
      this.x + this.collisionBox.left <
        movable.x + movable.width - movable.collisionBox.right && // L -> R
      this.y + this.collisionBox.top <
        movable.y + movable.height - movable.collisionBox.bottom
    ); // B -> T
  }

  /**
   * Processes a hit taken by the object
   */
  hit() {
    if (this.energy === 0) {
      this.isDead();
    } else {
      this.energy -= 20;
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is currently hurt
   * @returns {boolean} True if the object is hurt, false otherwise
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1 && this.energy > 0;
  }

  /**
   * Checks if the object is dead
   * @returns {boolean} True if the object is dead, false otherwise
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Checks if the object is falling (moving upward)
   * @returns {boolean} True if the object is falling, false otherwise
   */
  isFalling() {
    return this.speedyY < 0;
  }

  /**
   * Checks if the object is on the ground level
   * @returns {boolean} True if the object is on the ground, false otherwise
   */
  isOnGround() {
    return this.y === 90;
  }

  /**
   * Moves the object to the left
   */
  moveLeftChicken() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  /**
   * Moves the object to the right
   */
  moveRightChicken() {
    setInterval(() => {
      this.x += this.speed;
    }, 1000 / 60);
  }

  /**
   * Clears all intervals associated with the object
   */
  clearAllIntervals() {
    for (let i = 0; i < 9999; i++) {
      window.clearInterval(i);
    }
  }
}
