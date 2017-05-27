const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const Model = require('../src/server/model/model.js')
let db;

class Db {
	async connect() {
		if(!db) {
			db = await MongoClient.connect(config.db.url)
			this.apiData = new Model(db, "apis")
		}
	}
}

module.exports = new Db()