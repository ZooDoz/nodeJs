const http = require('http');
const url = require('url');
const { exec } = require('child_process');

const hostname = '127.0.0.1';
const port = 3000;
//win sleep
var sleepCmd = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe sleep 3 ; ls";

//完全阻塞服务
function sleep(milliSeconds) {
  var startTime = new Date().getTime();
  while (new Date().getTime() < startTime + milliSeconds);
};
//注册服务器服务
//其中包含一个阻塞服务，一个非阻塞耗时服务
//体现了nodeJs的优秀特性，也隐含了一些编码陷阱
const server = http.createServer((req, res) => {

  var path = url.parse(req.url).path;
  console.log("Request for " + path + " received.");
  if (path == "/") {
    res.write(path);
    res.end();
  }
  else if (path == "/s") {
    //如果使用while的阻塞方式会导致服务卡死
    //因为while会把线程沾满
    sleep(3000);
    res.write(path);
    res.end();
  }
  else {
    //如果想要一个请求处理程序中耗时的操作不会阻塞对另一个请求作出立即响应，
    //使用了Node.js的child_process模块的一个既简单又实用的非阻塞操作exec()。
    exec(sleepCmd, function (error, stdout, stderr) {
      if (error) {
        console.log(error);
        res.writeHead(404, { "content-type": "text/plain" });
        res.end();
      }
      else {
        res.writeHead(200, { "content-type": "text/plain" });
        res.write(stdout);
        res.end();
      }
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});