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
			<div class="title">{{item.apiName}}</div>
		</div>
		
	</div>
</template>

<script>
	module.exports = {
		data: function () {
			return {
				searchType: 1,
				item: {}
			}
		},
		props:['type','data'],
		created: function () {
			this.searchType = this.$props.type;
			this.item = this.$props.data
			console.log('item: ',this.item)
		},
		mounted: function () {
			
		},
		methods: {
		
		}
	}
</script>
