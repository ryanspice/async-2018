const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const MinifyPlugins = {
	"booleans":true,
	"builtIns":true,
	"consecutiveAdds":true,
	"deadcode":true,
	"evaluate":true,
	"flipComparisons":true,
	"guards":true,
	"infinity":true,
	"memberExpressions":true,
	"mergeVars":true,
	"numericLiterals":true,
	"propertyLiterals":true,
	"regexpConstructors":true,
	"replace":true,
	"simplify":true,
	"simplifyComparisons":true,
	"typeConstructors":true,

	"removeConsole":false,
	"removeDebugger":false,
	"removeUndefined":true,
	"undefinedToVoid":true,

	"mangle":false
}

const production = {
	mode: 'production',
	devtool: 'none',
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
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			},
		})
	]
}

module.exports = env => {
	return [
		merge(common[0](env), production),
		merge(common[1](env), production)
	]
};
