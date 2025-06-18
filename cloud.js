class Cloud {
	constructor(xPos) {
		//xPos is defined in the for-loop in startGame()
		this.xPos = xPos;
		this.yPos = random(30, 150);
		this.xSize = random(40, 80);
		this.ySize = random(40, 55);
		this.colour = color(150);
	}

	//clouds move to the left, then wrap around and spawn to the right
	update() {
		this.xPos -= 0.5;
		if (this.xPos < -750) {
			this.xPos = width * 4;
		}
	}

	draw() {
		fill(this.colour);
		ellipse(this.xPos, this.yPos, this.xSize + 60, this.ySize);
		ellipse(this.xPos - 40, this.yPos, this.xSize, this.ySize);
		ellipse(this.xPos + 40, this.yPos, this.xSize, this.ySize);
		ellipse(this.xPos, this.yPos - 30, this.xSize + 10, this.ySize);
		ellipse(this.xPos - 30, this.yPos - 10, this.xSize, this.ySize);
		ellipse(this.xPos + 30, this.yPos - 10, this.xSize, this.ySize);
	}
}
