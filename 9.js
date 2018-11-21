const express = require('express');

var server = express();
// server.use('/', (req, res) => {
//     res.send('abc');
//     res.end();
// });
server.get('/', (req, res) => {
    // console.log('有get请求');
    console.log(req);
}); 
server.listen(8001);