// 'use script'
const db = require('../model/db.js');
const resCode = require('../constant/resCode.js');


// POST
// {
// 	"serviceName": "test",
// 	"apiUrl": "/api/test",
// 	"method": "GET",
// 	"respond": {
// 		"msg": "success"
// 	}
// }

exports.InsertUrl = async (ctx, next) => {
	let data = ctx.request.body;
	let apiName = data.apiName,
			serviceName = data.serviceName,
			apiUrl = data.apiUrl,
			method = data.method,
			respond = data.respond;
	console.log('@@@@@#####@@@@@',data)
	if (apiName == "" || serviceName == ""  || apiUrl == ""  || method == ""  || respond == "" ){
		ctx.body = new resCode("PARAMETER_ERROR", {}).resultBody()
		return
	}
	if (apiName == undefined || serviceName == undefined  || apiUrl == undefined  || method == undefined  || respond == undefined ){
		ctx.body = new resCode("PARAMETER_NOT_ENOUGH_ERROR", {}).resultBody()
		return
	}
	let checkData = {
		"apiName" :data.apiName,
		"serviceName" :data.serviceName,
		"apiUrl" :data.apiUrl
	}
	let checkIsExist = await db.apiData.findApi(checkData)
	if ( checkIsExist.status == 0 ){
		ctx.body = new resCode("DATA_EXIST_INSERT_FAIL", {}).resultBody()
		return;
	}
	data.tags = [serviceName]
	ctx.body = await db.apiData.insertOne(data)
}

exports.QueryAllUrl = async (ctx, next) => {
	ctx.body = await db.apiData.getAllApi()
}

exports.QueryAllServiceName = async (ctx, next) => {
	ctx.body = await db.apiData.getAllServiceName()
}

// GET
// {
// 	"serviceName": "test",
// 	"apiUrl": "/api/test",
//	"apiName": "描述标题",
//	"searchType": 1
// }
// searchType: 1 - 根据标题搜索
// 						 2 - 根据Url搜索
exports.QueryUrl = async (ctx, next) => {
	let data = ctx.request.body;
	let serviceName = data.serviceName ? data.serviceName :"",
			apiUrl = data.apiUrl ? data.apiUrl :"",
			apiName = data.apiName ? data.apiName :"",
			searchType = data.searchType;
	let reqData = {}
	console.log('@@@@@#####@@@@@',data)
	if( searchType == 1 ){
		if (apiName != "" ) {
			reqData.apiName = new RegExp("^.*"+apiName+".*$")
		}
	} else if ( searchType == 2 ) {
		if ( serviceName != "" ) {
			reqData.serviceName = serviceName
		} 
		if ( apiUrl != "" ) {
			reqData.apiUrl = apiUrl
		}
	} else {
		ctx.body = new resCode("PARAMETER_LACK_SEARCH_TYPE_ERROR", {}).resultBody()
		return;
	}
	console.log('REQUREY DATA ===> ', reqData)
	let res = await db.apiData.findApi(reqData)
	ctx.body = res
}

exports.QueryUrlWithServiceName = async (ctx, next) => {
	let serviceName = ctx.params.serviceName,
			tags = {
				'tags': serviceName
			}
	ctx.body = await db.apiData.getUrlWithServiceName(tags)
}

exports.DeleteApi = async (ctx, next) => {
	let id = ctx.query.id;
	console.log(id)
	ctx.body = await db.apiData.removeApi(id)
}

//POST
//{
//	"id": "123123123123123",
//	"data":{
//		"serviceName": "test",
//		"apiUrl": "/api/test",
//		"method": "GET",
//		"respond": {
//			"msg": "success"
//		}
//	}
//}
exports.UpdateApi = async (ctx, next) => {
	let reqBody = ctx.request.body;
	let id = reqBody.id,
			apiName = reqBody.data.apiName,
			serviceName = reqBody.data.serviceName,
			apiUrl = reqBody.data.apiUrl,
			method = reqBody.data.method,
			respond = reqBody.data.respond;
	console.log('@@@@@#####@@@@@',reqBody)
	ctx.body = await db.apiData.updateApi(id, reqBody.data)
}
