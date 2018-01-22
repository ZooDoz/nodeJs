var http = require('http');
var fs = require('fs');
var url = require('url');
var uuid = require('uuid');


// 创建服务器
http.createServer(function (request, response) {
    // 解析请求，包括文件名
    var pathname = 'html' + url.parse(request.url).pathname;
    // 输出请求的文件名
    console.log("Request for " + pathname + " received.");

    if (!fs.existsSync(pathname)) 
    {
        console.log('file not exist');
        response.writeHead(404, { 'Content-Type': 'text/html' });
        //  发送响应数据
        response.end();
    }
    else {
        // 从文件系统中读取请求的文件内容
        fs.readFile(pathname, function (err, data) {
            if (err) {
                console.log(err);
                // HTTP 状态码: 404 : NOT FOUND
                // Content Type: text/plain
                response.writeHead(404, { 'Content-Type': 'text/html' });
                //  发送响应数据
                response.end();
            } else {
                // HTTP 状态码: 200 : OK
                // Content Type: text/plain
                var cookie = 'sessionId=' + uuid.v1();
                // console.log(cookie);
                response.writeHead(200, 
                    { 
                        'Content-Type': 'text/html',
                        'Set-Cookie' : cookie
                    });
                // 响应文件内容
                response.write(data.toString());
                //  发送响应数据
                response.end();
            }
        });
    }

}).listen(8081);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8081/');