var request = require('../lib/request.js');
var op = require('object-path');

exports.getAllServiceName = function (options) {
  return new Promise(function (resolve, reject) {
    request.get('/api/getAllServiceName')
      .set('content-Type','application/json')
      .end(function (err, res) {
        if (err) {
          return reject(err);
        }
        return resolve(op.get(res, 'body'));
      });
  });;
};