const webpack = require('webpack');
const path = require('path');
const log = require('loglevel');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

log.setLevel('info');

let build = env => {


	if (!env)
		env = { NODE_ENV: "development", production: "false" };

	const type = env.NODE_ENV;

	if (type == "production") {
		env.production = true;
	}

	log.info('NODE_ENV: ', type);

	const bundle = {
		mode: 'development',
		entry: {
			es: './src/index.js'
		},

		devtool: 'eval-source-maps',
		output: {
			filename: type != "legacy" ? "async-template.js" : "async-template.legacy.js",
			chunkFilename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
			jsonpFunction: 'webpackJsonp' + Date.now(),
			library: 'async.2018',
			libraryTarget: 'umd',
			umdNamedDefine: true
		},
		resolve: {
			extensions: ['.js', '.scss', '.css'],
			plugins: [],
			modules: [
				'./src',
				'node_modules'
			]
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							"presets": [
								"@babel/preset-flow",
								[
									"@babel/preset-env",
									{
										"modules": false,
										"useBuiltIns": false,
										"shippedProposals": true,
										"targets": {
											"browsers": type != "legacy" ? "cover 20% in CA" : "cover 97% in CA"
										},
										"loose": true
									}
								]],
							"plugins": [
								["@babel/plugin-proposal-decorators", {
									"legacy": true
								}],
								"@babel/plugin-proposal-function-sent",
								"@babel/plugin-proposal-export-namespace-from",
								"@babel/plugin-proposal-export-default-from",
								"@babel/plugin-proposal-numeric-separator",
								"@babel/plugin-proposal-throw-expressions",
								"@babel/plugin-syntax-dynamic-import",
								"@babel/plugin-syntax-import-meta",
								"@babel/plugin-syntax-flow",
								["@babel/plugin-proposal-class-properties", {
									"loose": false
								}],
								"@babel/plugin-proposal-json-strings",
								["@babel/plugin-transform-runtime"],
								"@babel/plugin-transform-flow-strip-types"]
						}
					},
					include: [path.resolve('src'), path.resolve('test'), path.resolve('node_modules/webpack-dev-server/client')]
				},
				{
					test: /bootstrap\.native/,
					use: {
						loader: 'bootstrap.native-loader'
					}
				},
				{
					test: /\.scss$/,
					use: [{
						loader: "style-loader" // creates style nodes from JS strings
					}, {
						loader: "css-loader" // translates CSS into CommonJS
						, options: { url: false }
					}, {
						loader: "sass-loader" // compiles Sass to CSS
					}]
				},
				{
					test: /\.(eot|svg|ttf|woff|woff2)$/,
					use: [{ loader: 'file?name=public/fonts/[name].[ext]' }]
				}
			]
		},
		node: {
			// prevent webpack from injecting useless setImmediate polyfill because Vue
			// source contains it (although only uses it if it's native).
			setImmediate: false,
			// prevent webpack from injecting mocks to Node native modules
			// that does not make sense for the client
			dgram: 'empty',
			fs: 'empty',
			net: 'empty',
			tls: 'empty',
			child_process: 'empty'
		},
		plugins: [
			new FriendlyErrorsWebpackPlugin({
				compilationSuccessInfo: {
					messages: ['You application is running here http://localhost:8080'],
					notes: ['Here be Dragons']
				},
				onErrors: function (severity, errors) {
					// You can listen to errors transformed and prioritized by the plugin
					// severity can be 'error' or 'warning'
				},
				// should the console be cleared between each compilation?
				// default is true
				clearConsole: false,

				// add formatters and transformers (see below)
				additionalFormatters: [],
				additionalTransformers: []
			}),
			new MiniCssExtractPlugin({

				filename: "[name].css",

				chunkFilename: "[id].css"

			}),
			new CopyWebpackPlugin([
				{
					from: './src/core/def/index-dist.js',
					to: './index.js'
				},
				//{ from: './src/assets', to:'./assets/' }
			]),
			new webpack.NamedModulesPlugin(),
			new webpack.optimize.OccurrenceOrderPlugin(true),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production')
				},
			})

		],
		devServer: {
			contentBase: './dist',
			hot: false,
			inline: true,
			compress: false,
			stats: {
				assets: true,
				children: false,
				chunks: false,
				hash: false,
				modules: false,
				publicPath: false,
				timings: true,
				version: false,
				warnings: true,
				colors: {
					green: '\u001B[36m',
				}
			}
		}
	}

	 type != "legacy" ?bundle.plugins.push(new DashboardPlugin()):null;

	return bundle
};

let processA = evt => {
	let temp = build(evt);

	temp.output.filename = "async-template.js";
	temp.output.library = "async-template-library";
	return temp;
}

let processB = evt => {
	evt.NODE_ENV = 'legacy';
	let temp = build(evt);
	temp.output.library = "async-template-legacy-library";
	return temp;
}

module.exports = [
	processA,
	processB
];
