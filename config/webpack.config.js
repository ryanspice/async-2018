/*
 *	Build Process Entry
 */

const package = require("../package.json")

const build = require('./webpack.master.js');
const legacy = require('./webpack.legacy.js');
const assets = require('./webpack.assets.js');

const entry = {};

const application = evt => {

	const temp = build(evt);

	temp.output.library = `${package.short_name}`;
	temp.output.chunkFilename = `[name].js`;
	temp.output.filename = `[name].js`;

	temp.output.library = `${package.short_name}`;

	entry[`${package.short_name}`] = `./src`;

	temp.entry = entry;

	return temp;
};

module.exports = [
	application,
	legacy
	,assets
];
