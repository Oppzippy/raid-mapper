const FileSaver = require("file-saver");
const Settings = require("./Settings");
const SpritePackage = require("./SpritePackage");
const State = require("./State");
const SpriteObject = require("./SpriteObject");
const ClassIcon = require("./ClassIcon");

document.addEventListener("DOMContentLoaded", () => {
	const canvas = document.getElementById("canvas");
	const icons = document.getElementById("icons");
	const settings = new Settings();

	const spritePackage = new SpritePackage(icons);

	const state = new State(canvas, spritePackage);
	state.setMap(document.getElementById("map"));

	setInterval(() => {
		state.draw();
	}, 1 / 60 * 1000);

	settings.add("create"); // Create icon
	settings.add("update"); // Update icon
	settings.add("delete"); // Delete icon
	settings.add("clear"); // Clear all icons
	settings.add("name"); // Icon name
	settings.add("icon"); // Icon sprite
	settings.add("icon-size"); // Icon size
	settings.add("export"); // Export link
	settings.add("export-image"); // Export as image
	settings.add("export-file");
	settings.add("map-select", "map"); // Map to use as a background
	settings.add("locale"); // Locale select
	settings.add("enable-background");

	settings.setAction("create", "click", function() {
		const spriteId = parseInt(this.getValue("icon"), 10);
		const sprite = new SpriteObject(spritePackage.getSpriteImage(spriteId));
		const icon = new ClassIcon(sprite, this.getValue("name"));
		icon.setSize(this.getValue("icon-size"));
		icon.setBackgroundEnabled(this.getValue("enable-background"));
		state.addIcon(icon);
		settings.setValue("name", "");
		state.changed = true;
	});

	settings.setAction("update", "click", function() {
		if (state.selection) {
			state.selection.setName(this.getValue("name"));
			const spriteId = parseInt(this.getValue("icon"), 10);
			const newSprite = spritePackage.getSpriteImage(spriteId);
			state.selection.getSprite().setSpriteImage(newSprite);
			state.selection.setSize(this.getValue("icon-size"));
			state.selection.setBackgroundEnabled(this.getValue("enable-background"));
			state.changed = true;
		}
	});

	settings.setAction("delete", "click", function() {
		if (state.selection) {
			state.removeIcon(state.selection);
			state.setSelection(null);
			state.changed = true;
		}
	});

	window.addEventListener("keydown", (e) => {
		if (e.keyCode === 46 && state.selection) {
			state.removeIcon(state.selection);
			state.setSelection(null);
			state.changed = true;
		}
	});

	settings.setAction("clear", "click", function() {
		state.icons = [];
		state.setSelection(null);
		state.changed = true;
	});

	settings.setAction("map", "change", function() {
		const map = state.getMap();
		const url = this.getValue("map");
		map.src = `maps/${url}.png`;
		state.changed = true;
	});

	state.bind("map-change", (map) => {
		settings.setValue("map", map);
	});

	function getStrippedURL() {
		return window.location.href.replace(/#[A-Za-z0-9+/=]+/g, "");
	}

	settings.setAction("locale", "change", function() {
		let url = getStrippedURL();
		const locale = this.getValue("locale");
		if (url.match(/\?locale=/)) {
			url = url.replace(/\?locale=\w+/, `?locale=${locale}`);
		} else {
			url += `?locale=${locale}`;
		}
		window.location = `${url}#${state.exportString()}`;
	});

	state.bind("select", (selection) => {
		if (selection) {
			settings.setShown("update", true);
			settings.setShown("delete", true);

			settings.setValue("name", selection.getName());
			settings.setValue("icon", selection.getSprite().getSpriteImage().id);
			settings.setValue("icon-size", selection.getSize());
			settings.setValue("enable-background", selection.isBackgroundEnabled());
		} else {
			settings.setShown("update", false);
			settings.setShown("delete", false);
			settings.setValue("name", "");
		}
	});

	settings.setAction("export", "click", function() {
		prompt("Export URL", `${getStrippedURL()}#${state.exportString()}`);
	});

	settings.setAction("export-image", "click", function() {
		const png = state.exportPNG();
		const w = window.open("about:blank", "Raid Map");
		w.document.write(`<img src="${png}">`);
	});

	settings.setAction("export-file", "click", function() {
		const png = state.exportPNG();
		FileSaver.saveAs(png, "raidmap.png");
	});

	function importFromHash() {
		const matches = window.location.href.match(/#[A-Za-z0-9+/=]+/g);
		if (matches) {
			matches.forEach((match) => {
				state.importString(match.substring(1));
			});
		}
	}

	window.addEventListener("hashchange", () => {
		importFromHash();
		state.setSelection(null);
	});

	window.addEventListener("load", () => {
		importFromHash();
		state.setSelection(null);
	});
});
