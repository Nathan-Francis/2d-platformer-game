class Mountain {
	constructor(xPos, yPos, colour) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.colour = colour;
		this.points = [];

		this.setup = function () {
			//left side
			this.points.push(createVector(this.xPos, this.yPos));
			this.points.push(createVector(this.xPos + 30, this.yPos - 82));
			this.points.push(createVector(this.xPos + 60, this.yPos - 122));
			this.points.push(createVector(this.xPos + 80, this.yPos - 142));
			//peak
			this.points.push(createVector(this.xPos + 100, this.yPos - 152));
			//right side
			this.points.push(createVector(this.xPos + 120, this.yPos - 142));
			this.points.push(createVector(this.xPos + 140, this.yPos - 122));
			this.points.push(createVector(this.xPos + 170, this.yPos - 82));
			this.points.push(createVector(this.xPos + 200, this.yPos));
			//duplicated last point to fix an overhanging vertex
			this.points.push(createVector(this.xPos + 200, this.yPos));
		};

		this.draw = function () {
			beginShape();
			fill(colour);
			//first point
			curveVertex(this.points[0].xPos, this.points[0].yPos);

			for (let i = 0; i < this.points.length; i++) {
				let v = this.points[i];
				curveVertex(v.xPos, v.yPos);
			}

			//last point
			curveVertex(
				this.points[this.points.length - 1].xPos,
				this.points[this.points.length - 1].yPos
			);
			endShape(CLOSE);
		};

		this.setup();
	}
}
