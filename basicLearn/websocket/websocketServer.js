var ws = require('ws');
var url = require('url');
const querystring = require('querystring');

var wss = new ws.Server({ port: 8181 });
wss.clientsMap = {};

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

var interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) 
      return ws.terminate();
    ws.isAlive = false;
    ws.ping(noop);
  });
}, 30000);

wss.on('connection', function connection(ws, req) {
 
  ws.on('pong', heartbeat);
  
  try
  {
    var params = querystring.parse(url.parse(req.url).query , null, null, null);
    var sessionId = params.sessionId;

    ws.send('connection : ' + sessionId);
    ws.sessionId = sessionId;
    // console.log(ws.sessionId);
    wss.clientsMap[sessionId] = ws;
    wss.clientsMap[sessionId].send("manger this");
  }
  catch (err) {
    console.log(err);
  }

  ws.on('message', function (data , flag) {
    try {
      ws.send('getData : ' + data);
    }
    catch (err) {
      console.log(err);
    }
  });

  ws.on('close', function (close) {
    try {
      console.log(close);
    }
    catch (err) {
      console.log(err);
    }
  });
  ws.on('error', function(err) {});
});

console.log('Server running at ws://127.0.0.1:8181/');