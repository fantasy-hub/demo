const express = require('express');
const estatic = require('express-static')

var server = express();
server.listen(8001);

// /login?user=xxx*pass=xxx

// 存储用户数据
var users = {
    'blue': '111'
};

server.get('/login', function (req, res) {
    console.log(1);
    // urlLib.parse(req.url, true).query;
    var user = req.query['user'],
        pass = req.query['pass'];
    console.log(user, pass);
    if (users[user] == null) {
        res.send({"ok": false, "msg": "此用户不存在"});
    } else {
        if (users[user] != pass) {
            res.send({"ok": false, "msg": "密码错误"});
        } else {
            res.send({"ok": true, "msg": "登录成功"});
        }
    } 
});

server.use(estatic('./www')); 