
const env = 'dev';
const name = 'upload_test1';

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

				const out = `/domains/ryanspice.com/private_html/${env}/${name}/`;
				await client.ensureDir(out);
				await client.clearWorkingDir();
				await client.uploadDir("lib/");

    } catch(err) {

      console.log(err);

    }

    client.close();

}
