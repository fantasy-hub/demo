const http = require('http');
const querystring = require('querystring');
http.createServer(function (req, res) {
    // http://localhost:8001/aaa?user=iopi&pass=1323
    console.log(req.url);
    var GET = {};
    // 筛选/favicon.ico
    if(req.url.indexOf('?') != -1) {
        var arr = req.url.split('?');
        var url = arr[0];
        GET = querystring.parse(arr[1]);
    } else {
        var url = req.url;
    }
    console.log(GET);

    // req 获取前台的请求数据
    res.write('aaa');
    res.end();
}).listen(8001);