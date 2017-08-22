// @flow

'use script'

// const _ = require('lodash')

exports.PrintHello = function (ctx:any) {
	ctx.body = {
		'hello': 'world'
	}
}
