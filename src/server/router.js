const Router = require('koa-router');
const router = new Router();

const hello = require('./controller/testCtrler.js')
const operation = require('./controller/operationCtrler.js')

// router.get('/hello', (ctx) => ctx.body = {hello: 'world'});
router.get('/hello', hello.PrintHello);

router.post('/insert', operation.InsertUrl);

module.exports = router