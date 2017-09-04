const router = require('koa-router')()
const controller = require('./article.controller')

// router.prefix('/article')

//后台管理

// 添加文章
router.post('/addArticle',controller.addArticle)

router.get('/',controller.getBoot);

// 获取文章列表
router.get('/getFrontArticleList',controller.getFrontArticleList);
router.get('/:id/getFrontArticle',controller.getFrontArticle);

// 获取单篇文章
// router.get('/getFrontArticle',controller.getFrontArticle);

module.exports = router