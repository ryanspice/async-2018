
const env = 'dev';
const name = 'upload_test1';
/*
try {

var ftpClient = require('ftp-client'),

config = {
    host: 'ftp.ryanspice.com',
    port: 21,
    user: 'rspice',
    password: 'Brussels234!'
},
options = {
    logging: 'debug'
},
client = new ftpClient(config, options);

client.connect(function () {

	console.log('connected');

  client.upload(['dist/**'], `/domains/ryanspice.com/private_html/${env}/${name}`, {
      baseDir: 'dist',
      overwrite: 'all'
  }, function (result) {
      console.log(result);
  });

});

}catch(e){

	console.log('failed to connect');
	console.log(e);

}
*/

const ftp = require("basic-ftp")
const fs = require("fs")

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
				await client.uploadDir("dist/");

        console.log(await client.list())
        //await client.upload(fs.createReadStream("README.md"), "README.md")
    }
    catch(err) {
        console.log(err)
    }
    client.close()
}
