const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8181 });

wss.on('connection', function connection(ws, req) {
  const ip = req.connection.remoteAddress;
});