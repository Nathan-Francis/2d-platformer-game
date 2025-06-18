# 2D Scrolling Platform Game

This is a 2D side-scrolling platform game built with [p5.js](https://p5js.org/). The player controls a character who must collect coins, avoid canyons, and reach the flagpole to win the level. The game features parallax backgrounds, animated clouds, snow, sound effects, and a simple UI for score, lives, and brightness.

## Features

- **Scrolling World:** The camera follows the player as they move through the level.
- **Collectables:** Gather coins to increase your score.
- **Hazards:** Avoid falling into canyons or you'll lose a life.
- **Flagpole:** Reach the flagpole to complete the level.
- **Sound Effects:** Includes background music, footsteps, jumping, coin collection, and more.
- **Weather:** Animated snowflakes fall and interact with the environment.
- **UI:** Displays lives, coins, and a brightness slider.
- **Instructions:** Main menu with controls and gameplay instructions.

## Controls

- **A / D:** Move left / right
- **W:** Jump (only when on the ground)
- **Shift:** Sprint (hold while moving left/right)
- **Spacebar:** Start game from main menu
- **R:** Restart after death
- **M:** Return to main menu after game over or win
- **Brightness Slider:** Adjust screen brightness (top right)

## Getting Started

1. **Clone or Download** this repository.
2. **Open `index.html`** in your web browser.
3. **Play!**

## File Structure

- `index.html` - Main HTML file, loads all scripts and assets.
- `sketch.js` - Main game loop and logic.
- `character.js` - Player character class and movement.
- `background.js` - Background gradient drawing.
- `cloud.js` - Cloud class and animation.
- `mountain.js` - Mountain class and drawing.
- `tree.js` - Tree class and drawing.
- `canyon.js` - Canyon class and collision logic.
- `snowflake.js` - Snowflake class and animation.
- `soundManager.js` - Handles all game sound effects and music.
- `assets/` - Contains all sound files used in the game.

## Dependencies

- [p5.js](https://p5js.org/) (`p5.min.js`)
- [p5.sound](https://p5js.org/reference/#/libraries/p5.sound) (`p5.sound.min.js`)

These libraries are included in the project and loaded via `<script>` tags in `index.html`.

## License

This project is for educational purposes only.  
You may not use, copy, modify, or distribute this code for commercial purposes or personal gain without explicit permission from the author.
