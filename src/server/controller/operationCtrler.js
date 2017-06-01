// 'use script'
const db = require('../model/db.js');


// POST
// {
// 	"serviceName": "test",
// 	"apiUrl": "/api/test",
// 	"method": "GET",
// 	"respond": {
// 		"msg": 200
// 	}
// }

exports.InsertUrl = async (ctx, next) => {
	let data = ctx.request.body;
	ctx.body = await db.apiData.insertOne(data)
}