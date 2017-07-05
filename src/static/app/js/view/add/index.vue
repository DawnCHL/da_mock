<style>

.add_content .body {
	height: 100%;
	margin: 100px 2%;
	padding: 40px 20px 0;
	overflow: hidden;
	background-color: #FFFFF0;
	
}
.add_content label {
	width: 10%;
	display: inline-block;
	text-align: right;
	margin: 0 10px;
	font-weight: bold;
}
.add_content .respond {
	resize: none;
	border-radius: 2px;
	display: inline-block;
}
.add_content .jsonCode{
	font-family: serif;
	background-color: #2D2D2D;
	color: #FFF;
	border-radius: 4px;
	padding: 5px;
	margin: 5px 0;
	display: block;
	height: 60%;
	overflow-y: auto;
}
.add_content .add_body {
	margin: 0 auto;
	width: 900px;
	background-color: #FFFFF0;
}
</style>


<template>

	<div class="add_content">
		
		<headBar checkTab="add"></headBar>

		<div class="body">
			<div class="add_body">
				<form>
					<div class="rol">
						<label>title</label>
						<input type="text" class="textInput" name="title" id="title"></input>
					</div>
					<div class="rol">
						<label>url</label>
						<input type="text" class="textInput" name="url" id="url"></input>
					</div>
					<div class="rol">
						<label>service</label>
						<input type="text" class="textInput" name="service" id="service"></input>
					</div>
					<div class="rol">
						<label>method</label>
						<input type="radio" class="textInput" name="method" value="GET">GET</input>
						<input type="radio" class="textInput" name="method" value="POST">POST</input>
						<input type="radio" class="textInput" name="method" value="PUT">PUT</input>
						<input type="radio" class="textInput" name="method" value="DEL">DEL</input>
					</div>
					<div class="rol">
						<label style="vertical-align:top">respond</label>
						<div class="jsonCode" v-show="false">
							<pre v-highlight="123"></pre>
						</div>
						<textarea name="respond" id="respond" class="respond textArea" rows="20" cols="100"></textarea>
					</div>
				</form>
				<div style="float:right;margin:20px 0;">
					<button class="D-btn D-btn-green" @click="save">confirm</button>
				</div>
			</div>
		</div>

			
	</div>

</template>


<script>
	// const handler = require('../../lib/handleAjax.js')
	const addService = require('../../service/add.js')
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
			save:function(){
				let vm = this;
				let respondData =  document.getElementById('respond').value!=""? eval('(' + document.getElementById('respond').value + ')') : {};
				console.log( 'method',document.getElementsByName('method') )
				let $method= document.getElementsByName('method');
				for(let i=0; i< $method.length; i++) {
					if ($method[i].checked == true){
						var method_radio = $method[i].value;
						break;
					}
				}
				let reqdata = {
			    	"serviceName": document.getElementById('service').value,
			    	"apiUrl": document.getElementById('url').value,
			    	"apiName": document.getElementById('title').value,
			    	"method": method_radio,
			    	"respond": respondData
			    }
				addService.addApi(reqdata).then(function (res) {
					vm.$router.push('/home')
  				}, function (err) {
					  alert('err!')
  				})
			}
		}
	}
</script>