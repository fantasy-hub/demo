const ejs = require('ejs');

ejs.renderFile('./14.ejs', {name: 'blue'}, (err, data) => {
    console.log(data);
});