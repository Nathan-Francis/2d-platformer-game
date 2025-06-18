class Character {
	constructor(
		xPos,
		yPos,
		runSpeed,
		walkSpeed,
		jumpSpeed,
		jumpHeight,
		gravity
	) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.runSpeed = runSpeed;
		this.walkSpeed = walkSpeed;
		this.jumpSpeed = jumpSpeed;
		this.jumpHeight = jumpHeight;
		this.gravity = gravity;
		this.dead = false;
		this.isLeft = false;
		this.isRight = false;
		this.isFalling = false;
		this.isPlummeting = false;
	}

	draw() {
		if (this.isLeft) {
			if (this.isFalling) {
				this.drawCharJumpLeft();
				this.charJumpLeftMovement();
			} else {
				this.drawCharLeft();
				this.charLeftMovement();
			}
		} else if (this.isRight) {
			if (this.isFalling) {
				this.drawCharJumpRight();
				this.charJumpRightMovement();
			} else {
				this.drawCharRight();
				this.charRightMovement();
			}
		} else if (this.isFalling || this.isPlummeting) {
			this.drawCharJumpFwd();
			this.charJumpFrontMovement();
		} else {
			this.drawCharStandFwd();
		}
	}
	drawCharLeft() {
		//legs
		fill(0, 100, 100);
		beginShape();
		vertex(gameChar.xPos - 3, gameChar.yPos + 2);
		vertex(gameChar.xPos - 3, gameChar.yPos - 30);
		vertex(gameChar.xPos + 4, gameChar.yPos - 30);
		vertex(gameChar.xPos + 4, gameChar.yPos);
		endShape();
		//feet
		fill(0);
		ellipse(gameChar.xPos - 1, gameChar.yPos, 11, 5);
		//torso
		fill(200, 100, 100);
		rect(gameChar.xPos - 8, gameChar.yPos - 50, 16, 30, 5);
		//arms
		fill(255, 220, 160);
		rect(gameChar.xPos - 3, gameChar.yPos - 48, 6, 25, 5);
		fill(200, 100, 100);
		rect(gameChar.xPos - 4, gameChar.yPos - 48, 8, 10, 5);
		//head
		fill(255, 218, 185);
		ellipse(gameChar.xPos, gameChar.yPos - 58, 20, 20);
		fill(150);
		ellipse(gameChar.xPos - 4, gameChar.yPos - 60, 5, 5);
		fill(200, 100, 100);
		arc(gameChar.xPos - 6, gameChar.yPos - 54, 5, 5, 0, PI);
		//hat
		fill(80, 80, 80);
		arc(gameChar.xPos, gameChar.yPos - 63, 20, 15, PI, TWO_PI);
	}

	drawCharRight() {
		//legs
		fill(0, 100, 100);
		beginShape();
		vertex(gameChar.xPos - 3, gameChar.yPos + 2);
		vertex(gameChar.xPos - 3, gameChar.yPos - 30);
		vertex(gameChar.xPos + 4, gameChar.yPos - 30);
		vertex(gameChar.xPos + 4, gameChar.yPos);
		endShape();
		//feet
		fill(0);
		ellipse(gameChar.xPos + 2, gameChar.yPos, 11, 5);
		//torso
		fill(200, 100, 100);
		rect(gameChar.xPos - 8, gameChar.yPos - 50, 16, 30, 5);
		//arms
		fill(255, 220, 160);
		rect(gameChar.xPos - 3, gameChar.yPos - 48, 6, 25, 5);
		fill(200, 100, 100);
		rect(gameChar.xPos - 4, gameChar.yPos - 48, 8, 10, 5);
		//head
		fill(255, 218, 185);
		ellipse(gameChar.xPos, gameChar.yPos - 58, 20, 20);
		fill(150);
		ellipse(gameChar.xPos + 4, gameChar.yPos - 60, 5, 5);
		fill(200, 100, 100);
		arc(gameChar.xPos + 6, gameChar.yPos - 54, 5, 5, 0, PI);
		//hat
		fill(80, 80, 80);
		arc(gameChar.xPos, gameChar.yPos - 63, 20, 15, PI, TWO_PI);
	}

	drawCharJumpLeft() {
		//legs
		fill(0, 100, 100);
		beginShape();
		vertex(gameChar.xPos - 3, gameChar.yPos + 2);
		vertex(gameChar.xPos - 3, gameChar.yPos - 30);
		vertex(gameChar.xPos + 4, gameChar.yPos - 30);
		vertex(gameChar.xPos + 4, gameChar.yPos);
		endShape();
		//feet
		fill(0);
		ellipse(gameChar.xPos - 2, gameChar.yPos, 11, 5);
		//torso
		fill(200, 100, 100);
		rect(gameChar.xPos - 8, gameChar.yPos - 50, 16, 30, 5);
		//head
		fill(255, 218, 185);
		ellipse(gameChar.xPos, gameChar.yPos - 58, 20, 20);
		fill(150);
		ellipse(gameChar.xPos - 4, gameChar.yPos - 60, 5, 5);
		fill(200, 100, 100);
		arc(gameChar.xPos - 6, gameChar.yPos - 54, 5, 5, 0, PI);
		//hat
		fill(80, 80, 80);
		arc(gameChar.xPos, gameChar.yPos - 63, 20, 15, PI, TWO_PI);
		//arms
		fill(255, 220, 160);
		rect(gameChar.xPos - 2, gameChar.yPos - 70, 6, 25, 5);
		fill(200, 100, 100);
		rect(gameChar.xPos - 4, gameChar.yPos - 48, 8, 10, 5);
	}

	drawCharJumpRight() {
		//legs
		fill(0, 100, 100);
		beginShape();
		vertex(gameChar.xPos - 3, gameChar.yPos + 2);
		vertex(gameChar.xPos - 3, gameChar.yPos - 30);
		vertex(gameChar.xPos + 4, gameChar.yPos - 30);
		vertex(gameChar.xPos + 4, gameChar.yPos);
		endShape();
		//feet
		fill(0);
		ellipse(gameChar.xPos + 2, gameChar.yPos, 11, 5);
		//torso
		fill(200, 100, 100);
		rect(gameChar.xPos - 8, gameChar.yPos - 50, 16, 30, 5);
		//head
		fill(255, 218, 185);
		ellipse(gameChar.xPos, gameChar.yPos - 58, 20, 20);
		fill(150);
		ellipse(gameChar.xPos + 4, gameChar.yPos - 60, 5, 5);
		fill(200, 100, 100);
		arc(gameChar.xPos + 6, gameChar.yPos - 54, 5, 5, 0, PI);
		//hat
		fill(80, 80, 80);
		arc(gameChar.xPos, gameChar.yPos - 63, 20, 15, PI, TWO_PI);
		//arms
		fill(255, 220, 160);
		rect(gameChar.xPos - 4, gameChar.yPos - 70, 6, 25, 5);
		fill(200, 100, 100);
		rect(gameChar.xPos - 4, gameChar.yPos - 48, 8, 10, 5);
	}

	drawCharJumpFwd() {
		//legs
		fill(0, 100, 100);
		beginShape(); //right leg
		vertex(gameChar.xPos + 14, gameChar.yPos);
		vertex(gameChar.xPos, gameChar.yPos - 30);
		vertex(gameChar.xPos + 7, gameChar.yPos - 30);
		vertex(gameChar.xPos + 20, gameChar.yPos);
		endShape();
		beginShape(); //left leg
		vertex(gameChar.xPos - 14, gameChar.yPos);
		vertex(gameChar.xPos, gameChar.yPos - 30);
		vertex(gameChar.xPos - 7, gameChar.yPos - 30);
		vertex(gameChar.xPos - 20, gameChar.yPos);
		endShape();
		//feet
		fill(0);
		ellipse(gameChar.xPos - 18, gameChar.yPos, 11, 5);
		ellipse(gameChar.xPos + 18, gameChar.yPos, 11, 5);
		//torso
		fill(200, 100, 100);
		rect(gameChar.xPos - 10, gameChar.yPos - 50, 20, 30, 5);
		//arms
		fill(255, 220, 160);
		rect(gameChar.xPos - 14, gameChar.yPos - 70, 6, 25, 5);
		rect(gameChar.xPos + 8, gameChar.yPos - 70, 6, 25, 5);
		fill(200, 100, 100);
		rect(gameChar.xPos - 15, gameChar.yPos - 48, 8, 10, 5);
		rect(gameChar.xPos + 7, gameChar.yPos - 48, 8, 10, 5);
		//head
		fill(255, 218, 185);
		ellipse(gameChar.xPos, gameChar.yPos - 58, 20, 20);
		fill(150);
		ellipse(gameChar.xPos - 4, gameChar.yPos - 60, 5, 5);
		ellipse(gameChar.xPos + 4, gameChar.yPos - 60, 5, 5);
		fill(200, 100, 100);
		arc(gameChar.xPos, gameChar.yPos - 54, 10, 5, 0, PI);
		//hat
		fill(80, 80, 80);
		arc(gameChar.xPos, gameChar.yPos - 63, 20, 15, PI, TWO_PI);
	}

	drawCharStandFwd() {
		//legs
		fill(0, 100, 100);
		beginShape(); //right leg
		vertex(gameChar.xPos + 3, gameChar.yPos + 2);
		vertex(gameChar.xPos + 3, gameChar.yPos - 30);
		vertex(gameChar.xPos + 10, gameChar.yPos - 30);
		vertex(gameChar.xPos + 10, gameChar.yPos);
		endShape();
		beginShape(); //left leg
		vertex(gameChar.xPos - 3, gameChar.yPos + 2);
		vertex(gameChar.xPos - 3, gameChar.yPos - 30);
		vertex(gameChar.xPos - 10, gameChar.yPos - 30);
		vertex(gameChar.xPos - 10, gameChar.yPos);
		endShape();
		//feet
		fill(0);
		ellipse(gameChar.xPos - 7, gameChar.yPos, 11, 5);
		ellipse(gameChar.xPos + 7, gameChar.yPos, 11, 5);
		//torso
		fill(200, 100, 100);
		rect(gameChar.xPos - 10, gameChar.yPos - 50, 20, 30, 5);
		//arms
		fill(255, 220, 160);
		rect(gameChar.xPos - 14, gameChar.yPos - 48, 6, 25, 5);
		rect(gameChar.xPos + 8, gameChar.yPos - 48, 6, 25, 5);
		fill(200, 100, 100);
		rect(gameChar.xPos - 15, gameChar.yPos - 48, 8, 10, 5);
		rect(gameChar.xPos + 7, gameChar.yPos - 48, 8, 10, 5);
		//head
		fill(255, 218, 185);
		ellipse(gameChar.xPos, gameChar.yPos - 58, 20, 20);
		fill(150);
		ellipse(gameChar.xPos - 4, gameChar.yPos - 60, 5, 5);
		ellipse(gameChar.xPos + 4, gameChar.yPos - 60, 5, 5);
		fill(200, 100, 100);
		arc(gameChar.xPos, gameChar.yPos - 54, 10, 5, 0, PI);
		//hat
		fill(80, 80, 80);
		arc(gameChar.xPos, gameChar.yPos - 63, 20, 15, PI, TWO_PI);
	}

	charLeftMovement() {
		//sprint by holding left-shift
		if (
			keyIsDown(16) &&
			gameChar.yPos > floorPos_y - 2 &&
			gameChar.yPos < floorPos_y + 2
		) {
			gameChar.xPos -= gameChar.runSpeed;
		}
		//walk
		else {
			gameChar.xPos -= gameChar.walkSpeed;
		}
	}

	charRightMovement() {
		//sprint by holding left-shift
		if (
			keyIsDown(16) &&
			gameChar.yPos > floorPos_y - 2 &&
			gameChar.yPos < floorPos_y + 2
		) {
			gameChar.xPos += gameChar.runSpeed;
		}
		//walk
		else {
			gameChar.xPos += gameChar.walkSpeed;
		}
	}

	charJumpLeftMovement() {
		gameChar.xPos -= gameChar.walkSpeed;
		gameChar.yPos -= gameChar.jumpSpeed;
	}

	charJumpRightMovement() {
		gameChar.xPos += gameChar.walkSpeed;
		gameChar.yPos -= gameChar.jumpSpeed;
	}

	charJumpFrontMovement() {
		gameChar.yPos -= gameChar.jumpSpeed;
	}
}
