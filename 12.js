// 模板语法
const fs = require('fs');


// jade
const jade = require('jade');

var jstr = jade.renderFile('./www/1.jade', {pretty: true});
console.log(jstr);


// ejs
// const ejs = require('ejs');
// ejs.renderFile('./www/1.ejs', {name: 'blue'}, function (err, data) {
//     if (err) {
//         console.log('编译失败');
//     } else {
//         console.log(data);
//     }
// });

fs.writeFile('./aaa.html', jstr, function (err, data) {
    if (err) {
        console.log('写入失败');
    } else {
        console.log('写入成功');
    }
});