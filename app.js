const ws = require('ws');
const randomatic = require('randomatic');
const port = process.env.SERVER_PORT || process.env.PORT || 8080;

const wss = new ws.Server({
	port
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