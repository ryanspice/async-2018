
module.exports = [
	(env) => {

		//const master = require('ecmascript-toolkit/webpack.config.js');
		const merge = require('webpack-merge');
		const name = require("../package.json").short_name;

		const build = merge(
			require('ecmascript-toolkit/webpack.config.js')(env)[0],
			env.production?require('ecmascript-toolkit/config/webpack.prod.js')(env)[0]:{},
			require('./webpack.master.js')(env)
		);

		const entry = {};
		entry[name] = `./src`;
		build.entry = entry;

		return build;
	}
];
