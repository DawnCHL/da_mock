<style>
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
	<div class="card" @click='checkDetail'>
		<div class="context">
			<div class="title">
				<label>title: </label>
				{{item.apiName}}
			</div>
			<div class="url">
				<label>url: </label>
				<a v-if="item.method == 'GET'" :href='url' target="_blank">{{url}}</a>
				<span v-else>{{url}}</span>
			</div>
			<div class="service">
				<label>service: </label>
				<router-link to='index' tag='div' class='toThisService'>
					<i class="icon iconfont icon-link_icon"></i> 
					{{item.serviceName}}
				</router-link>
			</div>
			<div class="method">
				<label>method: </label>
				{{item.method}}
			</div>
			<div class="respond">
				<label>respond: </label>
			</div>
			<div class="jsonCode">
				<pre v-highlight="item.respond">Show This If No Value</pre>
			</div>
			<!-- <div class="jsonCode" v-show="!isEditing" >
				<i title="edit" class="icon iconfont icon-edit_icon" @click='editJson'></i>
				<pre v-highlight="item.respond">Show This If No Value</pre>
			</div> -->
			<!-- <div class="editJson" v-show="isEditing">
				<i title="save" class="icon iconfont icon-affirm_icon" @click='editJson'></i>
				<textarea name="edit" class="edit">{{item.respond}}</textarea>
			</div>	 -->		
		</div>
	</div>
</template>

<script>
	const hljs = require('highlight.js')
	module.exports = {
		data: function () {
			return {
				searchType: 1,
				item: {},
				url: "",
				isEditing: false,
			}
		},
		props:['type','detail'],
		created: function () {
			this.searchType = this.$props.type;
			this.item = this.$props.detail;
			// console.log('item: ',this.item);
			this.url = "/mock/" + this.item.serviceName + this.item.apiUrl
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
		mounted: function () {
			
		},
		methods: {
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
				let vm = this;
				vm.id = this.item._id
				console.log(vm.id)
				vm.$emit('checkDetail')
			}
		}
	}
</script>
