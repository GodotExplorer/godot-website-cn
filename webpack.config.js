const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const workSpaceDir = path.resolve(__dirname);

module.exports = (env) => {
	if (!env) { env = {production: false};}
	console.log("Compile config:", env);
	return ({
		entry: path.join(workSpaceDir, 'src/index.tsx'),
		devServer:{
			port: 3030,
			open: true,
			historyApiFallback: true
		},
		output: {
			path: path.join(workSpaceDir, 'dist/js'),
			filename: env.production ? 'bundle.min.js': 'bundle.js'
		},
		module: {
			rules: [
				{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
				{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
				{ test: /\.styl$/, use: ['style-loader', 'css-loader', 'stylus-loader'] }
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'dist/index.debug.html'
			}),
			new webpack.HotModuleReplacementPlugin()
		],
		resolve: {
			extensions: [ '.tsx', '.ts', '.js' ],
			plugins: [
				new TsconfigPathsPlugin({configFile: path.join(workSpaceDir, 'tsconfig.json')}),
			]
		},
		devtool: env.production ? "" : "source-map",
		mode: env.production ? "production" : "development",
	});
};
