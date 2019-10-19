const shelljs = require("shelljs");
shelljs.exec("yarn webpack --config webpack.config.js");
shelljs.mkdir('-p', "dist/thirdpart/css")
shelljs.cp('-r',"node_modules/antd/dist/antd.css", "dist/thirdpart/css/antd.css");
shelljs.rm('-rf', "dist/assets");
shelljs.cp('-r', "assets", "dist/assets");

shelljs.cd("dist");
shelljs.exec("node server.js --debug");
