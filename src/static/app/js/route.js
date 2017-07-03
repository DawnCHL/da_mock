const indexView = require('./view/index/index.vue')
const homeView = require('./view/home/home.vue')
const addView = require('./view/add/index.vue')
const serviceView = require('./view/service/index.vue')

module.exports =  [
	{	path: '/',
		component: indexView,
		name: 'index'
	},
	{
		path: '/index',
		component: indexView,
		name: 'index'
	},
	{
		path: '/home',
		component: homeView,
		name: 'home'
	},
	{
		path: '/add',
		component: addView,
		name: 'add api'
	},
	{
		path: '/service',
		component: serviceView,
		name: 'service'
	},
	{
		path: '/service/:name',
		component: serviceView,
		name: 'service'
	},
]