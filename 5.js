const http = require('http');
const querystring = require('querystring');
http.createServer(function (req,res) {
    // 接收数据
    var str = '';
    // data——有一段诗句到达（很多次）
    var i = 0;
    req.on('data', function (data) {
        console.log(`第$%{i++}次收到的数据`);
        str += data;
    });
    // end——数据全部到达（一次）
    req.on('end', function () {
        console.log(str);  // user=dd&pass=11&content=
        var POST = querystring.parse(str);
        console.log(POST);  // { user: 'dd', pass: '11', content: '' }
    });
}).listen(8002);