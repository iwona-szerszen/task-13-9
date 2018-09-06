const http = require('http');
const colors = require('colors');
const handlers = require('./handlers');

function start() {
	function onRequest(request, response) {
		console.log('Request has been received'.green);
		console.log(`Request ${request.url} received`);

		response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});

		switch(request.url) {
			case '/':
			case '/start':
				handlers.welcome(request, response);
				break;
			case '/upload':
				handlers.upload(request, response);
				break;
			//case `/show/${request.headers['File-Name']}`:
			case '/show':
				handlers.show(request, response);
				break;
			default:
				handlers.error(request, response);
		}
	}

	http.createServer(onRequest).listen(9000);

	console.log('Server has been running'.green);
}

exports.start = start;