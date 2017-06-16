var op = require('object-path');
var HomeService = require('../service/home.js');

exports.GetAllApis = function () {
  return HomeService.getAllapis().then(function (res) {
    console.log('res: ',res)
    return res.data;
  }, function (err) {
    return err;
  })
}

exports.GetSearchRes = function (data) {
  return HomeService.searchApi(data).then(function (res) {
    return res.data;
  }, function (err) {
    return err;
  })
}