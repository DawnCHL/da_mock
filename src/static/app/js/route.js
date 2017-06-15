const indexView = require('./view/index/index.vue')
const homeView = require('./view/home/home.vue')

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
	}
]