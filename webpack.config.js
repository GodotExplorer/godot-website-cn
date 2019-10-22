const path = require('path');
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
		output: {
			path: path.join(workSpaceDir, 'dist/js'),
			filename: env.production ? 'bundle.min.js': 'bundle.js'
		},
		module: {
			rules: [
				{test:/\.css$/,use:["style-loader","css-loader"]},
				{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },

			]
		},
		resolve: {
			extensions: [ '.tsx', '.ts', '.js' ],
			plugins: [
				new TsconfigPathsPlugin({configFile: path.join(workSpaceDir, 'tsconfig.json')})
			],
			alias: { config: path.join(__dirname, "configs/config." + (env.production ? "release": "debug") + ".json") }
		},
		devtool: env.production ? "" : "source-map",
		mode: env.production ? "production" : "development",
		externals: env.production ? externals : {},
	});
};
