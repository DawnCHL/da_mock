const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const config = require('config');
const db = require('./db.js')

const app = new Koa();
const router = new Router();
 
app.use(bodyParser());
const Api_router = require('../src/server/router.js')
router.use('/api', Api_router.routes(), Api_router.allowedMethods())
app.use(router.routes())

db
.connect()
.then(() => {
	app.listen(config.port, () => {
		console.info(`Listening to http://localhost:${config.port}`);
	});
})
.catch((err) => {
	console.error('ERR:', err);
});