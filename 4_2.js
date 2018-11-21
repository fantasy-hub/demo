const http = require('http');
const urlobj = require('url');
http.createServer(function (req, res) {
    // http://localhost:8001/aaa?user=iopi&pass=1323
    var obj = urlobj.parse(req.url, true);  //true自动封装query对象，默认false下为query: 'user=dd&pass=11',
    var url = obj.pathname;
    var GET = obj.query;
    // console.log(url, GET);
    console.log(obj);

    // req 获取前台的请求数据
    res.write('aaa');
    res.end();
}).listen(8001);

/*
Url: {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?user=dd&pass=23',
    query: { user: 'dd', pass: '23' },  //true
    pathname: '/aaa',
    path: '/aaa?user=dd&pass=23',
    href: '/aaa?user=dd&pass=23'
}
Url: {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: null,
    query: {},
    pathname: '/favicon.ico',
    path: '/favicon.ico',
    href: '/favicon.ico' 
}
*/