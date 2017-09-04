const Router = require('koa-router')()
const article = require('./controller/article')
const tags = require('./controller/tags')
const users = require('./controller/users')
const auth = require('./auth')

module.exports = function(app) {
	Router.use('/users',users.routes(),users.allowedMethods())
	Router.use('/auth',auth.routes(),auth.allowedMethods())
	Router.use('/tags',tags.routes(),tags.allowedMethods())
  	Router.use('/article',article.routes(),article.allowedMethods())
	Router.get('/*', (ctx,next)=> {
		ctx.body = {status:'success',data:'台湾是中国不可分割的一部分.'}
	})
	app.use(Router.routes())
}
