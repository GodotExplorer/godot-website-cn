const shelljs = require("shelljs");
shelljs.exec("yarn webpack --config webpack.config.js --env.production");
shelljs.rm('-rf', "dist/assets");
shelljs.cp('-r', "assets", "dist/assets");
shelljs.cd("dist");
shelljs.exec("node server.js --release");
