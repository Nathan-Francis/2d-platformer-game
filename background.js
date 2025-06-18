class Background {
	constructor() {
		this.fromColorSky = color(0);
		this.toColorSky = color(135, 206, 235);
		this.fromColorGround = color(0, 255, 0);
		this.toColorGround = color(0);

		this.draw = function () {
			this.drawSky(0, 0, width, floorPos_y);
			this.drawGround(0, floorPos_y, width, height - floorPos_y);
		};
	}

	drawSky(xPos, yPos, width, height) {
		//a gradient of colors for better depth
		for (let i = 0; i < height; i++) {
			/*
			the variable interpolate is used to replace the amt parameter 
			of lerpColor method, to interpolate between i and height
			*/
			const interpolate = i / height;
			const colourGradient = lerpColor(
				this.fromColorSky,
				this.toColorSky,
				interpolate
			);

			/*
			iterate 432 horizontal lines between the const colours 'from' 
			and 'to', the number of lines is between 0 and floorPos_y
			*/
			stroke(colourGradient);
			strokeWeight(2);
			line(xPos, yPos + i, width, yPos + i);
			noStroke();
		}
	}

	drawGround(xPos, yPos, width, height) {
		for (let i = 0; i < height; i++) {
			const interpolate = i / height;
			const colourGradient = lerpColor(
				this.fromColorGround,
				this.toColorGround,
				interpolate
			);

			stroke(colourGradient);
			strokeWeight(2);
			line(xPos, yPos + i, width, yPos + i);
			noStroke();
		}
	}
}
