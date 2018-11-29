const SpriteImage = require("./SpriteImage");

class SpritePackage {
	constructor(icons) {
		this.sprites = {};
		for (let i = 1; i <= 20; i++) {
			this.sprites[i] = new SpriteImage(icons, 100 * (i - 1), 0, 100, 100);
			this.sprites[i].id = i;
		}
	}

	getSpriteImage(id) {
		return this.sprites[id];
	}
}

module.exports = SpritePackage;
