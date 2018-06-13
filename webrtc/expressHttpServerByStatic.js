var express = require('express');
var path = require('path');


var app = express();
app.use(express.static('static'));

app.get('/:path', function (req, res) {
        res.redirect("html/" + req.params.path + '.html');
});

app.listen(8081);
console.log('started on port 8081');
