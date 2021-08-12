const ws = require('ws');
const port = process.env.SERVER_PORT || process.env.PORT || 8080;

const wss = new ws.Server({
	port
});
wss.on('connection', socket => {
	(async () => {
		await new Promise(res => {
			socket.once('message', (msg) => {
				console.log(msg)
				res();
			});
		})
		
	})();
});