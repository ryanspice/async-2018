
/* */

const filename = "async-template.js";

const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/* */

module.exports = {
	mode:'development',
	entry: './src/index.js',
	output: {
		filename: filename,
		path: path.resolve(__dirname, 'dist')
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
				}
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
	plugins:[

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
	  compress: true,
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
