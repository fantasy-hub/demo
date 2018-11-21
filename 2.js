/**
 * @todo 简单的服务器
 */

// 引入http模块
const http = require('http');
// 创建一台服务器: request浏览器请求的内容 response服务器给浏览器的响应
var server = http.createServer(function (request, response) {
    console.log(request.url);
    switch(request.url) {
        // 与http请求方式有关 //GET /http1.1 
        case '/1.html':
            response.write('111');
            break;
        case '/2.html':
            response.write('222');
            break;
        default: 
            response.write('404');
            break;
    }

    // 向前台发东西
    response.write('abc');  
    // 结束请求
    response.end(); 
});
// 服务器监听端口（端口自定义），服务器通过端口区分访问什么服务
server.listen(8880);

/**
 * @param /favicon.ico  网站图标
 * chrome自动请求，普通浏览器想请求网站图标需要在<head></head>标签内写入
 * <link rel="shortcut icon" href="/favicon.ico">
 */