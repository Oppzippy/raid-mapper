const fs = require("fs");
const browserify = require("browserify");
const exorcist = require("exorcist");

browserify("./scripts/Main.js", { debug: true })
	.transform("babelify", {
		presets: [["@babel/preset-env", {
			targets: "> 10%",
		}], ["minify", {
			builtIns: false,
		}]],
		comments: false,
		inputSourceMap: true,
		global: true,
		sourceMaps: "inline",
	})
	.bundle()
	.pipe(exorcist("./public/scripts/bundle.min.js.map"))
	.pipe(fs.createWriteStream("./public/scripts/bundle.min.js", "utf8"));
