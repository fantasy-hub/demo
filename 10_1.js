// 封装中间件
const express = require('express');
const bp = require('./10_1-1');

var server = express();
server.listen(8001);
server.use(bp);

server.use('/', function (req, res) {
    console.log(req.body);
})