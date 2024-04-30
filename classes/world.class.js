class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  otherDirection;
  camera_x = 0;

  healthBar = new StatusHealth();
  coinBar = new StatusCoin();
  bottleBar = new StatusBottle();
  endBossHealthBar = new EndbossHealthBar();
  showEndBossHealthBar = false;
  isMoving = false;
  endboss = level1.enemies[level1.enemies.length - 1];

  collectedCoins;
  collectedBottles;
  thrownBottles;

  throwableObjects = [];

  hasHitGround = false;

/**
 * Constructs a new world instance
 * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game world.
 * @param {Keyboard} keyboard - The keyboard
 */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.coins = this.level.coins;
    this.bottles = this.level.bottles;
    this.extraBottles = this.level.extraBottles;
    this.thrownBottles = 0;

    this.collectedBottles = 0;

    this.intervallIds = []
    this.draw();
    this.setWorld();
    this.run();
    
  }

  /**
   * Adds the sounds of the objects to the sounds of the class
   * @param {Array} audioArray - Array of sounds
   * @param {Array} sounds - Array to add sounds to
   */
  addToSounds(audioArray, sounds) {
    Object.values(audioArray).forEach((sound) => {
      sounds.push(sound);
    });
  }

  /**
   * Sets the world reference for the character object
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Draws all objects in the game world
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    //------Space for fixed objects--------
    this.addToMap(this.healthBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    if (this.showEndBossHealthBar) {
      this.addToMap(this.endBossHealthBar);
    }

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.extraBottles);

    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  /**
   * Adds a movable object to the map with appropriate transformation
   * @param {*} movable - The movable object to add
   */
  addToMap(movable) {
    if (movable.otherDirection) {
      this.flipImage(movable);
    }

    movable.draw(this.ctx);

    if (movable.otherDirection) {
      this.rotateImage(movable);
    }
  }

  /**
   * Adds an array of objects to the map
   * @param {Array} objects - Array of objects to add
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Flips the image horizontally
   * @param {*} movable - The movable object to flip
   */
  flipImage(movable) {
    this.ctx.save();
    this.ctx.translate(movable.width, 0);
    this.ctx.scale(-1, 1);
    movable.x = movable.x * -1;
  }

  /**
   * Rotates the image back to its original orientation
   * @param {*} movable - The movable object to rotate
   */
  rotateImage(movable) {
    movable.x = movable.x * -1;
    this.ctx.restore();
  }

  /**
   * Main game loop responsible for checking collisions, collecting items, etc.
   */
  run() {
    let intervall = setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.runCollectCoins();
      this.runCollectBottles();
      this.jumpOnChicken();
      this.checkIfEndBossMoves();
      this.checkThrowBottlesOnEndboss();
      this.runCollectExtraBottles();
    }, 100);
    intervallIds.push(intervall);
  }

  /**
   * Stops the game by clearing all intervals
   */
  stopGame() {
    this.intervallIds.forEach((ID) => {
      clearInterval(ID);
    });
  }

  /**
   * Checks collisions between the character and enemies
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        !enemy.chickenIsDead &&
        !this.character.isHurt()
      ) {
        if (this.character.isAboveGround()) {
          this.jumpOnChicken();
        } else {
          this.character.hit();
          this.healthBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  /**
   * Checks if the character jumps on a chicken
   */
  jumpOnChicken() {
    if (this.character.isAboveGround()) {
      this.level.enemies.forEach((enemy) => {
        if (
          this.character.isColliding(enemy) &&
          this.character.isAboveGround() &&
          this.character.isFalling()
        ) {
          if (
            (enemy instanceof Chicken || enemy instanceof ChickenSmall) &&
            !enemy.chickenIsDead
          ) {
            enemy.chickenIsDead = true;
            enemy.animate();
            this.removeChicken(enemy);
            
          }
        }
      });
    }
  }

  /**
   * Removes defeated chicken from the level
   * @param {object} enemy - The chicken enemy to remove
   */
  removeChicken(enemy) {
    setTimeout(() => {
      const enemyIndex = this.level.enemies.indexOf(enemy);
      if (enemyIndex > -1) {
        this.level.enemies.splice(enemyIndex, 1);
      }
    }, 1000);
  }

  /**
   * Checks if the player throws throwable objects (bottles) and updates game state accordingly
   */
  checkThrowObjects() {
    if (this.keyboard.E && this.collectedBottles > 0) {
      let bottle = new ThrowableObjects(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.thrownBottles++;
      this.collectedBottles--;
      this.bottleBar.setPercentage(this.bottleBar.percentage - 20);

      if (!this.endboss.isDead() && this.thrownBottles === 5) {
        this.showExtraBottlesMessage();
      }
    }
  }

  /**
   * Displays a message about extra bottles behind the boss for a short duration
   */
  showExtraBottlesMessage() {
    let extraBottlesMessage = document.getElementById("extraBottlesMessage");
    extraBottlesMessage.innerHTML =
      "Extra bottles behind the boss!! <br> Grab them before it's too late!";

    setTimeout(() => {
      extraBottlesMessage.innerHTML = "";
    }, 2000);
  }

  /**
   * Checks if thrown bottles hit the end boss and updates game state accordingly
   */
  checkThrowBottlesOnEndboss() {
    this.throwableObjects.forEach((bottle) => {
      if (this.endboss.isColliding(bottle)) {
        this.endboss.reduceHealth(20);
        this.endBossHealthBar.setPercentage(this.endboss.energy);
        this.bottleHitEndboss(bottle);
      }
    });
  }

  /**
   * Initiates bottle splash animation and updates game state
   */
  bottleHitEndboss(throwableObject) {
    this.isSplashing = true;
    throwableObject.animateBottleSplash();
    this.removeThrownBottle();
  }

  /**
   * Removes a thrown bottle from the game after a short delay
   */
  removeThrownBottle(throwableObject) {
    setTimeout(() => {
      let index = this.throwableObjects.indexOf(throwableObject);
      if (index !== 1) {
        this.throwableObjects.splice(index, 1);
      }
    }, 25);
  }

  /**
   * Collects the coins from the map and updates the coin's status bar
   */
  runCollectCoins() {
    this.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        coin.x = undefined;
        this.coinBar.setPercentage(this.coinBar.percentage + 20);
        this.collectedCoins += 20;
        sounds.COIN_AUDIO.play();
        sounds.COIN_AUDIO.volume = 0.1
      }
    });
  }

  /**
   * Collects the bottles from the map and updates the bottle's status bar
   */
  runCollectBottles() {
    this.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        bottle.y = undefined;
        this.bottleBar.setPercentage(this.bottleBar.percentage + 20);
        this.collectedBottles++;
        sounds.BOTTLE_AUDIO.play();
        sounds.BOTTLE_AUDIO.volume = 0.1
      }
    });
  }

  /**
   * Collects extra bottles from the map and updates the bottle's status bar
   */
  runCollectExtraBottles() {
    this.extraBottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        bottle.y = undefined;
        this.bottleBar.setPercentage(this.bottleBar.percentage + 20);
        this.collectedBottles++;
      }
    });
  }

  /**
   * Checks if the end boss should move and updates game state accordingly
   */
  checkIfEndBossMoves() {
    if (this.character.x > 3600) {
      this.endboss.isMoving = true;
      this.showEndBossHealthBar = true;
    }
  }
}
