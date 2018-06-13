var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

app.use('/js', express.static(path.join('static', 'js')));

app.get('/favicon.ico', function (req, res) {
});

app.get('/:path', function (req, res) {
        var fileName = path.join(__dirname, 'static' , 'html' , req.params.path) + '.html';
        // 从文件系统中读取请求的文件内容
        fs.readFile(fileName, function (err, data) {
                if (err) {
                        console.log(err);
                        res.sendStatus(404);
                } else {
                        res.type('html')
                        // 响应文件内容
                        res.status(200).send(data.toString());
                }
        });
});

app.listen(8081);
console.log('started on port 8081');

