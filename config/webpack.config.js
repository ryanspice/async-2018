
const master = require('ecmascript-toolkit/webpack.config.js');
const merge = require('webpack-merge');
const name = require("../package.json").short_name;
const entry = {};
entry[name] = `./src`;
master[0].entry = entry;

module.exports = [
	(evt) => {




		// merge

		const build = merge(
			require('./webpack.master.js')(evt),
			master[0],
			{
				output:{
					library : name,
					chunkFilename : `[name].js`,
					filename : `[name].js`
				}
			}
		);

		// overwrite not merge


		return build;
	}
	//,require('./webpack.legacy.js')

];
