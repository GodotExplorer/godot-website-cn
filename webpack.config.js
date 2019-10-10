const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const workSpaceDir = path.resolve(__dirname);

module.exports = (env) => {
	if (!env) { env = {production: false};}
	console.log("Compile config:", env);
	return ({
		entry: path.join(workSpaceDir, 'src/index.tsx'),
		output: {
			path: path.join(workSpaceDir, 'dist/js'),
			filename: env.production ? 'bundle.min.js': 'bundle.js'
		},
		module: {
			rules: [
				{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }
			]
		},
		resolve: {
			extensions: [ '.tsx', '.ts', '.js' ],
			plugins: [
				new TsconfigPathsPlugin({configFile: path.join(workSpaceDir, 'tsconfig.json')})
			]
		},
		devtool: env.production ? "" : "source-map",
		mode: env.production ? "production" : "development",
	});
};
