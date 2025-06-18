class Snowflake {
	constructor(xPos, yPos) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.size = random(1, 5);
		this.speed = random(0.2, 0.8);
	}

	update() {
		this.yPos += this.speed;
		this.xPos += random(-1, 1);
	}

	draw() {
		noStroke();
		fill(255);
		ellipse(this.xPos, this.yPos, this.size);
	}

	snowAboveCanyon(canyons) {
		//check if the snowflake is currently above any of the canyons
		for (let i = 0; i < canyons.length; i++) {
			let canyon = canyons[i];
			if (
				this.xPos > canyon.xPos &&
				this.xPos < canyon.xPos + canyon.width
			) {
				return true;
			}
		}
	}
}
