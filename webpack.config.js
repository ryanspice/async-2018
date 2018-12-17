const package = require("./package.json")
const build = require('./webpack.dev.js');

const PolyfillInjectorPlugin = require('webpack-polyfill-injector');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

const flow = require('flow-bin');
const execFile = require('child_process').execFile;

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

	if(!evt.production) {

		execFile(flow, ['check'], (err, stdout) => {
			console.log(stdout);
		});

	}

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
		app: `webpack-polyfill-injector?${JSON.stringify({modules: ['./src/index.js']})}!`
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
