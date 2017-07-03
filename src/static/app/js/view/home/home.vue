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
#searchInput{
	font-size: 20px;
	line-height: 25px;
	overflow: hidden;
}
#searchInput .searchType {
	width: 80px;
	padding: 5px;
	border-radius: 2px;
	cursor: ns-resize;
	list-style-type: none;
	background-color: #FFFFF0;
	height: 24px;
	overflow: hidden;
	position: relative;
	display: inline-block;
}
#searchInput ul {
	padding: 0;
	margin: 0;
}
#searchInput #st_icon {
	position: absolute;
	display: inline;
	top: 5px;
	right: 5px;
}
#searchInput #st_icon i{
	font-size: 20px !important;
	font-weight: bold;
}

#searchInput #keyword{
	position: relative;
	display: inline-block;
	vertical-align: top;
}
#searchInput #searchKeyword {
	width: 350px;
	padding: 5px 6px;
	border-radius: 2px;
	list-style-type: none;
	background-color: #FFFFF0;
	height: 24px;
	overflow: hidden;
	border-style:  none;
	line-height: 25px;
	font-size: 20px;
}

#searchInput #skw_icon {
	position: absolute;
	display: inline;
	top: 5px;
	right: 5px;
}
#searchInput #skw_icon i{
	font-size: 20px !important;
	font-weight: bold;
}
	
	.home_content .apiDetail{
		height: auto;
	}
	.apiDetail label {
		width: 10%;
		display: inline-block;
		text-align: right;
		margin: 0 10px;
	}
	.respond {
		resize: none;
		border-radius: 2px;
		display: inline-block;
	}
	.jsonCode{
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

	<div class="home_content">
		
		<headBar checkTab="home"></headBar>

		<div class="body">

			<div class="search_form">
				<!-- <searhInput ref="searchType" v-on:scrolltoChange='getChanges' v-on:inputChange='getNewData' ></searhInput> -->
				<div id="searchInput">
					<div class="searchType" 
								@mouseover="toggleShow" 
								@mouseout="toggleShow">
						<ul @mousewheel="scrolltoChange">
							<li value="1" id="li1">Title</li>
							<li value="2" id="li2">Url</li>
						</ul>
						<div v-if="showMouse"  id="st_icon">
							<i class="icon iconfont icon-mouse_icon"></i>
						</div>
					</div>
					
					<div id="keyword">
						<input id="searchKeyword" type="text" 
									:placeholder='placeholderText' 
									@keyup='inputChange'>
						<div id="skw_icon">
							<i class="icon iconfont icon-search_icon"></i>
						</div>
					</div>
					<div class="searchBtn"></div>
				</div>
			</div>
			<div class="card_zone" >
				<card v-for="detail in list" :detail="detail" :key="detail.id" ref="card" @checkDetail='checkDetail(detail)'></card>
			</div>
		</div>
		
		<D-modal class="apiDetail" title="Edit Api" v-if="showModal">
			<span slot="context">
				<form>
					<div class="rol">
						<label>title</label>
						<input type="text" class="textInput" name="title" id="title"  :value="editData.apiName"></input>
					</div>
					<div class="rol">
						<label>url</label>
						<input type="text" class="textInput" name="url" id="url" :value="editData.apiUrl"></input>
					</div>
					<div class="rol">
						<label>service</label>
						<input type="text" class="textInput" name="service" id="service" :value="editData.serviceName"></input>
					</div>
					<div class="rol">
						<label>method</label>

						<!--<D-radio name="method" val="1" style="display:none">GET</D-radio>
						<D-radio name="method" val="2" style="display:none">POST</D-radio>-->

						<input type="radio" class="textInput" name="method" value="GET" :checked="editData.method=='GET'?'checked':''">GET</input>
						<input type="radio" class="textInput" name="method" value="POST" :checked="editData.method=='POST'?'checked':''">POST</input>
						<input type="radio" class="textInput" name="method" value="PUT" :checked="editData.method=='PUT'?'checked':''">PUT</input>
						<input type="radio" class="textInput" name="method" value="DEL" :checked="editData.method=='DEL'?'checked':''">DEL</input>
					</div>
					<div class="rol">
						<label style="vertical-align:top">respond</label>
						<div class="jsonCode" v-show="false">
							<pre v-highlight="editData.respond"></pre>
						</div>
						<textarea name="respond" id="respond" class="respond textArea" rows="8" cols="65">{{editData.respond}}</textarea>
					</div>
				</form>
			</span>
			<div slot="footer" style="overflow:hidden">
				<div style="float:right;">
					<button class="D-btn D-btn-red" @click="closeEdit">cancel</button>
					<button class="D-btn D-btn-green" @click="save">confirm</button>
				</div>
			</div>
		</D-modal>
		
		<!--<edit-api :data="editData"
				  className="apiDetail"
				  title="Edit Api"
				  parentVm="self">
		</edit-api>-->
	</div>

</template>


<script>
	// const handler = require('../../lib/handleAjax.js')
	const HomeService = require('../../service/home.js')
	const hljs = require('highlight.js')
	module.exports = {
		data: function () {
			return {
				self: this,
				type: 1,
				list: [],
				showMouse: false,
				scrollState: true,
				searchType: 1,
				placeholderText: "search title",
				hasSlash: false,
				resData: [],
				item: {},
				url: "",
				isEditing: false,
				showModal: false,
				editData:{}
			}
		},
		mounted: function () {
			let vm = this;
			// this.getChanges();
			vm.list = []
			HomeService.getAllapis().then(function (res) {
  			vm.list = res.data.apiArray;
  			}, function (err) {
  				vm.list = []
  			})
		},	
		watch: {
			searchType: {
				handler: function (nv) {
					this.placeholderText = (nv == 2) ? "search api" : "search title"
				}
			},
		},
		components: {
			'headBar': require('../component/headBar.vue'),
			// 'searhInput': require('./searchInput.vue'),
			'card': require('./serviceCard.vue'),
			'D-modal': require('../component/modal.vue'),
			'D-radio': require('../component/radio.vue'),
			'edit-api':require('./edit_api.vue')
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
			scrolltoChange: function (e) {
				let vm = this;
				if (vm.scrollState){	
					document.getElementById('li1').style.display = "none";
					document.getElementById('li2').style.display = "";
					vm.scrollState = !vm.scrollState;
					vm.searchType = 2
				} else {
					document.getElementById('li2').style.display = "none";
					document.getElementById('li1').style.display = "";
					vm.scrollState = !vm.scrollState;
					vm.searchType = 1
				}
			},
			toggleShow: function (e) {
				let vm = this;
				vm.showMouse = !vm.showMouse	
			},
			inputChange: function (e) {
				let vm = this;
				let reqData = {};
				reqData.searchType = vm.searchType;
				if ( vm.searchType == 1 ) {
					reqData.apiName = document.getElementById('searchKeyword').value
				} else {
					var apistr = document.getElementById('searchKeyword').value
					let apiarr
					if ( e.keyCode == 191 && apistr != "" ) {
						vm.hasSlash = true
					} else if (apistr == "") {
						vm.hasSlash = false
					}
					if (vm.hasSlash){
						apiarr = apistr.split('/');
						reqData.serviceName = apiarr[0];
						reqData.apiUrl = "/" + apiarr.slice(1).join('/');	
					}
				} 
				vm.list = []
				if (apistr != "" ){
					console.log("reqData: ",reqData)
					HomeService.searchApi(reqData).then(function(res){
						setTimeout(()=>{
							vm.list = res.data.apiArray;
						},10)
					}, function (err) {
						vm.list = [];
					})
				}
			},
			checkDetail: function (detail) {
				console.log('==>',detail)
				this.showModal = true;
				this.editData = detail;
				let respond = this.editData.respond;
				this.editData.respondData = JSON.stringify(respond);
			},
			closeEdit:function () {
				this.showModal = false;
			},
			save:function () {
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
			    "id": this.editData._id,
			    "data":{
			    	"serviceName": document.getElementById('service').value,
			    	"apiUrl": document.getElementById('url').value,
			    	"apiName": document.getElementById('title').value,
			    	"method": method_radio,
			    	"respond": respondData,
			    	}
			    }
				HomeService.editApi(reqdata).then(function (res) {
					vm.list = []
					HomeService.getAllapis().then(function (res) {
  					vm.list = res.data.apiArray;
					vm.showModal = false;
  					}, function (err) {
  						vm.list = []
  					})  
  				}, function (err) {
					  alert('err!')
  				})
			}
		}
	}
</script>