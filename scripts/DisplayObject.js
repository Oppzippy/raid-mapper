class DisplayObject {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
	}

	setX(x) {
		this.x = x;
	}

	setY(y) {
		this.y = y;
	}

	setPosition(x, y) {
		this.x = x;
		this.y = y;
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	setWidth(width) {
		this.width = width;
	}

	setHeight(height) {
		this.height = height;
	}

	setSize(width, height) {
		this.width = width;
		this.height = height;
	}

	getWidth() {
		return this.width;
	}

	getHeight() {
		return this.height;
	}
}

module.exports = DisplayObject;
