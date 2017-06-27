var request = require('../lib/request.js');
var op = require('object-path');

exports.getAllapis = function (options) {
  return new Promise(function (resolve, reject) {
    request.get('/api/getAllApis')
      .set('content-Type','application/json')
      .end(function (err, res) {
        if (err) {
          return reject(err);
        }
        return resolve(op.get(res, 'body'));
      });
  });;
};

exports.searchApi = function (options) {
  return new Promise(function (resolve, reject) {
    request.post('/api/getApis')
      .set('content-Type','application/json')
      .send(options)
      .end(function (err, res) {
        if (err) {
          return reject(err);
        }
        return resolve(op.get(res, 'body'));
      });
  });;
};