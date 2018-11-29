class Settings {
	constructor() {
		this.settings = {};
		this.listeners = {};
	}

	add(id, key) {
		this.settings[key || id] = document.getElementById(id);
	}

	getValue(key) {
		const input = this.settings[key];
		if (typeof (input) !== "object") return null;

		if (input.nodeName === "SELECT") {
			return input.options[input.selectedIndex].value;
		}
		if (input.nodeName === "INPUT" && input.type === "checkbox") {
			return input.checked;
		}
		return input.value;
	}

	setValue(key, value) {
		const input = this.settings[key];
		if (typeof (input) !== "object") return null;

		if (input.nodeName === "SELECT") {
			const options = input.options;
			for (let i = 0; i < options.length; i++) {
				if (options[i].value === value.toString()) {
					input.selectedIndex = i;
					return true;
				}
			}
			return false;
		}
		if (input.nodeName === "INPUT" && input.type === "checkbox") {
			input.checked = value;
			return true;
		}
		input.value = value;
		return true;
	}

	buildListenerTable(key) {
		if (this.listeners[key] == null) {
			this.listeners[key] = {};
		}
	}

	setAction(key, event, func) {
		const input = this.settings[key];
		if (input && typeof (func) === "function" && typeof (event) === "string") {
			this.buildListenerTable(key);
			const prevFunc = this.listeners[key][event];
			if (prevFunc) {
				input.removeEventListener(event, prevFunc);
				this.listeners[key] = null;
			}
			const self = this;
			const listener = function() {
				func.call(self);
			};
			input.addEventListener(event, listener);
			this.listeners[key] = input;
		}
	}

	removeAction(key, func, event) {
		const input = this.settings[key];
		if (input && typeof (func) === "function" && typeof (event) === "string") {
			const listeners = this.listeners[key];
			if (listeners && listeners[event]) {
				input.removeEventListener(event, listeners[event]);
				listeners[event] = null;
			}
		}
	}

	setShown(key, shown) {
		const input = this.settings[key];
		if (input) {
			if (shown) {
				input.style.display = "inline";
			} else {
				input.style.display = "none";
			}
		}
	}
}

module.exports = Settings;
