<style>
/*body{
	background-color: #FFF !important;
}*/

.home_content .body {
	height: 100%;
	margin: 45px 2%;
	padding: 40px 20px 0;
	overflow: hidden;
	/*background-color: #404040;*/
}
.home_content .card_zone {
	width: 100%;
}
</style>


<template>

	<div class="home_content">
		
		<headBar></headBar>

		<div class="body">

			<div class="search_form">
				<searhInput ref="searchType" v-on:scrolltoChange='getChanges'></searhInput>
			</div>

			<div class="card_zone" ref="searchType" v-on:inputChange='getNewData' >
				<card v-for="data in list" :type='type' :data="data" key="data.id"></card>
			</div>

		</div>

	</div>

</template>


<script>
	const handler = require('../../lib/handleAjax.js')
	const HomeService = require('../../service/home.js')
	
	module.exports = {
		data: function () {
			return {
				type: 1,
				list: []
			}
		},
		mounted: function () {
			let vm = this;
			this.getChanges();
			// let res = handler.GetAllApis().apiArray;
			HomeService.getAllapis().then(function (res) {
  		  console.log('res: ',res)
  			vm.list = res.data.apiArray;
  		}, function (err) {
  			vm.list = []
  		})
		},
		watch: {
			
		},
		components: {
			'headBar': require('../component/headBar.vue'),
			'searhInput': require('./searchInput.vue'),
			'card': require('./serviceCard.vue')
		},
		methods: {
			getChanges: function () {
				let vm = this;
				setTimeout(()=>{
					vm.type = vm.$refs.searchType.searchType
				},10)
			},
			getNewData: function () {
				vm.list = vm.$refs.searchType.resData
			}
		}
	}
</script>