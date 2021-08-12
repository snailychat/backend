const express = require('express');
const ws = require('ws');
const cors = require('cors')
const app = express();
const port = process.env.SERVER_PORT || process.env.PORT || 8080;


app.user_mesages = [
	{ username: 'Snail King', content: 'Hola', date: Date.now() }
]; // mongodb?
app.use(cors());

app.listen(port, () => console.log(`On port: ${port}));
