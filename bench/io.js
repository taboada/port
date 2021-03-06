var port = require('../port'),
	path = require('path');

var dir = path.dirname(path.relative(process.cwd(), process.argv[1]));

port({
	read: 8205, // [netsend]
	write: 8206, // [netreceive]
	encoding: 'ascii',
	flags: ['-noprefs', '-stderr', '-nogui', '-open', dir + '/io.pd']
})
.on('connect', function(){
	this.write('bang;\n');
})
.on('data', function(data){
	console.log('data', data);
	this.write('bang;\n');
})
.create();

