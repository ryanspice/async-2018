
const pkg = require('package.json');

const name = pkg.name;


const ftp = require("basic-ftp")

example()

async function example() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
				    host: 'ftp.ryanspice.com',
				    port: 21,
				    user: 'rspice',
				    password: 'Brussels234!'
        })

				const out = `/domains/ryanspice.com/private_html/${name}/`;
				await client.ensureDir(out);

				await client.clearWorkingDir();
				await client.uploadDir("dist/");

        console.log(await client.list())
        //await client.upload(fs.createReadStream("README.md"), "README.md")
    }
    catch(err) {
        console.log(err)
    }
    client.close()
}
