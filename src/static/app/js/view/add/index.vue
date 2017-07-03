<style>

.home_content .body {
	height: 100%;
	margin: 45px 2%;
	padding: 40px 20px 0;
	overflow: hidden;
}

</style>


<template>

	<div class="home_content">
		
		<headBar checkTab="add"></headBar>

		<div class="body"></div>

			
	</div>

</template>


<script>
	// const handler = require('../../lib/handleAjax.js')
	// const HomeService = require('../../service/home.js')
	const hljs = require('highlight.js')
	module.exports = {
		data: function () {
			return {

			}
		},
		mounted: function () {

		},	
		watch: {

		},
		components: {
			'headBar': require('../component/headBar.vue')
		},
		directives: {
    		highlight: function(el, binding) {
		    	if (binding.value) {
		    	  let value = null
		    	  if (typeof(binding.value) === "string") {
		    	      value = binding.value
		    	  } else {
		    	      value = JSON.stringify(binding.value, null, 4)
		    	  }
		    	  el.innerHTML = hljs.highlight("json", value, true).value
		    	}
		  	}
		},
		methods: {
			
		}
	}
</script>