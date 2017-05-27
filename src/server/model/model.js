class Module {
	constructor(db, collectionName) {
		this.db = db;
		this.name = collectionName;
	}

	async insertOne (data) {
		const operation = await this.db.collection(this.name).insertOne(data);
		if (operation.result.ok !== 1 || operation.ops.lenght !== 1) {
			throw new Error("Data base insert api failed !");
		}
		return operation.ops[0];
	}
}

module.exports = Module