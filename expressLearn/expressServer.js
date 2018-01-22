var WebSocketServer = require('ws').Server;
var express = require('express');
var path = require('path');
var querystring = require('querystring');
var http = require('http');

var server = http.createServer();

var app = express();
app.use(express.static(path.join(__dirname, '/html')));

var wss = new WebSocketServer({
  server: server,
  clientTracking: false,
  // 这是一个在创建ws时校验方法
  // verifyClient:(info , cb) =>{
  //   console.log(cb.toString());
  //   cb(true);
  // }
});
wss.cm = {};
wss.on('connection', function (ws , req) {

  var cookies = querystring.parse(req.headers.cookie , null , null , null);
  console.log(cookies.sessionId);

  ws.terminate();

  ws.on('message' , function (d,f) {});
  ws.on('close', function (ws) {
    console.log('close : ' + ws);
  });
  ws.on('error' , function(err){});
});

server.on('request', app);
server.listen(8081, function () {
  console.log('Listening on http://localhost:8081');
});