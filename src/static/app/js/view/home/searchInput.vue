
<style>
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
</style>

<template>
	<div id="searchInput" ref="searchType" :data-type="searchType" :data-data="searchType">
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
</template>

<script>
	// const homeAjax = require('../../service/home.js')
	const homeAjax = require('../../lib/handleAjax.js')
	module.exports = {
		data: function () {
			return {
				showMouse: false,
				scrollState: true,
				searchType: 1,
				placeholderText: "search title",
				hasSlash: false,
				data: {}
			}
		},
		mounted: function () {
			
		},
		created: function () {
			
		},
		components: {
			
		},
		watch: {
			searchType: {
				handler: function (nv) {
					this.placeholderText = (nv == 2) ? "search api" : "search title"
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
				vm.$emit('scrolltoChange')
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
				// console.log(data)
				if  (apistr != "" ){
					setTimeout(()=>{
						let res = homeAjax.GetSearchRes(data)
						console.log(res)	
					},100)
					
				}
			}
		}
	}
</script>