
const package = require("../package.json");

const webpack = require('webpack');

const WebpackVisualizerPlugin = require("webpack-visualizer-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;


module.exports = [

	new webpack.DefinePlugin({

		'process.env': {

			NODE_ENV: JSON.stringify('production')

		},

	}),
	new WebpackVisualizerPlugin(),
	new BundleAnalyzerPlugin(
		{
			openAnalyzer:false,
			analyzerMode:'static',
			reportFilename:'report.html'
		}
	)

];
