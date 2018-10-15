const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ClosureCompilerPlugin = require('webpack-closure-compiler');

module.exports = env => {
	return [
		merge(common[0](env), {
			mode: 'production',
			devtool: 'source-map',
			stats: {
			colors: false,
			hash: true,
			timings: true,
			assets: true,
			chunks: true,
			chunkModules: true,
			modules: true,
			children: true,
			},
			plugins:[
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production')
				},
			})
			],
			optimization: {
			minimizer: [
				new UglifyJSPlugin({
					sourceMap: true,
					uglifyOptions: {
						compress: {
							inline: false
						}
					}
				})
			],
			runtimeChunk: false,
			splitChunks: {
				cacheGroups: {
					default: false,
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendor_app',
						chunks: 'all',
						minChunks: 2
					}
				}
			}
			},
		}
	),
	merge(common[1](env), {
					mode: 'production',
					devtool: 'source-map',
					stats: {
					colors: false,
					hash: true,
					timings: true,
					assets: true,
					chunks: true,
					chunkModules: true,
					modules: true,
					children: true,
					},
					plugins:[
					new webpack.DefinePlugin({
					  'process.env': {
					    NODE_ENV: JSON.stringify('production')
					  },
					})
					],
					optimization: {
					minimizer: [
					  new UglifyJSPlugin({
					    sourceMap: true,
					    uglifyOptions: {
					      compress: {
					        inline: false
					      }
					    }
					  })
					],
					runtimeChunk: false,
					splitChunks: {
					  cacheGroups: {
					    default: false,
					    commons: {
					      test: /[\\/]node_modules[\\/]/,
					      name: 'vendor_app',
					      chunks: 'all',
					      minChunks: 2
					    }
					  }
					}
					},
				}
	)
	]
};
