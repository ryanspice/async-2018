module.exports = function (api) {
	api.cache(false);
	const presets = [
		"@babel/preset-flow",
		[
			"@babel/preset-env",
			{
				"modules": false,
				"useBuiltIns": false,
				"targets": {
					"browsers": "Chrome 69"
				},
				"loose": true
			}
		]
	];
	const plugins = [
		["@babel/plugin-proposal-decorators", {
			"legacy": true
		}],
		"@babel/plugin-proposal-function-sent",
		"@babel/plugin-proposal-export-namespace-from",
		"@babel/plugin-proposal-export-default-from",
		"@babel/plugin-proposal-numeric-separator",
		"@babel/plugin-proposal-throw-expressions",
		"@babel/plugin-syntax-dynamic-import",
		"@babel/plugin-syntax-import-meta",
		"@babel/plugin-syntax-flow",
		["@babel/plugin-proposal-class-properties", {
			"loose": false
		}],
		"@babel/plugin-proposal-json-strings",
		["@babel/plugin-transform-runtime"],
		"@babel/plugin-transform-flow-strip-types"
	];

	return {
		presets,
		plugins
	};
}
