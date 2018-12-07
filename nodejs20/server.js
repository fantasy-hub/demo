const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const consolidate = require('consolidate');
const mysql = require('mysql');
const common = require('./libs/common');

//连接池：保持多个连接，避免多次请求服务器
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'zaozuo2018',
  database: 'Blog'
});

var server = express();
server.listen(8001);

//1.解析cookie
server.use(cookieParser('sdfasl43kjoifguokn4lkhoifo4k3'));

//2.使用session
var arr = [];
for (var i = 0; i < 100000; i++) {
  arr.push('keys_' + Math.random());
}
server.use(cookieSession({
  name: 'zns_sess_id',
  keys: arr,
  maxAge: 20 * 3600 * 1000
}));

//3.post数据
server.use(bodyParser.urlencoded({
  extended: false
}));
server.use(multer({
  dest: './www/upload'
}).any());

//4.配置模板引擎
//输出什么东西
server.set('view engine', 'html');
//模板文件放在哪儿
server.set('views', './template');
//哪种模板引擎
server.engine('html', consolidate.ejs);

//接收用户请求
server.get('/', (req, res, next) => {
  //查询banner的东西
  db.query("SELECT * FROM banner_table", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('database error').end();
    } else {
      // console.log(data);
      res.banners = data;
      next();
    }
  });
});
server.get('/', (req, res, next) => {
  // 查询文章列表
  db.query('SELECT ID, title, summary FROM article_table', (err, data) => {
    if (err) {
      res.status(500).send('database error').end();
    } else {
      res.articles = data;
      next(); 
    }
  });
});
server.get('/', (req, res) => {
  res.render('index.ejs', {banners: res.banners, articles: res.articles});
});

// 访问article文件
server.get('/article', (req, res) => {
  // req.query.id  取得get请求的id属性 -> localhost:8001/article?id=1
  if (req.query.id) {
    if(req.query.act == 'like') {
      db.query(`UPDATE article_table SET n_like=n_like+1 WHERE ID=${req.query.id}`, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send('database error').end();
        }
      });
    }
    // 显示文章
    db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`, (err, data) => {
      if (err) {
        res.status(500).send('Databass error').end();
      } else {
        // console.log(data);
        if (data == 0) {
          res.status(404).send('Cannot find').end();
        } else {
          // 如果返回的数据长度不为0，执行修改时间、拼装<p></p>标签操作
          var articleData = data[0];
          articleData.sDate = common.timedata(articleData.post_time);
          articleData.content = articleData.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');

          res.render('conText.ejs', {
            // article_data  res返回给前台的数据
            article_data: articleData
          });
        }
      }
    });
  } else {
    res.status(404).send('cannot find').end();
  }
});



//4.static数据
server.use(static('./www'));