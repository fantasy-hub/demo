/**
 * cookie session
 * http：是无状态的，两次请求之间服务器无法识别是否是同一个人。每次刷新都要重新登录
 * cookie：保存在浏览器保存一些数据，每次向服务器请求都会带着数据
 *        缺陷：不安全，可以浏览器手动修改；大小有限，只有4k
 * session：保存在服务器。session是基于cookie实现的
 */ 
const express = require('express');
const cookieparser = require('cookie-parser');

var server = express();

// cookie
// 存 cookie
// server.use('/aaa/a.html', function (req, res) {
//     res.send('ok'); 
//     res.cookie('user', 'blue', {path: '/aaa', maxAge: 30*24*60*60*1000});
// });

// 1.读cookie：传入字符串，代表解析签名后的cookie
server.use(cookieparser('laoge666'));

server.use('/', function (req, res) {
    // 1.cookie加密（签名），起到防止篡改的目的
    req.secret = 'laoge666';

    // 2.发送给浏览器的cookie：singed签名会增加cookie的大小
    res.cookie('user', 'blue', {signed: true});

    // 3.cookie后台读取存给浏览器的cookies
    console.log('无签名的cookie', req.cookies);
    console.log('签名的cookie', req.signedCookies);

    // 4.cookie删除
    res.clearCookie('user');

    res.send('objk');
});

server.listen(8001);