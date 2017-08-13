const router = require('koa-router')()
const controller = require('./article.controller')

// router.prefix('/article')

//后台管理

// 添加文章
router.post('/addArticle',controller.addArticle)

router.get('/',controller.getBoot);
// 获取文章列表
router.get('/getFrontArticleList',controller.getFrontArticleList)

module.exports = router