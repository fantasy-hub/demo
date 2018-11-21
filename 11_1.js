// Session
const express = require('express');
const cookieparser = require('cookie-parser');
// 1.引入解析cookie
const cookiesession = require('cookie-session');

var server = express();

// 生成随机的key值推入数组，防止服务器的session被破解
var arr = [];
for (var i = 0; i < 100; i++) {
    arr.push('sig' + Math.random()*10);
}

server.use(cookieparser());

// 2.配置session
server.use(cookiesession({
    name: 'sessId',
    keys: ['aaa', 'bbb', 'ccc'],
    maxAge: 2*60*60*1000
}));

server.use('/', function (req, res) {
    if (req.session['count'] == null) {
        req.session['count'] = 1;
    } else {
        req.session['count']++;
    }

    // 3.浏览器返回给服务器的session
    console.log(req.session);
    
    res.send('ojbk');

    // 4.删除session
    delete req.session;
});

server.listen('8082');
