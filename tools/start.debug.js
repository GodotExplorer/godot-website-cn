const shelljs = require('shelljs');
shelljs.exec("yarn webpack --config webpack.config.js")
shelljs.cd("dist");
shelljs.exec("node server.js --debug");
