const fs = require("fs");
const browserify = require("browserify");
const exorcist = require("exorcist");

browserify("./scripts/Main.js", { debug: true })
	.transform("babelify", {
		presets: ["@babel/preset-env"],
		comments: false,
		inputSourceMap: true,
		sourceMaps: "both",
	})
	.bundle()
	.pipe(exorcist("./public/scripts/bundle.min.js.map"))
	.pipe(fs.createWriteStream("./public/scripts/bundle.min.js", "utf8"));
