const homeView = require('./view/home.vue')

module.exports =  [
	{	path: '/',
		component: homeView,
		name: 'index'
	},
	{
		path: '/home',
		component: homeView,
		name: 'index'
	}
]