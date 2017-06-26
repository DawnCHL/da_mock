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
	.card{
		width: 24%;
		display: inline-block;
		margin: 10px 10px 0 0;
		
	}
	.card .context {
		height: 300px;
		background-color: #FFFFF0;
		overflow: hidden;
		border: 1px solid black;
		padding: 6px;
		border-radius: 4px;
	}
	.card .context label {
		width: 20%;
		display: inline-block;
	}
	.card .context .service .toThisService {
		display: inline-block;
		cursor: pointer;
		color: #31B0D5;
	}
	.card .jsonCode{
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
	.card .jsonCode i{
		color: #FFF;
		float: right;
		cursor: pointer;
	}
	.card .editJson{
		font-family: serif;
		color: #FFF;
		border-radius: 4px;
		padding: 5px;
		margin: 5px 0;
		display: block;
		height: 60%;
		position: relative;
	}
	.card .editJson .edit{
		width: 98%;
		height: 85%;
		resize: none;
		padding: 1em 5px 1em;
		border-radius: 4px;
		display: block;
	}
	.card .editJson i{
		float: right;
		cursor: pointer;
		position: absolute;
		top: 8px;
		right: 8px;
		color: #449d44;
		font-weight: bolder;
		font-size: 23px !important;
	}
</style>


<template>

	<div class="home_content">
		
		<headBar></headBar>

		<div class="body">

			<div class="search_form">
				<!-- <searhInput ref="searchType" v-on:scrolltoChange='getChanges' v-on:inputChange='getNewData' ></searhInput> -->
				<div id="searchInput" ref="searchType" :data-type="searchType" :data-data="resData">
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
									@change='inputChange'>
						<div id="skw_icon">
							<i class="icon iconfont icon-search_icon"></i>
						</div>
					</div>
					<div class="searchBtn"></div>
				</div>
			</div>

			<div class="card_zone" >
				<!-- <card v-for="data in list" :type='type' :data="data" key="data.id" ></card> -->
				<div v-for="data in list" class="card" @click='checkDetail'>
					<div class="context">
						<div class="title">
							<label>title: </label>
							{{data.apiName}}
						</div>
						<div class="url">
							<label>url: </label>
							<a v-if="data.method == 'GET'" :href='"/mock/" + data.serviceName + data.apiUrl' target="_blank">{{"/mock/" + data.serviceName + data.apiUrl}}</a>
							<span v-else>{{"/mock/" + data.serviceName + data.apiUrl}}</span>
						</div>
						<div class="service">
							<label>service: </label>
							<router-link to='index' tag='div' class='toThisService'>
								<i class="icon iconfont icon-link_icon"></i> {{data.serviceName}}
							</router-link>
						</div>
						<div class="method">
							<label>method: </label>
							{{data.method}}
						</div>
						<div class="respond">
							<label>respond: </label>
						</div>
						<div class="jsonCode" v-show="!isEditing" >
							<i title="edit" class="icon iconfont icon-edit_icon" @click='editJson'></i>
							<pre v-highlight="data.respond">Show This If No Value</pre>
						</div>
						<div class="editJson" v-show="isEditing">
							<i title="save" class="icon iconfont icon-affirm_icon" @click='editJson'></i>
							<textarea name="edit" class="edit">{{data.respond}}</textarea>
						</div>			
					</div>
				</div>

			</div>

		</div>

	</div>

</template>


<script>
	// const handler = require('../../lib/handleAjax.js')
	const HomeService = require('../../service/home.js')
	const hljs = require('highlight.js')
	module.exports = {
		data: function () {
			return {
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
				isEditing: false
			}
		},
		mounted: function () {
			let vm = this;
			// this.getChanges();
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
			// 'card': require('./serviceCard.vue')
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
				let data = {};
				data.searchType = vm.searchType;
				if ( vm.searchType == 1 ) {
					data.apiName = document.getElementById('searchKeyword').value
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
						data.serviceName = apiarr[0];
						data.apiUrl = apiarr.slice(1).join('/');	
					}
				} 
				console.log(data)
				
				if (apistr != "" ){
					HomeService.searchApi(data).then(function(res){
						console.log("===>",res.data.apiArray)
						setTimeout(()=>{
							vm.list = res.data.apiArray;
							// vm.set(vm.list, res.data.apiArray )
						},10)
					}, function (err) {
						vm.list = [];
					})
				}
				console.log("@@@",vm.list)
			},
			editJson: function (e) {
				let vm = this

				if (vm.isEditing){

					let val = eval('(' + e.target.parentElement.lastChild.innerHTML + ')');
					console.log(val)
					data = {
						id: vm.item._id,
						apiName: vm.item.apiName,
						serviceName: vm.item.serviceName,
						apiUrl: vm.item.apiUrl,
						method: vm.item.method,
						respond: val
					}
					console.log(data)
				}
				vm.isEditing = !vm.isEditing

			},
			checkDetail: function () {
				let id = this.item._id
			}
		}
	}
</script>