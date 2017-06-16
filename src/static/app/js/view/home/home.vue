<style>

.home_content .body {
	height: 100%;
	margin: 45px 2%;
	padding: 40px 20px 0;
	overflow: hidden;
	background-color: #404040;
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

			<div class="card_zone">
				<card :type='type'></card>
				<card :type='type'></card>
				<card :type='type'></card>
				<card :type='type'></card>
			</div>

		</div>

	</div>

</template>


<script>

	module.exports = {
		data: function () {
			return {
				type: 1
			}
		},
		mounted: function () {
			this.getChanges();
		},
		watch: {
			type: {
				handler: function (nv) {
					console.log("watch",this.type)
				}
			}
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
			}
		}
	}
</script>