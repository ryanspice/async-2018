
const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.config.js');
//const plugins = require('./webpack.prod.plugins.js');

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const production = {
	// mode: 'production',
	// devtool: 'source-map',
	// stats: {
	// 	colors: true,
	// 	hash: true,
	// 	timings: true,
	// 	assets: true,
	// 	chunks: true,
	// 	chunkModules: true,
	// 	modules: true,
	// 	children: true,
	// },
	// plugins: [
	//
	// 	//new webpack.NamedModulesPlugin(),
	//
	// 	new webpack.optimize.ModuleConcatenationPlugin(),
	//
	// 	new webpack.optimize.OccurrenceOrderPlugin(true),
	// 	...plugins
	// ],
	optimization: {

		minimizer: [

			new OptimizeCSSAssetsPlugin({
				assetNameRegExp: /\.optimize\.css$/g,
				cssProcessor: require('cssnano'),
				cssProcessorPluginOptions: {
					preset: ['default', {
						discardComments: {
							removeAll: true
						}
					}],
				},
				canPrint: true
			})

		]
	}

}

module.exports = env => {
	return [
		merge(common[0](env), production),
		//merge(common[1](env), production),
		//merge(common[2](env), production)
	]
};
