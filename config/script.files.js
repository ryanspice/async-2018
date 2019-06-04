

const testFolder = './dist/';
const fs = require('fs');

async function ensureDir (dirpath) {
  try {
    await fs.mkdir(dirpath, { recursive: true })
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}

const scripts = [];
const scriptsForManifest = [];
const filters = [/js/, /legacy/];

module.exports = evt => {

		fs.mkdir("dist", ()=>{

		fs.readdirSync(testFolder).filter(file => filters.some(rx => rx.test(file))).forEach(file => {

			const isLegacy = (file.split('legacy').length > 1);
			const isPollyfill = (file.split('polyfill').length > 1);
			const isManifest = (file.split('manifest').length > 1);
			const isCss = (file.split('css').length > 1);
			const isMap = (file.split('map').length > 1);

			scriptsForManifest[file.replace('.', '').replace('.', '').replace('.', '')] = file;

			const data = {
				src: file,
				defer: 'defer',
				type: 'module'
			};

			if (isManifest || isPollyfill || isMap) {

				return false;
			} else if (isCss) {

				//data.type = 'application/javascript';
				return false;
			} else if (isLegacy) {

				data.nomodule = 'nomodule';
				data.type = 'application/javascript';

			}

			scripts.push(data);

		});

	})

	return [scripts,scriptsForManifest];
}
