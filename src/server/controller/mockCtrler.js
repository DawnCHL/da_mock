const _ = require('lodash')
const db = require('../model/db.js');
const resCode = require('../constant/resCode.js')

exports.MockGetQuery = async (ctx, next) => {
	let reqUrl = ctx.url,
			serviceName = ctx.params.serviceName,
			api = reqUrl.split('/').slice(3).join('/'),
			reqData = {};
	reqData.serviceName = serviceName;
	if ( api != '' )  {
		reqData.apiUrl = '/' + api
	} else {
		ctx.body = new resCode("PARAMETER_NOT_ENOUGH_ERROR", {}).resultBody()
	}
	let res = await db.apiData.mockApi(reqData)
	console.log("@@@@@@ CTX ==>", ctx.method)
	console.log("@@@@@@ res ==>", res)
	if ( res.status != 0 ){
		ctx.body = 'Not Found'	
		return;
	}
	if ( ctx.method != res.data.method ) {
		ctx.body = 'Not Found'	
		return;
	}
	ctx.body = res.data.respond
}