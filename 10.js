const express = require('express');
const bodyparser = require('body-parser');
const querystring = require('querystring');

var server = express();
server.listen(8001);

// 接收post数据方法一：body-parser
server.use(bodyparser.urlencoded({
    extended: true,  // 扩展模式
    limit: 2*1024*1024  // 限制2M
}));

// 接收post数据方法二：原生on-data,end方法
// server.use(function (req, res, next) {
//     var str = '';
//     req.on('data', function (data) {
//         str += data;
//     });
//     req.on('end', function () {
//         req.body = querystring.parse(str);
//         next();
//     });
// });

server.use('/', function (req, res) {
    console.log(req.body);
});