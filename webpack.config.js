const package = require("./package.json")
const build = require('./webpack.dev.js');

const PolyfillInjectorPlugin = require('webpack-polyfill-injector');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

/*
 *	ES2015+ (es6/7)
 */

const processA = evt => {

	const temp = build(evt);

	temp.output.filename = `${package.short_name}.js`;
	temp.output.library = `${package.short_name}`;

	temp.entry = [
		'./src/index.js'
	];

	return temp;
};

/*
 *	ES5
 */

const processB = evt => {

	evt.NODE_ENV = 'legacy';

	const temp = build(evt);

	temp.output.library = `${package.short_name}_legacy`;
	temp.output.filename = `${package.short_name}_legacy.js`;

	temp.entry = {
		app: `webpack-polyfill-injector?${JSON.stringify({
	      modules: ['./src/index.js'] // list your entry modules for the `app` entry chunk
	    })}!` // don't forget the trailing exclamation mark!
	};

	temp.plugins.push(
		new DuplicatePackageCheckerPlugin({
			verbose: true,
			strict: true
		}),
		new PolyfillInjectorPlugin({
			polyfills: [
				'Promise',
				'fetch'
			]
		})
	);

	return temp;
};

module.exports = [
	processA,
	processB
];
