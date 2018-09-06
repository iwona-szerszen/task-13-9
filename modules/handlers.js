const fs = require('fs');
const formidable = require('formidable');

exports.welcome = function(request, response) {
	console.log('Start handling welcome request');

	fs.readFile('templates/start.html', (err, html) => {
		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		response.write(html);
		response.end();
	});
}

exports.upload = function(request, response) {
	console.log('Start handling upload request');

	const form = new formidable.IncomingForm();
	form.parse(request, (err, fields, files) => {
		form.uploadDir = './';
		fs.rename(files.upload.path, files.upload.name);
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('received image:<br>');
		//response.write(`<img src="/show/${files.upload.name}">`);
		response.write(`<img src="/show/${files.upload.name.substr(0, files.upload.name.lastIndexOf('.'))}">`);
		response.end();
	});
}

exports.show = function(request, response) {
	console.log('show request running');
	const uploadFileName = `${request.url.substr(6)}.png`;
	//request.setHeader('File-Name', request.url.substr(6));
	fs.readFile(uploadFileName, 'binary', (err, file) => {
		response.writeHead(200, {'Content-Type': 'image/png'});
		response.write(file, 'binary');
		response.end();
	});
}

exports.error = function(request, response) {
	console.log('Don\'t know what to do');
	response.write('Error 404');
	response.end();
}