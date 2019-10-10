const shelljs = require('shelljs');
shelljs.exec("yarn webpack --config webpack.config.js --env.production")
shelljs.cd("dist");
shelljs.exec("node server.js --release");
