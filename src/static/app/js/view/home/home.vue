<style>

.home_content .body {
	height: 100%;
	margin: 45px 2%;
	padding: 40px 20px 0;
	overflow: hidden;

	background-color: #404040;
}
</style>


<template>

	<div class="home_content">
		
		<headBar></headBar>

		<div class="body">

			<div class="search_form">
				<searhInput></searhInput>
			</div>

			<div class="card_zone">
				<serviceCard></serviceCard>
			</div>

		</div>

	</div>

</template>


<script>

	module.exports = {
		data: function () {
			return {
				status: 0
			}
		},
		mounted: function () {
			console.log('gua')
		},
		components: {
			'headBar': require('../component/headBar.vue'),
			'searhInput': require('./searchInput.vue'),
			'serviceCard': require('./serviceCard.vue')
		},
		methods: {
			
		}
	}
</script>