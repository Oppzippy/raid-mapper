const DisplayObject = require("./DisplayObject");

class SpriteObject extends DisplayObject {
	constructor(spriteImage) {
		super();
		this.spriteImage = spriteImage;
	}

	getSpriteImage() {
		return this.spriteImage;
	}

	getBaseWidth() {
		return this.getSpriteImage().getWidth();
	}

	getBaseHeight() {
		return this.getSpriteImage().getHeight();
	}

	getWidth() {
		return this.width || this.getBaseWidth();
	}

	getHeight() {
		return this.height || this.getBaseHeight();
	}

	setSpriteImage(spriteImage) {
		this.spriteImage = spriteImage;
	}

	draw(context) {
		const sprite = this.getSpriteImage();

		context.drawImage(sprite.getImage(),
			sprite.getOffsetX(), sprite.getOffsetY(), // Spritesheet offset
			sprite.getWidth(), sprite.getHeight(), // Spritesheet width and height
			this.getX(), this.getY(), // X and Y position on canvas
			this.getWidth(), this.getHeight()); // Width and height on canvas
	}
}

module.exports = SpriteObject;
