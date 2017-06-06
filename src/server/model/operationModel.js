const resCode = require("../constant/resCode.js")
const _ = require('lodash')
const ObjectID = require('mongodb').ObjectID;

class OperationModule {
	constructor(db, collectionName) {
		this.db = db;
		this.name = collectionName;
	}

	async insertOne (data) {
		//insert api
		let operation = await this.db.collection(this.name).insertOne(data)
		console.info("FUNCTION insertOne ,Result==> ",operation.result)
		console.info("FUNCTION insertOne ,ops==> ",operation.ops)
		if (operation.result.ok !== 1) {
			// throw new Error("Data base insert api failed !");
			return new resCode("DATA_INSERT_FAIL", {}).resultBody()
		}
		return new resCode("SUCCESS", {}).resultBody()
	}

	async removeApi (id) {
		//remove an api
		let reqData = {
			"_id": ObjectID(id),
		}
		let res = await this.db.collection(this.name).remove(reqData)
		console.info("FUNCTION removeApi ,Result==> ",res.result)
		if (res.result.ok !== 1) {
			return new resCode("DATA_DELETE_FAIL", {}).resultBody()
		}
		if (res.result.n !== 1) {
			return new resCode("DATA_DELETE_AGAIN_FAIL", {}).resultBody()
		}
		return new resCode("SUCCESS", {}).resultBody()
	}

	async updateApi (id, data) {
		// update an api
		let changeId = {_id:ObjectID(id)},
				modify = {$set: data};
		let res = await this.db
										.collection(this.name)
										.findOneAndUpdate(changeId, modify)
		console.info("FUNCTION updateApi ,Result==> ",res)
		if (!res.value) {
			return new resCode("DATA_UPDATE_FAIL", {}).resultBody()
		}
		return new resCode("SUCCESS", {}).resultBody()
	}

	async getAllServiceName () {
		let allServiceName = await this.db
										.collection(this.name)
										.find({},{serviceName:1}).toArray()
		if (allServiceName.length == 0) {
			return new resCode("RESULT_NOT_FOUND", {}).resultBody()
		}
		let serviceNameList = []
		for( let i=0; i<allServiceName.length; i++){
			serviceNameList.push(allServiceName[i].serviceName)
		}
		serviceNameList = _.uniq(serviceNameList)
		return new resCode("SUCCESS", serviceNameList).resultBody()
	}

	async getAllApi () {
		//getAllApi
		let allApis = await this.db.collection(this.name).find().toArray()
		console.info("FUNCTION getAllApi ,allApis==> ",allApis)
		let res = {
			apiArray: allApis,
			total: allApis.length
		}
		if (allApis.length == 0) {
			return new resCode("RESULT_NOT_FOUND", {}).resultBody()
		}
		return new resCode("SUCCESS", res).resultBody()
	}

	async findApi (data) {
		// findOne
		console.info("FUNCTION findApi ,data==> ",data)
		let api = await this.db.collection(this.name).find(data).toArray()
		console.info("FUNCTION findApi ,api==> ",api)
		let res = {
			apiArray: api,
			total: api.length
		}
		if (api.length == 0) {
			return new resCode("RESULT_NOT_FOUND", {}).resultBody()
		}
		return new resCode("SUCCESS", res).resultBody()
	}
	
	async mockApi (data) {
		// mockApi
		console.info("FUNCTION findApi ,data==> ",data)
		let api = await this.db.collection(this.name).find(data).toArray()
		console.info("FUNCTION findApi ,api==> ",api)
		let res = api[0]
		if (api.length == 0) {
			console.log("API NOT FOUND")
			return new resCode("RESULT_NOT_FOUND", {}).resultBody()
		}
		return new resCode("SUCCESS", res).resultBody()
	}

	async getUrlWithServiceName (data) {
		let apiList = await this.db.collection(this.name).find(data).toArray()
		if (apiList.length == 0) {
			console.log("API NOT FOUND")
			return new resCode("RESULT_NOT_FOUND", {}).resultBody()
		}
		return new resCode("SUCCESS", apiList).resultBody()
	}

}

module.exports = OperationModule