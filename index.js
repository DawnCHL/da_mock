var path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const router = new Router();
const bodyParser = require('koa-bodyparser');
const config = require('config');
const db = require('./src/server/model/db.js');
const render = require('koa-views');
// const serve = require('koa-static');

const app = new Koa();
app.use(render(path.join(__dirname, "./src/page"), { default: 'html' }))
   // .use(serve("./src/static/app"))
	 .use(bodyParser());

//web
router.get('/', async (ctx)=> {
	await ctx.render('index',{
		title: "Da Mock"
	})
})


//back end api & mock api
const Api_router = require('./src/server/router/router.js');
const Mock_router = require('./src/server/router/mockRouter.js');
router.use('/api', Api_router.routes(), Api_router.allowedMethods())
			.use('/mock', Mock_router.routes(), Mock_router.allowedMethods());
app.use(router.routes());

db.connect().then(() => {
	app.listen(config.port, () => {
		console.info(`Listening to http://localhost:${config.port}`);
	});
}).catch(err => {
	console.error('DB CONNECT FAIL ,ERR:', err);
});