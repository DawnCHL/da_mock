const resCode = require("../constant/resCode.js")

class Module {
	constructor(db, collectionName) {
		this.db = db;
		this.name = collectionName;
	}

	async insertOne (data) {
		const operation = await this.db.collection(this.name).insertOne(data)
		console.info("FUNCTION insertOne ,Result==> ",operation.result)
		console.info("FUNCTION insertOne ,ops==> ",operation.ops)
		if (operation.result.ok !== 1) {
			// throw new Error("Data base insert api failed !");
			return new resCode("DATA_INSERT_FAIL", {}).resultBody()
		}
		return new resCode("SUCCESS", {}).resultBody()
	}

	async getAllApi (data) {
		//getAllApi
	}

	async findApi (data) {
		//findOne
	}
}

module.exports = Module