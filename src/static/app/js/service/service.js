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

exports.getServiceApi = function (serviceName) {
  var url = '/api/getApis/' + serviceName
  return new Promise(function (resolve, reject) {
    request.get(url)
      .set('content-Type','application/json')
      .end(function (err, res) {
        if (err) {
          return reject(err);
        }
        return resolve(op.get(res, 'body'));
      });
  });;
};

exports.deletApi = function (id) {
  return new Promise(function (resolve, reject) {
    request.get('/api/delete?id='+id)
      .set('content-Type','application/json')
      .end(function (err, res) {
        if (err) {
          return reject(err);
        }
        return resolve(op.get(res, 'body'));
      });
  });;
};