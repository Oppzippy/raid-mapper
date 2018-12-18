const pako = require("pako");
const MicroEvent = require("./libs/MicroEvent.js");
const Sprite = require("./SpriteObject");
const ClassIcon = require("./ClassIcon");

class State {
	constructor(canvas, spritePackage) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		this.spritePackage = spritePackage;
		this.icons = [];
		this.dragSelection = null;
		this.selection = null;
		this.prevFrameTime = 0;
		MicroEvent.mixin(this);
		const state = this;

		// Desktop
		canvas.addEventListener("mousedown", (e) => {
			if (e.button === 0) { // Left click
				state.dragSelection = state.getSelection(e.offsetX, e.offsetY);
				this.trigger("move-start", state.dragSelection);
			}
		});

		canvas.addEventListener("mouseup", (e) => {
			const dragSelection = state.dragSelection;
			if (e.button === 0 && state.dragSelection) { // Left click
				const halfSize = dragSelection.getSize() / 2;
				dragSelection.setPosition(e.offsetX - halfSize, e.offsetY - halfSize);
				state.dragSelection = null;
				this.changed = true;
				this.trigger("move-stop", dragSelection);
			} else if (e.button === 2) { // Right click
				state.selection = state.getSelection(e.offsetX, e.offsetY);
				this.changed = true;
				state.setSelection(state.selection);
			}
		});

		canvas.addEventListener("mousemove", (e) => {
			const dragSelection = state.dragSelection;
			if (dragSelection !== null) {
				const halfSize = dragSelection.getSize() / 2;
				dragSelection.setPosition(e.offsetX - halfSize, e.offsetY - halfSize);
				this.changed = true;
			}
		});
		// Mobile
		canvas.addEventListener("touchstart", (e) => {
			const x = e.touches[0].clientX - e.target.offsetLeft;
			const y = e.touches[0].clientY - e.target.offsetTop;

			state.dragSelection = state.getSelection(x, y);
			state.setSelection(state.dragSelection);
			this.changed = true;
			this.trigger("move-start", state.dragSelection);
		});

		canvas.addEventListener("touchend", (e) => {
			if (state.dragSelection) {
				state.dragSelection = null;
				e.preventDefault();
				this.changed = true;
			}
		});

		canvas.addEventListener("touchmove", (e) => {
			const dragSelection = state.dragSelection;
			if (dragSelection !== null) {
				const x = e.touches[0].clientX - e.target.offsetLeft;
				const y = e.touches[0].clientY - e.target.offsetTop;
				const halfSize = dragSelection.getSize() / 2;
				dragSelection.setPosition(x - halfSize, y - halfSize);
				this.changed = true;
				e.preventDefault();
			}
		});
	}

	setSelection(selection) {
		this.selection = selection;
		this.trigger("select", selection);
	}

	getSelection(x, y) {
		let closest = null;
		let closestDistance = null;
		this.icons.forEach((object) => {
			if (object.isInBounds(x, y)) {
				const distance = object.getDistance(x, y);

				if (closest == null || distance <= closestDistance) {
					closestDistance = distance;
					closest = object;
				}
			}
		});

		return closest;
	}

	draw() {
		if (!this.changed) {
			return;
		}
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		if (this.map.complete) {
			this.context.drawImage(this.map, 0, 0);
		}
		const state = this;
		this.icons.forEach((icon) => {
			if (icon === state.selection) {
				state.drawSelectionCircle(icon);
			}
			icon.draw(this.context);
		});

		// FPS counter
		const time = window.performance.now();
		const fps = 1 / ((time - this.prevFrameTime) / 1000);
		this.prevFrameTime = time;
		this.context.font = "16px Arial";
		this.context.fillStyle = "white";
		this.context.textAlign = "left";
		this.context.fillText(Math.round(fps), 50, 50);
		this.changed = false;
	}

	drawSelectionCircle(icon) {
		this.context.save();

		const x = icon.getCenterX();
		const y = icon.getCenterY();
		const radius = icon.getSize() / 2;

		const gradient = this.context.createRadialGradient(x, y, radius * 0.9, x, y, radius * 1.4);
		gradient.addColorStop(0, "rgba(255, 0, 0, 1)");
		gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

		this.context.fillStyle = gradient;
		this.context.fillRect(x - radius * 2, y - radius * 2, radius * 4, radius * 4);

		this.context.restore();
	}

	setMap(image) {
		if (this.mapCallback && this.map) {
			this.map.removeEventListener("load", this.mapCallback);
			this.mapCallback = null;
		}
		this.map = image;
		this.mapCallback = () => {
			this.refreshSize();
			this.changed = true;
		};
		image.addEventListener("load", this.mapCallback);
		this.refreshSize();
	}

	getMap() {
		return this.map;
	}

	addIcon(icon) {
		this.icons.push(icon);
	}

	removeIcon(icon) {
		const index = this.icons.indexOf(icon);

		if (icon !== -1) {
			this.icons.splice(index, 1);
			return true;
		}
		return false;
	}

	refreshSize() {
		this.canvas.width = this.getMap().width;
		this.canvas.height = this.getMap().height;
		this.changed = true;
	}

	exportPNG() {
		const selection = this.selection;
		this.selection = null;
		this.changed = true;
		this.draw();
		const url = this.canvas.toDataURL("image/png");
		this.selection = selection;
		this.changed = true;
		this.draw();
		return url;
	}

	exportJSON() {
		const icons = [];

		this.icons.forEach((icon) => {
			icons.push({
				sprite: icon.getSprite().getSpriteImage().id,
				size: icon.getSize(),
				name: icon.getName(),
				x: icon.getX(),
				y: icon.getY(),
				backgroundEnabled: icon.isBackgroundEnabled(),
			});
		});

		const maps = this.getMap().src.match(/([A-Za-z0-9_]+)\.png$/);
		if (maps) {
			return {
				icons: icons,
				map: maps[1],
			};
		}
		return null;
	}

	exportString() {
		const json = this.exportJSON();
		const jsonStr = JSON.stringify(json);
		const compressed = pako.deflate(jsonStr, { to: "string" });
		return btoa(compressed);
	}

	importJSON(json) {
		const icons = [];
		const self = this;
		json.icons.forEach((icon) => {
			const spriteImage = self.spritePackage.getSpriteImage(icon.sprite);
			if (spriteImage) {
				const sprite = new Sprite(spriteImage);
				const ico = new ClassIcon(sprite, icon.name);
				ico.setPosition(icon.x, icon.y);
				ico.setSize(icon.size);
				ico.setBackgroundEnabled(icon.backgroundEnabled);
				icons.push(ico);
			}
		});
		const map = json.map.match(/^([A-Za-z0-9_]+)$/)[1];
		this.getMap().src = `maps/${map}.png`;
		this.trigger("map-change", map);
		this.icons = icons;
	}

	importString(string) {
		const decompressed = pako.inflate(atob(string), { to: "string" });
		this.importJSON(JSON.parse(decompressed));
	}
}

module.exports = State;
