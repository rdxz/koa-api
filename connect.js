const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
// const config = require('./config/env')

// 连接数据库.
// mongoose.connect(config.mongo.uri, config.mongo.options)
// 链接数据库
mongoose.connect('mongodb://123.207.172.26:27018/wsd');
mongoose.connection.on('connected',function(){
  console.log("MongoDB connected success.")
})
const modelsPath = path.join(__dirname, 'model')
fs.readdirSync(modelsPath).forEach(function (file) {
	if (/(.*)\.(js$|coffee$)/.test(file)) {
		require(modelsPath + '/' + file)
		console.log(modelsPath + '/' + file);
	}
})
//mongoose promise 风格 [mongoose.Promise = global.Promise]
mongoose.Promise = require('bluebird')

module.exports = mongoose