<style>

.home_content .body {
	height: 100%;
	margin: 45px 2%;
	padding: 40px 20px 0;
	overflow: hidden;
}
#keyword{
	position: relative;
	display: inline-block;
	vertical-align: top;
}
#selectService {
	width: 350px;
	padding: 5px 6px;
	border-radius: 2px;
	list-style-type: none;
	background-color: #FFFFF0;
	height: 35px;
	overflow: hidden;
	border-style:  none;
	line-height: 25px;
	font-size: 20px;
}

#skw_icon {
	position: absolute;
	display: inline;
	top: 5px;
	right: 5px;
}
#skw_icon i{
	font-size: 12px !important;
	font-weight: bold;
}
.placeholder{
	display: none;
}
</style>


<template>

	<div class="home_content">
		
		<headBar checkTab="service"></headBar>

		<div class="body">
			<div id="keyword">
				<select id="selectService" @change="getApis">
					<option v-for="item in options" :key="item" :value="item">{{item}}</option>
				</select>
				<!--<div id="skw_icon">
					<i class="icon iconfont icon-down_arrow_icon"></i>
				</div>-->
			</div>
		</div>

			
	</div>

</template>


<script>
	// const handler = require('../../lib/handleAjax.js')
	const Service = require('../../service/service.js')
	const hljs = require('highlight.js')
	module.exports = {
		data: function () {
			return {
				EL_selectService: document.getElementById('selectService'),
				serviceName: "",
				options: [],
			}
		},
		created:function () {
			let vm = this;
			this.serviceName = this.$route.params.name? this.$route.params.name : "";
			Service.getAllServiceName().then(function (res) {
  				vm.options = res.data;
				setTimeout(function(){
					if(vm.serviceName){
						let $option = document.getElementById('selectService');
						for (let i=0; i < $option.length; i++) {
							console.log(vm.serviceName == $option[i].value)
							if(vm.serviceName == $option[i].value){
								$option[i].selected = true;
							}
						}
					}
				},10)
  			}, function (err) {
  				vm.options = []
  			})
		},
		mounted: function () {
			
			this.getApis()
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
			getApis:function (serviceName) {
				let vm = this,
					$option = document.getElementById('selectService');
				var sn;
				if(serviceName){
					sn = selectService;
				} else {
					for(let i=0; i<$option.length; i++){
						
					}
				}
				console.log('-->',sn)
			}
		}
	}
</script>