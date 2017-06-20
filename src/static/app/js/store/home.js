import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex);

const state = {
	apiList: [],
	searchType: 1,
	apiItem: {}
}

const mutations = {
	INIT_HOME_STATE (state, data) {
		state.apiList = data.state;
		state.searchType = data.state;
		state.apiItem = data.state;
	},

	QUERY_HOME_API_LIST (state, resData) {
		state.apiList = resData;
	}

	CHANGE_SEARCH_TYPE (state, type){
		state.searchType = type;
	}

	EDIT_API_ITEM (state, data){
		state.apiItem = data
	}
}

export cosnt getApiList = (state) => {
	return state.apiList;
}

export cosnt getSearchType = (state) => {
	return state.searchType;
}

export cosnt getApiItem = (state) => {
	return state.apiItem;
}