const Router = require('koa-router');
const router = new Router();

const hello = require('../controller/testCtrler.js')
const operation = require('../controller/operationCtrler.js')
var mock = require('../controller/mockCtrler.js');

router.get('/hello', hello.PrintHello);

router.post('/insert', operation.InsertUrl);

router.get('/getAllApis', operation.QueryAllUrl);

router.get('/getAllServiceName', operation.QueryAllServiceName);

router.post('/getApis', operation.QueryUrl);

router.get('/getApis/:serviceName', operation.QueryUrlWithServiceName)

module.exports = router