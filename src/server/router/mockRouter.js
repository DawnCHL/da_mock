const Router = require('koa-router');
const m_router = new Router();
const mockRouter = new Router();

var mock = require('../controller/mockCtrler.js');

// mock 的接口最多有10个动态参数
let routeUrl = ""
for (let i=1; i<=10 ; i++) {
	m_router.all(routeUrl, mock.MockGetQuery)
	routeUrl += "/:apiUrl" + i 
}
mockRouter.use('/:serviceName',m_router.routes(),m_router.allowedMethods())

module.exports = mockRouter