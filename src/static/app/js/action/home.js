const HomeService = require('../../service/home.js')

function makeAction(type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args);
};

export const initStore = ({ dispatch }) => {
	HomeService.getAllapis().then(function (res) {
		var list = res.data.apiArray;
	}, function (err) {
		var list = []
	})
  dispatch('QUERY_HOME_API_LIST', list);
};

export const initStore = ({ dispatch }) => {
	HomeService.getAllapis().then(function (res) {
		var list = res.data.apiArray;
	}, function (err) {
		var list = []
	})
  dispatch('QUERY_HOME_API_LIST', list);
};