
module.exports = {
	"host": "localhost",
	"port": 8194,
	"env": "prod",
	"db": {
		"url": "mongodb://apiDB:27017/data"
	},
	"log": {
		"errorLog": "../logs/errorLog",
		"resLog": "../logs/resLog"
	},
	"view_path": "../src/page/",
	"static_path": "./src/static/app",
	"pure_path": "./src/static/pure",
	"favicon_path": "../src/static/pure/favicon.ico"
}