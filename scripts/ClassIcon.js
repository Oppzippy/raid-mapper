class ClassIcon {
	constructor(sprite, name) {
		this.sprite = sprite;
		this.name = name;
		this.size = sprite.getWidth();
		this.backgroundEnabled = true;
		this.x = 0;
		this.y = 0;
	}

	/**
	 * Replaces the sprite that the ClassIcon will display
	 * @param {object} sprite - SpriteObject to replace the current sprite.
	 * Position of the supplied SpriteObject will be updated.
	*/
	setSprite(sprite) {
		this.sprite = sprite;
		this.sprite.x = this.x;
		this.sprite.y = this.y;
	}

	setName(name) {
		this.name = name;
	}

	setSize(size) {
		this.size = size;
		this.sprite.setSize(size, size);
	}

	setX(x) {
		this.x = x;
		this.sprite.x = x;
	}

	setY(y) {
		this.y = y;
		this.sprite.y = y;
	}

	setPosition(x, y) {
		this.setX(x);
		this.setY(y);
	}

	getSprite() {
		return this.sprite;
	}

	getName() {
		return this.name;
	}

	getSize() {
		return this.size;
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	getCenterX() {
		return this.getX() + this.getSize() / 2;
	}

	getCenterY() {
		return this.getY() + this.getSize() / 2;
	}

	getDistance(x, y) {
		const distX = Math.abs(this.getCenterX() - x);
		const distY = Math.abs(this.getCenterY() - y);
		return Math.sqrt(distX * distX + distY * distY);
	}

	isInBounds(x, y) {
		return this.getDistance(x, y) < this.getSize() / 2;
	}

	setBackgroundEnabled(enabled) {
		this.backgroundEnabled = enabled;
	}

	isBackgroundEnabled() {
		return this.backgroundEnabled;
	}

	draw(context) {
		context.save();
		const circleX = this.getCenterX();
		const circleY = this.getCenterY();
		// Draw circle background
		if (this.isBackgroundEnabled()) {
			context.beginPath();
			context.arc(circleX, circleY, this.getSize() / 2, 0, 2 * Math.PI);
			context.fillStyle = "black";
			context.fill();
		}
		// Draw class icon
		this.sprite.draw(context);

		// Draw player name
		context.font = `${this.size / 2}px Arial`;
		context.fillStyle = "white";
		context.textAlign = "center";
		context.fillText(this.name, circleX, this.getY() + this.getSize() * 1.35);

		context.restore();
	}
}

module.exports = ClassIcon;
