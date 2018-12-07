const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');  // 利用rename()方法对文件重命名
const path = require('path'); // 获取原来文件的扩展名，利用.ext()方法

fs.rename('')

var objMulter = multer({dest: './www/'});  // dest -> destination 目标存放地点，此参数用于将上传的文件写入磁盘。不用该参数就会保存在内存中
var server = express();

server.use(objMulter.any());

server.post('/', function (req, res) {
    console.log(req.query, req.body, req.files, req.cookies, req.session);
});

server.listen(8001);