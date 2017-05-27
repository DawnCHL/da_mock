'use script'

// const _ = require('lodash')

exports.InsertUrl = async (ctx, next) => {
	console.log("ctx: ",ctx)
	let serviceName = ctx.request.body.serviceName;
	let apiUrl = ctx.request.body.apiUrl;
	let method = ctx.request.body.method;
	let resData = ctx.request.body.resData;

	let data = ctx.request.body;
	ctx.body = await db.Data.insertOne(data)
}