const http = require('http');
http.createServer(function (req, res) {
    // http://localhost:8001/aaa?user=iopi&pass=1323
    console.log(req.url);
    var GET = {};
    // 筛选/favicon.ico
    if(req.url.indexOf('?') != -1) {
        var arr = req.url.split('?');
        //arr[0]=>地址  '/aaa'
        //arr[1]=>数据  'user=blue&pass=123456'
        var url = arr[0];
        //arr2=>['user=blue', 'pass=123456']
        var arr2 = arr[1].split('&');
        console.log(arr2);
        var arr3 = null;
        for(var i = 0; i < arr2.length; i++) {
            arr3 = arr2[i].split('=');
            GET[arr3[0]] = arr3[1];
        }
    } else {
        var url = req.url;
    }


    // req 获取前台的请求数据
    res.write('aaa');
    res.end();
}).listen(8001);