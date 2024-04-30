let canvas;
let world;
let keyboard;

let intervallIds = [];
let timeoutId = [];

let startscreen = document.getElementById("startScreen");
let gamescreen = document.getElementById("gameScreen");
let endscreen = document.getElementById("endScreen");

keyboard = new Keyboard();
soundsMuted = false;

let winSoundPlayed = false;
let loseSoundPlayed = false;

/**
 * Initialize the game
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  gamescreen.style.display = "block";
  optionsScreen();
  playAudio();
  mobileControls();
}

/**
 * Start the game
 */
function startGame() {
  init();
  startscreen.style.display = "none";
  gameInstructions();
  closeInstructions();
  gameOver();
}

/**
 * Display options screen
 */
function optionsScreen() {
  let screenoptions = document.getElementById("screenOptions");
  screenoptions.innerHTML = screenOptionsHTMLTemplate();
}

/**
 * Play audio
 */
function playAudio() {
  sounds.MAIN_AUDIO.play();
  sounds.MAIN_AUDIO.volume = 0.1
}

/**
 * Toggle muted sound
 */
function toggleMutedSound() {
  if (soundsMuted == false) {
    Object.values(sounds).forEach((sound) => {
      sound.muted = true;
    });
    soundsMuted = true;
    document.getElementById("sound-btn").src = "./img/icons/sound_off.png";
  } else {
    Object.values(sounds).forEach((sound) => {
      sound.muted = false;
    });
    soundsMuted = false;
    document.getElementById("sound-btn").src = "./img/icons/sound_on.png";
  }
}

/**
 * Display game instructions
 */
function gameInstructions() {
  let instructions = document.getElementById("instructions");
  instructions.innerHTML = instructionsHTMLTemplate();
  instructions.style.display = "flex";
}

/**
 * Close game instructions
 */
function closeInstructions() {
  let instructions = document.getElementById("instructions");
  instructions.style.display = "none";
}

/**
 * Handle game over scenarios
 */
function gameOver() {
  if (world.character.energy <= 0 && !loseSoundPlayed) {
    playerLose();
  } else if (world.endboss.energy <= 0 && !winSoundPlayed) {
    playerWon();
  }
}

/**
 * Handle player win scenario
 */
function playerWon() {
  setTimeout(() => {
    showScreen();
    endscreen.style.backgroundImage =
      "url('./img/9_intro_outro_screens/game_over/you_win.png')";
    sounds.YOU_WIN_AUDIO.play();
    sounds.YOU_WIN_AUDIO.volume = 0.1
    sounds.MAIN_AUDIO.pause();
    winSoundPlayed = true;
    document.getElementById('gameScreen').style.overflow = 'visible'
    world.stopGame();
  }, 2000);
}

/**
 * Handle player lose scenario
 */
function playerLose() {
  setTimeout(() => {
    showScreen();
    endscreen.style.backgroundImage =
      "url('./img/9_intro_outro_screens/game_over/you_lost.png')";
    sounds.MAIN_AUDIO.pause();
    sounds.YOU_LOSE_AUDIO.play();
    sounds.YOU_LOSE_AUDIO.volume = 0.1
    loseSoundPlayed = true;
    document.getElementById('gameScreen').style.overflow = 'visible'
    world.stopGame();
  }, 2000);
}

/**
 * Display end screen
 */
function showScreen() {
  endscreen.style.display = "flex";
  document.getElementById("canvas").style.display = "none";
  document.getElementById("screenOptions").style.display = "none";
  document.querySelector(".mobile-controls").style.display = "none";
  document.getElementById("dangerMessage").style.display = "none";
  document.getElementById("extraBottlesMessage").style.display = "none";
}

/**
 * Restart the game
 */
function restartGame() {
  location.reload();
  endscreen.style.display = "none";
  document.querySelector(".mobile-controls").style.display = "none";
  startGame();
  mobileControls();
}

/**
 * Toggle fullscreen mode
 */
function fullscreen() {
  let fullscreenEl = document.getElementById("gameScreen");
  fullscreenEl.style.backgroundImage = 'url("./img/icons/main_background.jpg")';
  fullscreenEl.style.backgroundSize = "cover";
  fullscreenEl.style.backgroundRepeat = "no-repet";
  openFullscreen(fullscreenEl);
  closeFullscreen(fullscreenEl);
  let endscreen = document.getElementById("endScreen");
  endscreen.classList.add("game-screen");
}

/**
 * Open fullscreen mode
 */
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  }
}

/**
 * Close fullscreen mode
 */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

// Templates

function screenOptionsHTMLTemplate() {
  return `
  <div class="screen-options">
  <img
          src="./img/icons/sound_on.png"
          id="sound-btn"
          onclick="toggleMutedSound()"
        />
        <img
          src="./img/icons/fullscreen_icon.png"
          id="fullscreen-btn"
          onclick="fullscreen()"
        />
       
  </div>
  <div class="mobile-controls">
  <div class="mobile-btns">
    <img src="./img/icons/left-icon.png" alt="" id = "mobileControlLeft" />
    <img src="./img/icons/right-icon.png" alt="" id = "mobileControlRight" />
  </div>
  <div class="mobile-btns">
    <img src="./img/icons/up-icon.png" alt="" id = "mobileControlUp" />
    <img src="./img/icons/bottle-icon.png" alt="" id = "mobileControlThrow" />
  </div>
  </div>
  
  `;
}

function instructionsHTMLTemplate() {
  return `
    <div class='instructions'>
      <div class='close-instructions'>
        <button onclick='closeInstructions()'>Close</button>
      </div>
      <p style='color: #87820B'>Welcome to El Pollo Locco!</p>
      <p>Use the Arrow keys or WASD to move left, right, and jump.</p>
      <div class="keyboards-icons">
      <img src='img/10_keyboard_icons/Arrows.png'>
      <img style="width: 148px; margin-top: 15px;" src='img/10_keyboard_icons/wasd_icons.png'>
      </div>
      <div class='space-and-d'>
        <div>
          <p>Press 'Space' to jump.</p>
          <img src='img/10_keyboard_icons/Space.png'> 
        </div>
        <div>
          <p>Press 'D' for special action.</p>
          <img src='img/10_keyboard_icons/D.png' style='width: 50px'>
        </div>  
      </div>
      <p style='color: #87820B'>Avoid obstacles and collect coins!</p>
    </div>`;
}

// controlers

window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowLeft") {
    keyboard.LEFT = true;
  }

  if (e.key == "ArrowRight") {
    keyboard.RIGHT = true;
  }

  if (e.key == "ArrowUp") {
    keyboard.UP = true;
  }

  if (e.key == " ") {
    keyboard.SPACE = true;
  }

  if (e.key == "d") {
    keyboard.D = true;
  }

  if (e.key == "a") {
    keyboard.A = true;
  }

  if (e.key == "w") {
    keyboard.W = true;
  }

  if (e.key == "e") {
    keyboard.E = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key == "ArrowLeft") {
    keyboard.LEFT = false;
  }

  if (e.key == "ArrowRight") {
    keyboard.RIGHT = false;
  }

  if (e.key == "ArrowUp") {
    keyboard.UP = false;
  }

  if (e.key == " ") {
    keyboard.SPACE = false;
  }

  if (e.key == "a") {
    keyboard.A = false;
  }

  if (e.key == "d") {
    keyboard.D = false;
  }

  if (e.key == "w") {
    keyboard.W = false;
  }

  if (e.key == "e") {
    keyboard.E = false;
  }
});

function mobileControls() {
  document
    .getElementById("mobileControlLeft")
    .addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.LEFT = true;
    });

  document
    .getElementById("mobileControlLeft")
    .addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.LEFT = false;
    });

  document
    .getElementById("mobileControlRight")
    .addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.RIGHT = true;
    });

  document
    .getElementById("mobileControlRight")
    .addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.RIGHT = false;
    });

  document
    .getElementById("mobileControlUp")
    .addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.UP = true;
    });
  document
    .getElementById("mobileControlUp")
    .addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.UP = false;
    });

  document
    .getElementById("mobileControlThrow")
    .addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.E = true;
    });

  document
    .getElementById("mobileControlThrow")
    .addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.E = false;
    });
}
