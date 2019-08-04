
const merge = require('webpack-merge');
const name = require("../package.json").short_name;
const entry = {};
entry[name] = `./src`;

module.exports = [
	(evt) => {

		return merge(
			require('./webpack.master.js')(evt),
			{
				entry:entry,
				output:{
					library : name,
					chunkFilename : `[name].js`,
					filename : `[name].js`
				}
			}
		);
	}
	//,require('./webpack.legacy.js')
	,require('./webpack.assets.js')
];
