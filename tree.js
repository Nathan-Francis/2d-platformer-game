class Tree {
	constructor(xPos, yPos, colourTrunk, colourTop) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.colourTrunk = colourTrunk;
		this.colourTop = colourTop;

		this.draw = function () {
			//tree trunk
			fill(colourTrunk);
			rect(this.xPos - 15, this.yPos - 40, 30, 80);
			//tree top
			fill(colourTop);
			ellipse(this.xPos - 25, this.yPos - 40, 40, 40);
			ellipse(this.xPos, this.yPos - 70, 60, 80);
			ellipse(this.xPos - 25, this.yPos - 60, 40, 40);
			ellipse(this.xPos - 15, this.yPos - 80, 40, 40);
			ellipse(this.xPos - 5, this.yPos - 100, 40, 40);
			ellipse(this.xPos, this.yPos - 110, 40, 40);
			ellipse(this.xPos + 5, this.yPos - 100, 40, 40);
			ellipse(this.xPos + 15, this.yPos - 80, 40, 40);
			ellipse(this.xPos + 25, this.yPos - 60, 40, 40);
			ellipse(this.xPos + 25, this.yPos - 40, 40, 40);
		};
	}
}
