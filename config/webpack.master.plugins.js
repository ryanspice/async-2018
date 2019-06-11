/* @flow */

/*
 * master/common plugins
 */

const package = require("../package.json");
const webpack = require('webpack');
const glob = require('glob-all');
const path = require('path');

const PurifyCSSPlugin = require('purifycss-webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = [

	new CircularDependencyPlugin({
		exclude: /a\node_modules/,

		failOnError: false,
		allowAsyncCycles: true,
		cwd: process.cwd(),
		onStart({
			compilation
		}) {},
		onDetected({
			module: webpackModuleRecord,
			paths,
			compilation
		}) {
			compilation.warnings.push(new Error(paths.join(' -> ')))
		},
		onEnd({
			compilation
		}) {}
	}),

	new PurifyCSSPlugin({

		minimize: true,
		verbose: true,
		paths: glob.sync([
			path.join(__dirname, './src/index.html'),
			path.join(__dirname, './src/**/*.js')
		])
	})

];
