const _ = require('lodash')
const mongoose = require('mongoose')
const Article = mongoose.model('Article')
const MarkdownIt = require('markdown-it')

exports.getBoot = async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2111!'
  })
}

//添加博客
exports.addArticle = async (ctx,next) => {
	const content = ctx.request.body.content
	const excerpt = content.substr(0, 140);
	// const status = ctx.request.body.status
	const title = ctx.request.body.title
	// console.log(ctx.request.body.);
	console.log(title);
	let error_msg
	if(!title){
		error_msg = '标题不能为空.'
	}else if(!content){
		error_msg = '内容不能为空.'
	}
	if(error_msg){
		ctx.status = 422
		return ctx.body = {error_msg:error_msg}
	}
	// 添加摘要
	ctx.request.body.excerpt = excerpt;
	console.log(ctx.request.body);
	//将图片提取存入images,缩略图调用
	// ctx.request.body.images = tools.extractImage(content)
	try{
		const result = await Article.create(ctx.request.body)
		ctx.status = 200
		ctx.body = {success: true,article_id:result._id}
	}catch(err){
		ctx.throw(err)
	}
}


//前台获取博客列表
exports.getFrontArticleList = async (ctx,next)=>{
	let currentPage = (parseInt(ctx.query.currentPage) > 0)?parseInt(ctx.query.currentPage):1
	let itemsPerPage = (parseInt(ctx.query.itemsPerPage) > 0)?parseInt(ctx.query.itemsPerPage):10
	let startRow = (currentPage - 1) * itemsPerPage
	let sort = String(ctx.query.sortName) || 'publish_time'
	sort = '-' + sort
	let condition = {status:{$gt:0}}
	if(ctx.query.tagId){
		//tagId = new mongoose.Types.ObjectId(tagId)
		const tagId = String(ctx.query.tagId)
		condition = _.defaults(condition,{ tags: { $elemMatch: { $eq:tagId } } })		
	}
	try{
		const list = await Article.find(condition)
			.select('title images visit_count comment_count like_count publish_time content excerpt')
			.skip(startRow)
			.limit(itemsPerPage)
			.sort(sort)
			.exec()
		ctx.status = 200
		ctx.body = {data:list}
	}catch(err){
		ctx.throw(err)
	}
}

//获取单篇博客
exports.getArticle = async (ctx,next)=>{
	const id = ctx.params.id
	try{
		const article = await Article.findOne({_id:id}).populate('tags').exec()
		ctx.status = 200
		ctx.body = {data:article}
	}catch(err){
		ctx.throw(err)
	}
}

//前台获取文章
exports.getFrontArticle = async (ctx,next)=>{
	const id = ctx.params.id
	const md = new MarkdownIt({
		html:true //启用html标记转换
	})
	//每次获取之后,将阅读数加1
	try{
		let result = await Article.findById(id,'-images')
		result.content = md.render(result.content)
		result.visit_count++
		await Article.findByIdAndUpdate(id,{$inc:{visit_count:1}})
		ctx.status = 200
		ctx.body = {data:result.info}
	}catch(err){
		ctx.throw(err)
	}
}