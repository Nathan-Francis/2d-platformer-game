/*

Game Project

*/

//game features
let cameraPosX;
let gameState;
let gameScore;
let flagpole;
let brightnessSlider;

//game sounds
let soundManager;
let menuMusic;
let playMusic;
let jumpSound;
let footstepSound;
let coinSound;
let captureFlagSound;
let deathSound;

//character and enemies
let gameChar;
let lives;

//scenery
let floorPos_y;
let canyons;
let clouds;
let collectable;
let mountains;
let trees;
let snowflakes;
let background;

function preload() {
	soundFormats("mp3", "wav");

	menuMusic = loadSound("assets/main.wav");
	menuMusic.setVolume(0.3);

	playMusic = loadSound("assets/main.wav");
	playMusic.setVolume(0.1);

	deathSound = loadSound("assets/death.mp3");
	deathSound.setVolume(0.3);

	captureFlagSound = loadSound("assets/captureflag.wav");
	captureFlagSound.setVolume(0.3);

	jumpSound = loadSound("assets/jump.wav");
	jumpSound.setVolume(0.1);

	footstepSound = loadSound("assets/footstep.wav");
	footstepSound.setVolume(0.3);

	coinSound = loadSound("assets/coins.wav");
	coinSound.setVolume(0.3);
}

function startGame() {
	cameraPosX = 0;
	gameState = "menu";

	//brightness between 0-150 with default 0
	brightnessSlider = createSlider(0, 150, 0);

	gameChar = new Character(width / 2, floorPos_y, 3, 1.5, 2, 350, 2);

	background = new Background();

	soundManager = new SoundManager();

	snowflakes = [];

	canyons = [new Canyon(150, 100), new Canyon(690, 80), new Canyon(1250, 60)];

	mountains = [
		new Mountain(350, floorPos_y, color(80)),
		new Mountain(800, floorPos_y, color(100)),
		new Mountain(1400, floorPos_y, color(80)),
	];

	trees = [
		new Tree(300, floorPos_y - 40, color(120, 60, 20), color(84, 200, 84)),
		new Tree(500, floorPos_y - 40, color(120, 100, 20), color(34, 180, 34)),
		new Tree(900, floorPos_y - 40, color(120, 80, 20), color(34, 180, 34)),
		new Tree(1150, floorPos_y - 40, color(120, 90, 20), color(84, 200, 84)),
		new Tree(1400, floorPos_y - 40, color(120, 90, 20), color(34, 180, 34)),
		new Tree(1600, floorPos_y - 40, color(120, 80, 20), color(84, 200, 84)),
		new Tree(1950, floorPos_y - 40, color(120, 60, 20), color(34, 180, 34)),
	];

	clouds = [];

	//clouds
	for (let i = 0; i < 20; i++) {
		//xPos determines spacing between clouds
		let xPos = 250 * i;

		//push newly generated clouds to array
		clouds.push(new Cloud(xPos));
	}

	flagpole = {
		xPos: 1600,
		yPos: floorPos_y,
		isReached: false,
	};

	collectable = [
		{ xPos: 100, yPos: floorPos_y, size: 10, isFound: false },
		{ xPos: 450, yPos: floorPos_y, size: 10, isFound: false },
		{ xPos: 900, yPos: floorPos_y, size: 10, isFound: false },
		{ xPos: 1200, yPos: floorPos_y, size: 10, isFound: false },
	];
}

function setup() {
	createCanvas(1024, 576);
	floorPos_y = (height * 3) / 4;
	startGame();
}

function draw() {
	soundManager.update();

	//camera keeps game character in centre of screen
	cameraPosX = gameChar.xPos - width / 2;

	//draw background
	background.draw();

	push();
	translate(-cameraPosX, 0);

	//draw clouds
	for (let i = 0; i < clouds.length; i++) {
		clouds[i].draw();
		clouds[i].update();
	}

	//draw canyons
	for (let i = 0; i < canyons.length; i++) {
		canyons[i].draw();
		canyons[i].checkCanyon(gameChar);
	}

	//draw mountains
	for (let i = 0; i < mountains.length; i++) {
		mountains[i].draw();
	}

	//draw trees
	for (let i = 0; i < trees.length; i++) {
		trees[i].draw();
	}

	//draw collectables
	for (let i = 0; i < collectable.length; i++) {
		checkCollectable(collectable[i]);
		drawCollectable(collectable[i]);
	}

	//draw flag
	checkFlagpole();
	drawFlagpole();

	//game character
	gameChar.draw();

	//draw snow
	snowfall();

	pop();

	///////////INTERACTION CODE//////////

	gravity();
	checkGameState();
	gameBoundary();
	brightnessMenu();
}

function snowfall() {
	let snowOnScreen = [];

	if (random(0, 1) < 0.1) {
		/*
		snow falls within -500 xPos and flagpole + 500
		new flakes are pushed to an empty array 'snowflakes'
		*/
		snowflakes.push(new Snowflake(random(-500, flagpole.xPos + 500), 0));
	}

	//displays and updates snowflakes,
	for (let i = snowflakes.length - 1; i >= 0; i--) {
		snowflakes[i].update();
		snowflakes[i].draw();

		/*
		this logic removes snowflakes that hit the ground, but allows
		snowflakes in-line with the canyons to continue to fall
		*/
		if (
			snowflakes[i].yPos > floorPos_y &&
			!snowflakes[i].snowAboveCanyon(canyons)
		) {
			snowflakes.splice(i, 1);
		}

		/*
		this logic removes snowflakes that have disappeared from the 
		canvas (including canyon flakes) to prevent an infinite snowflake array
		*/
		if (snowflakes[i].yPos <= height) {
			snowOnScreen.push(snowflakes[i]);
		}
	}
}

function drawCollectable(t_collectable) {
	if (t_collectable.isFound === false) {
		fill(255, 255, 0);
		stroke(0);
		strokeWeight(1);
		//coins - middle stack
		ellipse(
			t_collectable.xPos,
			t_collectable.yPos,
			t_collectable.size,
			t_collectable.size - 5
		);
		ellipse(
			t_collectable.xPos,
			t_collectable.yPos - 3,
			t_collectable.size,
			t_collectable.size - 5
		);
		ellipse(
			t_collectable.xPos,
			t_collectable.yPos - 6,
			t_collectable.size,
			t_collectable.size - 5
		);
		ellipse(
			t_collectable.xPos,
			t_collectable.yPos - 9,
			t_collectable.size,
			t_collectable.size - 5
		);
		ellipse(
			t_collectable.xPos,
			t_collectable.yPos - 12,
			t_collectable.size,
			t_collectable.size - 5
		);
		//coins - right stack
		ellipse(
			t_collectable.xPos + 5,
			t_collectable.yPos + 6,
			t_collectable.size,
			t_collectable.size - 5
		);
		ellipse(
			t_collectable.xPos + 5,
			t_collectable.yPos + 3,
			t_collectable.size,
			t_collectable.size - 5
		);
		ellipse(
			t_collectable.xPos + 5,
			t_collectable.yPos,
			t_collectable.size,
			t_collectable.size - 5
		);
		ellipse(
			t_collectable.xPos + 5,
			t_collectable.yPos - 3,
			t_collectable.size,
			t_collectable.size - 5
		);
		ellipse(
			t_collectable.xPos + 5,
			t_collectable.yPos - 6,
			t_collectable.size,
			t_collectable.size - 5
		);
		//coins - left stack
		ellipse(
			t_collectable.xPos - 5,
			t_collectable.yPos + 4,
			t_collectable.size,
			t_collectable.size - 5
		);
		ellipse(
			t_collectable.xPos - 5,
			t_collectable.yPos + 1,
			t_collectable.size,
			t_collectable.size - 5
		);
		ellipse(
			t_collectable.xPos - 5,
			t_collectable.yPos - 2,
			t_collectable.size,
			t_collectable.size - 5
		);
		ellipse(
			t_collectable.xPos - 5,
			t_collectable.yPos - 5,
			t_collectable.size,
			t_collectable.size - 5
		);
		ellipse(
			t_collectable.xPos - 5,
			t_collectable.yPos - 8,
			t_collectable.size,
			t_collectable.size - 5
		);
		strokeWeight(0);
	}
}

function checkCollectable(t_collectable) {
	/*
	if character less than 20 pixels away from collectable, 
	set flag to True and hide the collectable from the screen
	*/
	if (
		dist(
			gameChar.xPos,
			gameChar.yPos,
			t_collectable.xPos,
			t_collectable.yPos
		) < 20
	)
		if (!t_collectable.isFound) {
			t_collectable.isFound = true;
			gameScore++;
			coinSound.play();
		}
}

function drawFlagpole() {
	//pole
	fill(0);
	rect(flagpole.xPos, flagpole.yPos + 2, 15, -200, 8);

	//flag
	if (flagpole.isReached) {
		//up
		fill(200, 0, 0);
		triangle(
			flagpole.xPos,
			270,
			flagpole.xPos + 60,
			240,
			flagpole.xPos,
			220
		);
	} else {
		//down
		fill(200, 0, 0);
		triangle(
			flagpole.xPos,
			400,
			flagpole.xPos + 60,
			370,
			flagpole.xPos,
			350
		);
	}
}

function checkFlagpole() {
	if (abs(gameChar.xPos - flagpole.xPos) < 20)
		if (!flagpole.isReached) {
			flagpole.isReached = true;
			gameState = "winLevel";
			captureFlagSound.play();
		}
}

function gravity() {
	//added jumpHeight to prevent character jumping through clouds
	if (!gameChar.isFalling && gameChar.yPos < floorPos_y) {
		gameChar.yPos += gameChar.gravity;
	} else if (gameChar.yPos < gameChar.jumpHeight) {
		gameChar.isFalling = false;
	}
}

function respawnChar() {
	//reset character position to start point
	gameChar.xPos = width / 2;
	gameChar.yPos = floorPos_y;
	gameChar.isPlummeting = false;

	//reset the dead flag on respawn
	gameChar.dead = false;
}

function lostLife(livesLost) {
	/*
	checks dead flag and if lives are greater than 0 to prevent negative 
	lives the boolean flag stops lives counter endlessly decrementing
	*/
	if (!gameChar.dead && lives > 0) {
		lives -= livesLost;
		gameChar.dead = true;
	}
}

function drawLivesCounter() {
	//life counter textbox
	stroke(0);
	strokeWeight(2);
	fill(200);
	rect(5, 10, 100, 30, 10);
	noStroke();

	//life counter
	fill(0);
	textSize(20);
	text("Lives: " + lives, 50, 25);
}

function drawScoreCounter() {
	//score counter textbox
	stroke(0);
	strokeWeight(2);
	fill(200);
	rect(5, 45, 100, 30, 10);
	noStroke();

	//score counter
	fill(0);
	textSize(20);
	text("Coins: " + gameScore, 50, 60);
}

function brightnessMenu() {
	//create the slider object
	brightnessSlider.position(width - 120, 10);
	brightnessSlider.size(100, 80);

	//assign transparency value to slider value
	gameBrightness = brightnessSlider.value();
	fill(0, gameBrightness);

	//overlay canvas size rect for brightness effect
	rect(0, 0, width, height);

	//brightness textbox
	stroke(0);
	strokeWeight(2);
	fill(200);
	rect(width - 130, 10, 120, 30, 10);
	noStroke();

	//brightness text
	fill(0);
	textAlign(CENTER, CENTER);
	textSize(20);
	text("Brightness", width - 70, 25);
}

function checkGameState() {
	switch (gameState) {
		case "menu":
			mainMenu();
			break;

		case "play":
			//lives and score only displayed when playing game
			drawLivesCounter();
			drawScoreCounter();
			break;

		case "death":
			deathHandler();
			eventMessage("death");
			break;

		case "gameOver":
			eventMessage("gameOver");
			break;

		case "winLevel":
			eventMessage("winLevel");
			break;
	}
}

function deathHandler() {
	lostLife(1);

	if (lives > 0) {
		gameState = "death";
	} else {
		gameState = "gameOver";
	}
	return;
}

function eventMessage(messageType) {
	//global text parameters
	textAlign(CENTER, CENTER);
	textSize(40);
	stroke(1);
	strokeWeight(5);
	fill(192, 192, 192);
	rect(210, 115, 600, 100, 15);
	strokeWeight(0);
	fill(0);

	if (messageType === "death") {
		text("You Died!", width / 2, height / 4);
		text("Press R to Restart", width / 2, height / 4 + 50);
	} else if (messageType === "gameOver") {
		text("Game Over!", width / 2, height / 4);
		text("Press M to return to Main Menu", width / 2, height / 4 + 50);
	} else if (messageType === "winLevel") {
		text("You Win!", width / 2, height / 4);
		text("Press M to return to Main Menu", width / 2, height / 4 + 50);
	}
}

function mainMenu() {
	//blank canvas to hide game
	stroke(0);
	fill(60);
	rect(0, 0, width, height);

	//reset game parameters
	lives = 3;
	gameScore = 0;
	flagpole.isReached = false;

	for (i = 0; i < collectable.length; i++) {
		collectable[i].isFound = false;
	}

	//draw the 'press spacebar' textbox
	strokeWeight(5);
	fill(192, 192, 192);
	rect(210, 30, 600, 80, 15);
	strokeWeight(0);
	fill(0);
	textAlign(CENTER, CENTER);
	textSize(40);
	text("Press Spacebar to Load Game", width / 2, height / 8);

	//list of game instructions
	var instructions = [
		"Press A, W, D to move",
		"Collect all the coins",
		"Destroy enemies to gain points",
		"Do not fall down the canyons",
		"Capture the flag to complete level",
	];

	/*
	title size 30, instruction text size 20, so the line size will be 
	40 (2 * 20). This block of code creates the grey box around the 
	instructions and will increment in size as new instructions are added
	*/
	const titleSize = 30;
	const lineSize = 40;
	const textHeight = titleSize + instructions.length * lineSize + 30;

	//instruction textbox
	strokeWeight(5);
	fill(100, 100);
	rect(210, 160, 400, textHeight, 15);

	//instruction title
	strokeWeight(1);
	fill(200);
	textAlign(LEFT, CENTER);
	textSize(titleSize);
	text("Instructions:", 230, height / 3);

	//loop through the instructions array
	for (i = 0; i < instructions.length; i++) {
		var instrNum = i + 1;
		textSize(lineSize / 2);

		text(instrNum + ". " + instructions[i], 230, height / 3 + i * 40 + 40);
	}
}

function gameBoundary() {
	/*
	checks if player is within the game left boundary, and disables
	left movement to prevent an infinite world
	*/
	if (gameChar.xPos <= 0) {
		gameChar.isLeft = false;
	}

	/*
	the winLevel gameState will prevent character movement, but this
	additional condition is a belts	and braces incase the player finds 
	a way around the flagpole, to stop them moving any further
	*/
	if (gameChar.xPos >= flagpole.xPos + 10) {
		gameChar.isRight = false;
	}
}

function keyPressed() {
	switch (keyCode) {
		//transitions through menu > start > play
		case 32: //spacebar
			if (gameState === "menu") {
				gameState = "play";
			}
			break;

		//only move left when in play
		case 65: //A key
			if (gameState === "play" && !gameChar.isPlummeting) {
				gameChar.isLeft = true;
			}
			break;

		//only move right when in play
		case 68: //D key
			if (gameState === "play" && !gameChar.isPlummeting) {
				gameChar.isRight = true;
			}
			break;

		//return to 'menu' when no lives left, or win level
		case 77: // 'M' key
			if (gameState === "gameOver" || gameState === "winLevel") {
				respawnChar();
				gameState = "menu";
			}
			break;

		//respawn char and restart level when lost a life
		case 82: //R key
			if (gameState === "death") {
				respawnChar();
				gameState = "play";
			}
			break;

		//only jump when in play and touching the ground
		case 87: //W key
			if (
				gameState === "play" &&
				gameChar.yPos > floorPos_y - 2 &&
				gameChar.yPos < floorPos_y + 2 &&
				!gameChar.isPlummeting
			) {
				jumpSound.play();
				gameChar.isFalling = true;
			}
			break;
	}
}

function keyReleased() {
	switch (keyCode) {
		//stop left movement
		case 65: //A key
			footstepSound.stop();
			gameChar.isLeft = false;
			break;

		//stop right movement
		case 68: //D key
			footstepSound.stop();
			gameChar.isRight = false;
			break;

		//stop jump
		case 87: //W key
			gameChar.isFalling = false;
			break;
	}
}
