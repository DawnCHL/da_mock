var request = require('../lib/request.js');
var op = require('object-path');

exports.searchApi = function (options) {
  return new Promise(function (resolve, reject) {
    request.post('/api/getApis')
      .set('content-Type','application/json')
      .send({
        apiName: options.apiName,
        searchType: options.searchType,
      })
      .end(function (err, res) {
        if (err) {
          return reject(err);
        }
        resolve(op.get(res, 'body'));
      });
  });;
};