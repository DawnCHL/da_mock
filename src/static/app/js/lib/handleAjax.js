var op = require('object-path');
var HomeService = require('../service/home.js');

exports.GetSearchRes = function (data) {
	  
  return AuthService.login(user).then(function (body) {
    body = op(body);
    if (body.get('status') !==0) {
      return bus.emit(CONSTANT.AUTH_LOGIN_ERROR, body.get('msg'));
    }
    var data = body.get('data');
    return user;
  }, function (err) {
    return err;
};