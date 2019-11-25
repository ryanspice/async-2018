
const path = require('path');
const merge = require('webpack-merge');
const package = require("../package.json")

const common = require('./webpack.config.js');

let evt = () => {

	const es6 = common[0];
	const es5 = common[1];

	return [
		merge(es6, {}),
		merge(es5, {})
	]
};

module.exports = common;
