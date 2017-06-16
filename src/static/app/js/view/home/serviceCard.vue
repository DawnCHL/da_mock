<style>
	.card{
		width: 24%;
		display: inline-block;
		margin: 10px 5px 10px 0;
	}
	.card .context {
		height: 300px;
		background-color: #FFFFF0;
		overflow: hidden;
		border: 1px solid black;
		
	}
</style>

<template>
	<div class="card">
		<div class="context">
			<div class="title"></div>
		</div>
		
	</div>
</template>

<script>
	module.exports = {
		data: function () {
			return {
				searchType: 1
			}
		},
		props:['type'],
		created: function () {
			this.searchType = this.$props.type;
		},
		mounted: function () {
			
		},
		methods: {
		
		}
	}
</script>
