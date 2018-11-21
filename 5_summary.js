const http = require('http');
const fs = require('fs');
const querystring = require('querystring');  // 主要解析post
const urllib = require('url');  // 主要解析get

var sever = http.createServer((req, res) => {
    /**
     * GET数据
     * POST数据
     * 文件请求
     */
     var obj = urllib.parse(req.url, true);
     var url = obj.pathname;
     const GET = obj.query;

     var str = '';
     req.on('data', (data) => {
          str += data;
     });
     req.on('end', () => {
          const POST = querystring.parse(str);
     });

     var file_name = `./www${url}`;
     fs.readFile(file_name, (err, data) => {
          if (err) {
               res.write('404');
          } else {
               res.write(data);
          }
          res.end();
     });
});
server.listen(8003);