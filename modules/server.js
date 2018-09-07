const http = require('http');
const colors = require('colors');
const handlers = require('./handlers');

function start() {
	console.log('\nTo upload photo, enter "http://localhost:9000/welcome" or just "http://localhost:9000/" in your browser address bar\n');

	function onRequest(request, response) {
		console.log(`\nRequest`, `${request.url}`.magenta, `has been received`);

		response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});

		switch(request.url) {
			case '/':
			case '/welcome':
				handlers.welcome(request, response);
				break;
			case '/css/welcome.css':
				handlers.welcomeStyle(request, response);
				break;
			case '/upload':
				handlers.upload(request, response);
				break;
			case '/show':
				handlers.show(request, response);
				break;
			case '/css/show.css':
				handlers.showStyle(request, response);
				break;
			default:
				handlers.error(request, response);
		}
	}

	http.createServer(onRequest).listen(9000);

	console.log('Server has been running'.green);
}

exports.start = start;