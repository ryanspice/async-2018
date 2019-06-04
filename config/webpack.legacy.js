
const package = require("../package.json")

const build = require('./webpack.master.js');

const plugins = require('./webpack.legacy.plugins.js');

const entry = {};

module.exports = legacy = evt => {

	evt.NODE_ENV = 'legacy';

	const temp = build(evt,plugins);

	temp.output.library = `${package.short_name}_legacy`;
	temp.output.chunkFilename = `[name].legacy.js`;
	temp.output.filename = `[name].legacy.js`;

	entry[`${package.short_name}`]=`webpack-polyfill-injector?${JSON.stringify({
			modules: './src' // list your entry modules for the `app` entry chunk
		})}!`; // don't forget the trailing exclamation mark!

	temp.entry = entry;


	return temp;
};
