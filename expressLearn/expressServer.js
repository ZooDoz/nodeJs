var WebSocketServer = require('ws').Server;
var path = require('path');
var querystring = require('querystring');
var http = require('http');

var wss = new WebSocketServer({
  port: 8181,
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

  http.get('http://127.0.0.1:8081/hasUser/' + cookies.sessionId, function (res) {
    var result = "";
    res.on('data' , function(data){
      result+=data;
    });
    res.on('end' , function(){
      if(!result)
      {
        var redirect = {};
        redirect.url = 'http://127.0.0.1:8081/login';
        ws.send(JSON.stringify(redirect));
        ws.terminate();
      }
      else
      {
        wss[cookies.sessionId]=ws;
      }
    });
  });

  ws.on('message' , function (d,f) {});
  ws.on('close', function (ws) {
    console.log('close : ' + ws);
  });
  ws.on('error' , function(err){});
});

console.log('Listening on http://localhost:8181');
