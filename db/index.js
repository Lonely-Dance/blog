const mongoose = require('mongoose')
    //连接数据库的固定写法
const db = mongoose.connect('mongodb://localhost:27017/myblog', {
    NewUrlParser: true
})
db.then(res => {
    console.log('数据库连接成功');
})