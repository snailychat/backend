const ws = require('ws');
const randomatic = require('randomatic');
const port = process.env.SERVER_PORT || process.env.PORT || 8080;

const server = require('http').createServer();
const wss = new ws.Server({
	server
});
server.listen(port, () => {
	console.log(`On port: ${port}`);
});
server.on('request', (req, res) => {
	res.writeHead(200);
    res.end('Hello');
});

let connections = [];
wss.on('connection', socket => {
	socket.__id = randomatic('aA0', 25);
	connections.push(socket)
	socket.on('message', msg => {
		const { content, username } = JSON.parse(msg);
		console.log(content, username)
		connections.map(x => {
			if(x.__id == socket.__id) return;
			x.send(JSON.stringify({
				content, username 
			}));
		})
	});
	socket.once('close', () => {
		connections = connections.filter(x => x.__id != socket.__id);
	});
});