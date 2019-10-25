const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const workSpaceDir = path.resolve(__dirname);

/** 使用 CDN 的第三方库 */
const externals = {
	react: 'React',
	antd: 'antd',
	marked: 'marked',
	'react-dom': 'ReactDOM',
	'react-router-dom': 'ReactRouterDOM',
	axios: "axios",
}

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
				{test:/\.css$/,use:["style-loader","css-loader"]},
				{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
				{ test: /\.styl$/, use: ['style-loader', 'css-loader', 'stylus-loader'] },
				{ test:/\.(md|txt)$/, use: "raw-loader" },
				{ test:/\.ya?ml$/, use: [ "json-loader", "yaml-loader" ] }
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'dist/index.debug.html'
			}),
			new webpack.HotModuleReplacementPlugin()
		],
		resolve: {
			extensions: [ '.tsx', '.ts', '.js', 'yaml' ],
			plugins: [
				new TsconfigPathsPlugin({configFile: path.join(workSpaceDir, 'tsconfig.json')})
			],
			alias: { config: path.join(__dirname, "configs/config." + (env.production ? "release": "debug") + ".yaml") }
		},
		devtool: env.production ? "" : "source-map",
		mode: env.production ? "production" : "development",
		externals: env.production ? externals : {},
	});
};
