/**
 * 用户注册，登录
 */
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');  
const urllib = require('url'); 

// 用于存访问的数据
var users = {};  //例如：{"blue": "123456", "zhangsan": "123456", "lisi": "321321"}

var server = http.createServer((req, res) => {
    // post解析方式
    var str = '';
    req.on('data', (data) => {
        str += data;
    });
    // end数据全部到达
    req.on('end', () => {
        // 将get解析方式定义在了 post方式的end结束事件中
        var obj = urllib.parse(req.url, true);  // ture 封装query 'user=dd&pass=11'
        // obj.path == obj.href  ->  '/aaa?user=bb&pass=11'
        const url = obj.pathname,  // /user
             GET = obj.query;  // { act: 'login/reg', user: 'blue', pass: '123'}
               
        const POST = querystring.parse(str);  // { user: 'dd', pass: '11' }

        // 区分：接口、文件
        if (url == '/user') {
            switch (GET.act) {
                case 'reg':
                    //1.检查用户名是否已经有了
                    if(users[GET.user]){
                    res.write('{"ok": false, "msg": "此用户已存在"}');
                    }else{
                    //2.插入users
                    users[GET.user]=GET.pass;
                    res.write('{"ok": true, "msg": "注册成功"}');
                    }
                    break;
                case 'login':
                    //1.检查用户是否存在
                    if(users[GET.user]==null){
                      res.write('{"ok": false, "msg": "此用户不存在"}');
                    //2.检查用户密码
                    }else if(users[GET.user]!=GET.pass){
                      res.write('{"ok": false, "msg": "用户名或密码有误"}');
                    }else{
                      res.write('{"ok": true, "msg": "登录成功"}');
                    }
                    break;
                default:
                    res.write('{"ok": false, "msg": "xxxx"}');
            }
            res.end();
        } else {
            var file_name = `www${url}`;
            fs.readFile(file_name, (err, data) => {
                err ? res.write('404') : res.write(data);
                res.end();
            });
        }
    });
});
server.listen(8001);