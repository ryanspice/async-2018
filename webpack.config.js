
/* */

const filename = "async-template.js";

const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* */

module.exports = {
	mode:'development',
	entry: './src/index.js',

		devtool: 'eval-source-maps',
	output: {
		filename: filename,
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
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
				  loader: "babel-loader"
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
							,options:{url:false}
          }, {
              loader: "sass-loader" // compiles Sass to CSS
          }]
      },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use:[{loader: 'file?name=public/fonts/[name].[ext]'}]
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

	plugins:[

		new MiniCssExtractPlugin({

			filename: "[name].css",

			chunkFilename: "[id].css"

		}),
		new CopyWebpackPlugin([
	        { from: './src/index-dist.js',
				 		to: './index.js'},
	        //{ from: './src/assets', to:'./assets/' }
	    ]),
		new webpack.NamedModulesPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(true)
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
};
