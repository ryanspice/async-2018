/**
 * remove heading lines from the stats.json that gets exported from webpack
 */

const fs = require('fs');

const fileName = './dist/stats.json';

const removeLines = (data, lines = []) => {
	return data
		.split('\n')
		.filter((val, idx) => lines.indexOf(idx) === -1)
		.join('\n');
}

fs.readFile(fileName, 'utf8', function(err, data) {

	data = removeLines(data, [0, 1, 2, 3, 4])

	fs.writeFile(fileName, data, function(err, result) {
		if (err) console.log('error', err);
	});
});
