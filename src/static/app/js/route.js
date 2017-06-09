module.exports = function(router) {
	router.map({
		'/': {
			title: "Da Mock",
			name: "home"
		},    		
		// For Not Found
		'*': {
			component: {
				template: 'not found'
			}
		}
	});

}