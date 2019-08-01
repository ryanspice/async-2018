
const env = '';
const name = 'async.2018';

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

  client.upload(['dist/**'], `/domains/ryanspice.com/private_html/${name}`, {
      baseDir: 'dist',
      overwrite: 'older'
  }, function (result) {
      console.log(result);
  });

});

}catch(e){

	console.log('failed to connect');
	console.log(e);

}
