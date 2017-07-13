var path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const router = new Router();
const bodyParser = require('koa-bodyparser');
// const config = require('config');
const db = require('./src/server/model/db.js');
const render = require('koa-views');
const serve = require('koa-static');
const mount = require('koa-mount');
const config = require('./config/local.js')


const app = new Koa();

app.use(render(path.join(__dirname, "./src/page"), { default: 'html' }))
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


// static files
app.use(mount('/static',
    serve(path.join( __dirname, config.static_path))
 )).use(mount('/pure',
    serve(path.join( __dirname, config.pure_path))
 ));
// app.use(mount('/static',
//     serve(path.join( __dirname, config.get('static_path')))
//  )).use(mount('/pure',
//     serve(path.join( __dirname, config.get('pure_path')))
//  ));


db.connect().then(() => {
	app.listen(config.port, () => {
		console.info(`Listening to http://localhost:${config.port}`);
		console.info("process.env.NODE_ENV=", process.env.NODE_ENV)
	});
}).catch(err => {
    app.listen(config.port, () => {
		console.info(`Listening to http://localhost:${config.port}`);
		console.info("process.env.NODE_ENV=", process.env.NODE_ENV)
	});
	console.error('DB CONNECT FAIL ,ERR:', err);
});