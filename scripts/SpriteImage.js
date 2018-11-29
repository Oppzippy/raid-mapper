class SpriteImage {
	constructor(image, xOffset, yOffset, width, height) {
		this.image = image;
		this.xOffset = xOffset;
		this.yOffset = yOffset;
		this.width = width;
		this.height = height;
	}

	getImage() {
		return this.image;
	}

	getOffsetX() {
		return this.xOffset;
	}

	getOffsetY() {
		return this.yOffset;
	}

	getWidth() {
		return this.width;
	}

	getHeight() {
		return this.height;
	}
}

module.exports = SpriteImage;
