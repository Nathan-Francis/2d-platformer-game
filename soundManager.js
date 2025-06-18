class SoundManager {
	constructor() {
		this.menuMusic = menuMusic;
		this.footstepSound = footstepSound;
		this.playMusic = playMusic;
		this.deathSound = deathSound;
	}

	update() {
		this.handleMenuMusic();
		this.handleFootstepSound();
		this.handlePlayMusic();
		this.handleDeathSound();
	}

	handleMenuMusic() {
		//menu music logic
		if (gameState === "menu" && !menuMusic.isPlaying()) {
			menuMusic.loop();
		} else if (gameState !== "menu" && menuMusic.isPlaying()) {
			menuMusic.stop();
		}
	}

	handlePlayMusic() {
		//play music logic
		if (gameState === "play" && !playMusic.isPlaying()) {
			playMusic.loop();
		} else if (gameState !== "play" && playMusic.isPlaying()) {
			playMusic.stop();
		}
	}

	handleFootstepSound() {
		if (gameState === "play") {
			if (
				!gameChar.isPlummeting &&
				gameChar.yPos === floorPos_y &&
				(gameChar.isLeft || gameChar.isRight)
			) {
				if (!footstepSound.isPlaying()) {
					footstepSound.loop();
				}
			}
			//stops footstep sound when mid-air
			else if (gameChar.isPlummeting || gameChar.yPos !== floorPos_y) {
				if (footstepSound.isPlaying()) {
					footstepSound.stop();
				}
			}
		}
		//stops footstep when dies (gameState no longer "play")
		else {
			if (footstepSound.isPlaying()) {
				footstepSound.stop();
			}
		}
	}

	handleDeathSound() {
		if (gameChar.dead) {
			//logic needed to prevent death sound repeating itself
			if (!this.deathSoundActive) {
				deathSound.play();
				this.deathSoundActive = true;
			}
		}
		//when char respawns, reset flag
		else {
			this.deathSoundActive = false;
		}
	}
}
