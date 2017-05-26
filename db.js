const MongoClient = require('mongodb').MongoClient;
const config = require('config');
 
module.exports = {
	connect: async () => {
		await MongoClient.connect(config.db.url);
	}
};