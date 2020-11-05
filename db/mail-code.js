var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// 定义数据模型
var EmailCodeSchema = new Schema({
    code: String,
    mail: String,
});
// 操作数据库,通过model实现DRUD                                      
module.exports = mongoose.model('mailcode', EmailCodeSchema)