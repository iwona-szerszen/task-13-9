const fs = require('fs');
const formidable = require('formidable');

let fileName = '';

exports.welcome = function(request, response) {
	console.log('Start handling welcome request');

	fs.readFile('./templates/welcome.html', (err, html) => {
		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		response.write(html);
		response.end();
	});
}

exports.welcomeStyle = function(request, response) {
	console.log('Start handling welcomeStyle request');
	
	fs.readFile('./css/welcome.css', (err, css) => {
		response.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
		response.write(css);
		response.end();
	});
}

exports.upload = function(request, response) {
	console.log('Start handling upload request');

	const form = new formidable.IncomingForm();

	form.parse(request, (err, fields, files) => {
		fileName = files.upload.name;
		fs.rename(files.upload.path, `./images/${fileName}`);
		fs.readFile('./templates/show.html', (err, html) => {
			response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});	
			response.write(html);
			response.end();
		});
	});
}

exports.show = function(request, response) {
	console.log('Start handling upload request');

	fs.readFile(`./images/${fileName}`, 'binary', (err, file) => {
		response.writeHead(200, {'Content-Type': 'image/png'});
		response.write(file, 'binary');
		response.end();
	});
}

exports.showStyle = function(request, response) {
	console.log('Start handling showStyle request');

	fs.readFile('./css/show.css', (err, css) => {
		response.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
		response.write(css);
		response.end();
	});
}

exports.error = function(request, response) {
	console.log('Don\'t know what to do'.red);

	response.write('Error 404');
	response.end();
}