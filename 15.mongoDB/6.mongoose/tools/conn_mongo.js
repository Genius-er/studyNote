/*
* 定义一个模块，用来连接MongoDB数据库
* */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose_test',{ useNewUrlParser: true,useUnifiedTopology: true})
mongoose.connection.once('open',function () {
    console.log('连接成功~~~')
})