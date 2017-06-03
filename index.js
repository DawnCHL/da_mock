const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const config = require('config');
// const db = require('./db.js');
const db = require('./src/server/model/db.js');

const app = new Koa();
app.use(bodyParser());
const router = new Router();

const Api_router = require('./src/server/router/router.js');
const Mock_router = require('./src/server/router/mockRouter.js');
router.use('/api', Api_router.routes(), Api_router.allowedMethods());
router.use('/mock', Mock_router.routes(), Mock_router.allowedMethods());
app.use(router.routes());

db.connect().then(() => {
	app.listen(config.port, () => {
		console.info(`Listening to http://localhost:${config.port}`);
	});
}).catch(err => {
	console.error('DB CONNECT FAIL ,ERR:', err);
});