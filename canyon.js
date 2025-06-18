class Canyon {
	constructor(xPos, width) {
		this.xPos = xPos;
		this.yPos = floorPos_y;
		this.width = width;
	}

	draw() {
		fill(133, 204, 230);
		rect(this.xPos, this.yPos - 2, this.width, height - this.yPos + 2);
	}

	checkCanyon(char) {
		/*
		checks player is within the bounds of canyon and begins falling, also 
		checks player relative to ground level so can jump over canyon
		*/
		if (
			char.xPos >= this.xPos &&
			char.xPos <= this.xPos + this.width &&
			char.yPos >= floorPos_y &&
			char.yPos <= floorPos_y + 250
		) {
			//stop movement controls
			char.isPlummeting = true;
			char.isLeft = false;
			char.isRight = false;

			//characters falls
			char.yPos += 3.5;

			//change game state
			if (gameState !== "gameOver") {
				gameState = "death";
			}
		}
	}
}
