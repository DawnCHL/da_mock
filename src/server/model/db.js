const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const OperationModule = require('./operationModel.js')
let db;

class Db {
	async connect() {
		if(!db) {
			db = await MongoClient.connect(config.db.url)
			this.apiData = new OperationModule(db, "api_data")
		}
	}
}

module.exports = new Db()