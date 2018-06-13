var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var uuid = require('uuid');

var app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))
//设置静态资源
app.use(express.static(path.join(__dirname, 'html')));

users={};

app.get('/index', function (req, res) {
    if (req.cookies.sessionId) {
        res.redirect('index.html?sessionId=' + req.cookies.sessionId);
    } else {
        res.send('<form action="login" method="get">'
            + '<input type="submit" value="login"/></form>');
    }
});

app.get('/login', function (req, res) {
    if (req.cookies.sessionId) {
        users[req.cookies.sessionId]=req.cookies.sessionId;
        res.redirect('index.html?sessionId=' + req.cookies.sessionId);
    }
    else {
        var uid = uuid.v1();
        users[uid]=uid;
        res.redirect('index.html?sessionId=' + uid);
    }
});

app.get('/hasUser/:user', function (req, res) {
    if(users.hasOwnProperty(req.params.user))
        res.send("1");
    else
        res.send("0");
});

app.listen(8081);
console.log('started on port 8081');

