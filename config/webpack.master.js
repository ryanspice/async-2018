

const build = (env,plugins_custom=[]) => {

	const path = require('path');
	const webpack = require('webpack');

	const package = require("../package.json");

	console.log(env);

	/**
	 * Flags
	 */

	const isHashed = true;
	const isLegacy = env.legacy?true:false;

	const fileName = isLegacy?`[name].js`:`[name].legacy.js`;

	const chunkFilename = isLegacy?`module~[name].js`:`module~[name].legacy.js`;
	const chunkFilenameProd = isLegacy?`module~[name].[contenthash].js`:`module~[name].[contenthash].legacy.js`;

	/**
	 * Master Config
	 */

	const bundle = {

		output: {

			filename: fileName,
			library: package.short_name,
			chunkFilename: isHashed?env.production?chunkFilenameProd:chunkFilename:chunkFilename,
			jsonpFunction: 'json'+package.short_name,
			path: path.resolve(`./dist`)

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

			]

		},

		plugins: [

			new webpack.DefinePlugin({
				IE11:!isLegacy,
				'process.env': {
					NODE_ENV: JSON.stringify('development')
				},
			}),

			...plugins_custom

		],

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

		devServer: require('./server.config')

	};

	return bundle;
};

/* export */

module.exports = build;
