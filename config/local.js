const local = require('./dev.js')
const prod = require('./production.js')

module.exports = (function(){
	if (process.env.NODE_ENV == "prod"){
		return prod
	}else{
		return local
	}
})()


