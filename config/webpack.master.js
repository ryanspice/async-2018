
/**
* MASTER WEBPACK
*/

const path = require('path');
const glob = require('glob-all');
const webpack = require('webpack');


const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

const devServer = require('./server.config');
const package = require("../package.json");


//const plugins = require('./webpack.master.plugins');

//let utils = require("./webpack.utils");

/**
 * generic 'master' webpack config
 * @param  {[type]} env                 [description]
 * @param  {Array}  [plugins_custom=[]] [description]
 * @return {[type]}                     [description]
 */

const build = (env,plugins_custom=[]) => {

	// DEV CHECK TODO: remove oneya

	if (!env) {

		env = {
			NODE_ENV: "development",
			production: "false"

		};
	}

	const type = env.NODE_ENV;

	if (type == "production") {
		env.production = true;
	}

	/**
	 * Flags
	 */

	const isHashed = true;
	const isLegacy = type!=="legacy"?true:false;

	const fileName = isLegacy?`[name].js`:`[name].legacy.js`;

	const chunkFilename = isLegacy?`module~[name].js`:`module~[name].legacy.js`;
	const chunkFilenameProd = isLegacy?`module~[name].[contenthash].js`:`module~[name].[contenthash].legacy.js`;

	/**
	 * Master Config
	 */

	const bundle = {

		mode: 'development',

		devtool: 'inline-source-map',

		externals:[

		],

		output: {

			filename: fileName,
			library: package.short_name,
			libraryTarget: 'umd',
			chunkFilename: isHashed?env.production?chunkFilenameProd:chunkFilename:chunkFilename,
			umdNamedDefine: true,
			jsonpFunction: 'json'+package.short_name,
			path: path.resolve(`./dist`),
    	globalObject: 'window'

		},

		resolve: {

			extensions: ['.html','.json','.ts','.tsx', '.js', '.scss', '.css'],

			plugins: [],

			modules: [
				'./src',
				'node_modules'
			],

			alias: { }

		},

		module: {

			rules: [

				/*
				 * CSS/SCSS Support
				 */

				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						 'style-loader',//: MiniCssExtractPlugin.loader,
						'css-loader',
						//'postcss-loader',
						'sass-loader',
					]
				},

				/*
				 * FONT Support
				 */

				{
					test: /\.(eot|svg|ttf|woff|woff2)$/,
					use: [{
						loader: 'file?name=public/fonts/[name].[ext]'
					}]
				},

				/*
				 * JSON
				 */

				{
					test: /\.json$/i,
					loader: 'json-loader',
					type: 'javascript/auto'
				},

				/*
				 * HTML Support
				 */

				{
					test: /\.html$/,
					loader: 'html-loader'
				},

				/*
				 *	JS + Flowtype Support
				 */

				{

					test: /\.js?$/,

					exclude:[
						path.resolve('./node_modules'),
						path.resolve('../async.2018/node_modules'),
						path.resolve('../async-2018/node_modules')
					],

					use: {

						loader: "babel-loader?cacheDirectory",

						options: {

							"sourceType": "module",

							"presets": [

								[

									"@babel/preset-env", {

										"modules": 'umd',

										"useBuiltIns": false,

										"shippedProposals": true,

										"targets": {

											"browsers": type != "legacy" ? "last 1 year, cover 20% in CA, not ie<=11" : "cover 97% in CA, not ie<11"

											//	,"esmodules":type != "legacy"?true:false // This seems to create a larger bundle???

										},

										//"loose": true

									}

								],

								"@babel/flow",

								["minify", {
									  builtIns: false,
									  evaluate: false,
									  mangle: false,
									}]
								],

							"plugins": [

								/* doesn work with babael 7 :()

								[
									"flow-runtime", {
								    "assert": true,
								    "annotate": true
								  }
								],

								*/

								[
									"@babel/plugin-transform-runtime",
									{
										"absoluteRuntime": true,
										"corejs": false,
										"helpers": true,
										"regenerator": true,
										"useESModules": true
									}
								],
								"@babel/plugin-proposal-optional-chaining",
								["@babel/plugin-proposal-decorators", {
									"legacy": true
								}],
								"@babel/plugin-proposal-function-sent",
								"@babel/plugin-proposal-export-namespace-from",
								["@babel/plugin-proposal-object-rest-spread",{"useBuiltIns":true}],
								"@babel/plugin-proposal-export-default-from",
								"@babel/plugin-proposal-numeric-separator",
								"@babel/plugin-proposal-throw-expressions",
								"@babel/plugin-syntax-dynamic-import",
								"@babel/plugin-syntax-import-meta",
								"@babel/plugin-syntax-flow",
								[
									"@babel/plugin-proposal-class-properties", {
										//"loose": false,
										"ignoreUninitialized":	true
									}
								],
								"@babel/plugin-proposal-json-strings",
							]

						}

					},

					include: [
						path.resolve('src'),
						path.resolve('test'),
						path.resolve('../async.2018/'), // investigate externals issue???
						path.resolve('async.2018/src'),
						path.resolve('async.2018')
					]

				}

			]

		},

		plugins: [

			new webpack.DefinePlugin({
				IE11:!isLegacy,
				'process.env': {
					NODE_ENV: JSON.stringify('development')
				},
			}),

			new DuplicatePackageCheckerPlugin({
				verbose: true,
				strict: true
			}),
	//		...plugins,
			...plugins_custom

		],

		node: {

			setImmediate: false,
			dgram: 'empty',
			fs: 'empty',
			net: 'empty',
			tls: 'empty',
			child_process: 'empty',
			global:false,
			process:false,
			buffer:false

		},

		performance: {

			hints:env.production?false:'warning',
			maxEntrypointSize: true?1560000:560000,
			maxAssetSize: true?1500000:500000

		},

		optimization: {

	    moduleIds: 'named',

			runtimeChunk: {
	      name: entrypoint => `${entrypoint.name}.entry`
	    },

			usedExports: true,

		},

		devServer: devServer

	};

	/**
	 * legacy
	 */

	if (type != "legacy"){

		const FlowWebpackPlugin = require('flow-webpack-plugin');

		bundle.plugins.push(new FlowWebpackPlugin({
			failOnError: false,
			failOnErrorWatch: false,
			reportingSeverity: 'warning',
			printFlowOutput: false,
			flowPath: require.main.require('flow-bin'),
			flowArgs: ['--color=always', '--include-warnings'],
			verbose: false,
			callback: (...args) => {

				return true;
			}
		}));

		let scripts = (require('./script.files'))();


		bundle.plugins.push(

			new HtmlWebpackPlugin({

				//required

				inject: false,
				template: ('./src/index.ejs'),

				//html

				headHtmlSnippet: `

					<link rel="manifest" href="manifest.json">
					<style>

						html {
							background:#252525;
    					height: 100%;
						}

						body {
							background:transparent;
							display:inline-block;
							width:100%;
							height:100%;
							margin:0px;
						}

						.spinner {
							position: absolute;
							left: 50%;
							top: 35%;
							margin: 0px auto;
							margin-left: -25px;
							width: 50px;
						}

						watermark {
							position: fixed;
							bottom: 5px;
							right: 5px;
							opacity: 0.5;
							z-index: 99;
							color: rgba(25, 25, 25, 0.75);
						}

						loader {
							width: 100%;
							height: 100%;
							position: fixed;
							left: 0px;
							top: 0px;
							z-index: 10;
							text-align: center;
						}

					</style>
				`,
				bodyHtmlSnippet:`
					<loader>

						<img class="spinner" src="https://loading.io/spinners/eclipse/lg.ring-loading-gif.gif" />
						<message></message>

					</loader>
				`,
				//

				fileName: `index.html`,
				baseHref: `./`,
				title: package.name,
				cache: true,
				minify: true,

				//

				scripts: scripts[0] || [],
				inlineManifestWebpackName: package.short_name + 'Manifest',
				inlineSource: '.(js|css)',

				//

				meta:{
					'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
					'theme-color': '#252525'
				}

			}
		));


		//Manifest

		bundle.plugins.push(new ManifestPlugin({

			fileName: `manifest.json`,

			seed: Object.assign({
				"short_name": package.short_name,
				"name": package.name,
				"start_url": ``,
				"background_color": "#3367D6",
				"display": "standalone",
				"orientation": "landscape",
				"scope": "/",
				"theme_color": "#3367D6",

			},scripts[1]),

			map: (file) => {

				file.name = file.name.replace(/\./g, '');
				return file;
			}

		}));


	};

	return bundle;
};

/* export */

module.exports = build;
