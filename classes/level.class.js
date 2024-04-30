class Level {
  enemies;
  backgroundObjects;
  coins;
  bottles;
  level_end_x = 5100;
  extraBottles;

  /**
   * Constructs a new Level object
   * @param {Array} enemies - Array of enemies in the level
   * @param {Array} backgroundObjects - Array of background objects in the level
   * @param {Array} coins - Array of coins in the level
   * @param {Array} bottles - Array of bottles in the level
   * @param {Array} extraBottles - Array of extra bottles in the level
   */
  constructor(enemies, backgroundObjects, coins, bottles, extraBottles) {
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
    this.extraBottles = extraBottles;
  }
}
