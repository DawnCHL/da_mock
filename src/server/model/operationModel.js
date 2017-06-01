const resCode = require("../constant/resCode.js")

class OperationModel {
	constructor(status,msg,data) {
		this.status = status;
		this.msg = msg;
		this.data = data;
	}

	result() {
		this.res = new resCode("SUCCESS", this.data)
	}
}

module.exports = OperationModel