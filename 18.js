const mysql = require('mysql');

// 1.连接
// createConnection(哪台服务器，用户名，密码，哪个数据库);
var db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'zaozuo2018',
    database: 'MyDatabase'
});
console.log(db);
// 2.查询
// query(做什么，回调)
db.query('SELECT * FROM `user_table`;', (err, data) => {
    if (err) {
        console.log('出错了', err);
    } else {
        console.log('成功了', JSON.stringify(data));
    }
});