/**
 * express总结
 * 1. 解析cookie
 * 2. 使用session
 * 3. 解析post数据
 * 4. 解析static数据
 */
const express = require('express');
const estatic = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const jade = require('jade');

var server = express();

// 1.解析cookie，cookieParser传入参数表示对cookie签名
server.use(cookieParser('laoge666'));  

// 2.使用session
var arr = [];
for (var i = 0; i < 1000; i ++) {
    arr.push(`key${Math.random()*10}`);
}
server.use(cookieSession({name: 'ldbb', keys: arr, maxAge: 20/60*60*1000}));

// 3.post数据
//bodyparser只能解析application类型的post，exetnded：false关闭扩展模式
server.use(bodyParser.urlencoded({extended: false}));


// 用户请求
server.use('/', (req, res, next) => {
    // req.query -> get数据
    // req.body -> post数据
    // req.files -> post数据
    // console.log(req.query, req.body, req.cookies, req.session);
    console.log(req.files);
});

// 4.static数据
server.use(estatic('./www'));

server.listen(8001);