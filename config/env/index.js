'use strict'

var path = require('path')
var _ = require('lodash')
var fs = require('fs')

var all = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 9000,

  session:{
    secrets: 'shudong-secret',
  },
    //redis 配置
  redis: {
    host: process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1',
    port: process.env.REDIS_PORT_6379_TCP_PORT || 6379,
    password: process.env.REDIS_PASSWORD || ''
  },
  //用户角色种类
  userRoles: ['user', 'admin']
}

var config = _.merge(all,require('./' + process.env.NODE_ENV + '.js') || {})
//加载私有配置
if (fs.existsSync(path.join(__dirname, 'private/index.js'))) {
  config = _.merge(config, require(path.join(__dirname, 'private/index.js')) || {})  
}
module.exports = config
