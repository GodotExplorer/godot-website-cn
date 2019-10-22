const shelljs = require("shelljs");
const fs = require("fs");
if (!fs.existsSync("configs/config.release.json")) {
	shelljs.cp("configs/config.debug.json", "configs/config.release.json");
}
shelljs.exec("yarn webpack --config webpack.config.js --env.production");
