const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const Model = require('./model.js')
let db;

class Db {
	async connect() {
		if(!db) {
			db = await MongoClient.connect(config.db.url)
			this.apiData = new Model(db, "data")
		}
	}
}

module.exports = new Db()