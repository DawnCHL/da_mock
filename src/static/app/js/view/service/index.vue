<style>
#service_content{
	height: 85%;
}
#service_content .body {
	margin: 45px 2%;
	padding: 40px 20px 0;
	overflow: hidden;
	display: flex;
	position: relative;
	height: 100%;
}
#service_content .body #left{
	float: left;
	display: inline-block;
	left: 0;
}
#service_content .body #right{
	float: right;
	right: 0;
}
#service_content .api_detail_zone{
	width: 950px;
	height: 100%;
	overflow: auto;
	margin-top: 65px;
	margin-left: 30px;
	background-color: #FFFFF0;
	padding: 16px;
}
#service_content #keyword{
	position: relative;
	display: inline-block;
	vertical-align: top;
}
#service_content #selectService {
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

#service_content #skw_icon {
	position: absolute;
	display: inline;
	top: 5px;
	right: 5px;
}
#service_content #skw_icon i{
	font-size: 12px !important;
	font-weight: bold;
}
#service_content .placeholder{
	display: none;
}

#service_content #api_list_zone{
	width: 750px;
	height: 100%;
	overflow: auto;
	margin-top: 30px;
	background-color: #FFFFF0;
}
#service_content #api_list_zone ul{
	list-style: none;
	padding: 0;
}
#service_content #api_list_zone li{
	height: 50px;
	padding: 0 10px;
	margin: 0 10px;
	text-align: left;
	line-height: 50px;
	border-bottom: 1px solid Gainsboro;
	position: relative;
}
#service_content #api_list_zone li:hover{
	background-color: #FAFAD2;
	cursor: pointer;
}
#service_content .del-icon{
	position: absolute;
	display: inline;
	top: 5px;
	right: 25px;
	font-weight: bolder;
	color: #d9534f;
	width: 30px;
	height: 30px;
	text-align: center;
}
#service_content #api_list_zone .title{
	font-weight: bolder;
	display: inline-block;
	margin-right: 3px;
}
#service_content label {
	width: 10%;
	display: inline-block;
	text-align: right;
	margin: 0 10px;
	font-weight: bold;
}
#service_content .respond {
	resize: none;
	border-radius: 2px;
	display: inline-block;
}
#service_content .jsonCode{
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
</style>


<template>

	<div id="service_content">
		
		<headBar checkTab="service"></headBar>
		<div class="body">
			<div id="left">
				<div id="keyword">
					<select id="selectService" @change="getApis()">
						<option v-for="item in options" :key="item" :value="item">{{item}}</option>
					</select>
				</div>
				<div id="api_list_zone">
					<ul id="apiList">
						<li v-for="(api,index) in list" :key="index"
							@click.prevent="shouApiDetail(index)">
							<span class="title">{{api.apiName}}: &nbsp;</span>
							<span>{{api.serviceName}}{{api.apiUrl}}</span>
							<div class="del-icon" @click.prevent="deletApi(api._id)">
								<i class="icon iconfont icon-dustbin_icon"></i>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div id="right" class="api_detail_zone">
				<form>
					<div class="rol">
						<label>title</label>
						<input type="text" class="textInput" name="title" id="title" :value="api.apiName"></input>
					</div>
					<div class="rol">
						<label>url</label>
						<input type="text" class="textInput" name="url" id="url" :value="api.apiUrl"></input>
					</div>
					<div class="rol">
						<label>service</label>
						<input type="text" class="textInput" name="service" id="service" :value="api.serviceName" disabled></input>
					</div>
					<div class="rol">
						<label>method</label>
						<input type="radio" class="textInput" name="method" value="GET" :checked="api.method=='GET'?'checked':''">GET</input>
						<input type="radio" class="textInput" name="method" value="POST" :checked="api.method=='POST'?'checked':''">POST</input>
						<input type="radio" class="textInput" name="method" value="PUT" :checked="api.method=='PUT'?'checked':''">PUT</input>
						<input type="radio" class="textInput" name="method" value="DEL" :checked="api.method=='DEL'?'checked':''">DEL</input>
					</div>
					<div class="rol">
						<label style="vertical-align:top">respond</label>
						<div class="jsonCode" v-show="false">
							<pre v-highlight="api.respond"></pre>
						</div>
						<textarea name="respond" id="respond" class="respond textArea" rows="20" cols="100">{{api.respond}}</textarea>
					</div>
				</form>
				<div style="float:right;margin-top:20px;">
					<button class="D-btn D-btn-green" @click="save(api._id)">confirm</button>
				</div>
			</div>
		</div>		
	</div>

</template>


<script>
	const HomeService = require('../../service/home.js')
	const Service = require('../../service/service.js')
	const hljs = require('highlight.js')
	module.exports = {
		data: function () {
			return {
				EL_selectService: document.getElementById('selectService'),
				serviceName: "",
				options: [],
				list: [],
				api: {}
			}
		},
		created:function () {
			let vm = this;
			this.serviceName = this.$route.params.name? this.$route.params.name : "";
			this.getOptions();
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
			getOptions:function () {
				let vm = this;
				Service.getAllServiceName().then(function (res) {
  					vm.options = res.data;
					setTimeout(function(){
						if(vm.serviceName){
							vm.getApis(vm.serviceName)
							let $option = document.getElementById('selectService');
							for (let i=0; i < $option.length; i++) {
								// console.log(vm.serviceName == $option[i].value)
								if(vm.serviceName == $option[i].value){
									$option[i].selected = true;
								}
							}
						} else {
							vm.getApis()
						}
					},10)
  				}, function (err) {
  					vm.options = []
  				})
			},
			getApis:function (serviceName) {
				let vm = this;
				var sn;
				if (serviceName){
					sn = serviceName;
				}else{
					let $option = document.getElementById('selectService');
					for (let i=0; i < $option.length; i++) {
						if($option[i].selected){
							sn = $option[i].value;
						}
					}
				}
				Service.getServiceApi(sn).then(function (res) {
  					vm.list = res.data;
					if (vm.list.length){
						vm.api = vm.list[0];
					}
					// console.log(vm.list)
					// console.log(vm.api)
  				}, function (err) {
  					vm.list = []
  				})
			},
			shouApiDetail:function (index) {
				let vm = this;
				console.log(index)
				vm.api = vm.list[index];
			},
			deletApi:function (id) {
				let vm = this;
				console.log(id);
				Service.deletApi(id).then(function (res) {
  					setTimeout(function(){
						vm.getApis()
					},10)
  				}, function (err) {
  					alert(err);
  				})
			},
			save:function (id) {
				let vm = this;
				let respondData = eval('(' + document.getElementById('respond').value + ')');
				console.log( 'method',document.getElementsByName('method') )
				let $method= document.getElementsByName('method');
				for(let i=0; i< $method.length; i++) {
					if ($method[i].checked == true){
						var method_radio = $method[i].value;
						break;
					}
				}
				let reqdata = {
			    "id": id,
			    "data":{
			    	"serviceName": document.getElementById('service').value,
			    	"apiUrl": document.getElementById('url').value,
			    	"apiName": document.getElementById('title').value,
			    	"method": method_radio,
			    	"respond": respondData,
			    	}
			    }
				HomeService.editApi(reqdata).then(function (res) {
					vm.getApis()
  				}, function (err) {
					  alert('err!')
  				})
			}
		}
	}
</script>