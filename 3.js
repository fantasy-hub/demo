/**
 * @todo 文件操作读写磁盘
 * 文件操作：fs模块 —— File System
 */

// 引入模块
const fs = require('fs');
// 读文件（文件名，回调函数）
fs.readFile('aaa.txt', function (err, data) {
    if(data) {
        // data 读取出Buffer对象 二进制数据
        console.log(data);
        // 调用toString变成原始格式
        console.log(data.toString());
    } else {
        console.log(err);
    }
});
// 写文件（文件名，内容，回调函数）
fs.writeFile('ccc.txt', 'ojbk very nice', function (err) {
    console.log(err);
});