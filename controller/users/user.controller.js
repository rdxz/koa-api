const captcha = require('trek-captcha')

/**
 * 获取验证码
 */
exports.getCaptcha = async (ctx,next)=>{
	const { token, buffer } = await captcha({size:3})
	ctx.session.captcha = token
	console.log(ctx.session);
	ctx.status = 200
	ctx.body = buffer
}