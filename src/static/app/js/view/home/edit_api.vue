<template>
    <D-modal :class="className" :title="title">
		<span slot="context">
			<form>
				<div class="rol">
					<label>title</label>
					<input type="text" class="textInput" name="title" id="title"  :value="data.apiName"></input>
				</div>
				<div class="rol">
					<label>url</label>
					<input type="text" class="textInput" name="url" id="url" :value="data.apiUrl"></input>
				</div>
				<div class="rol">
					<label>service</label>
					<input type="text" class="textInput" name="service" id="service" :value="data.serviceName"></input>
				</div>
				<div class="rol">
					<label>method</label>
					<!--<D-radio name="method" val="1">GET</D-radio>
					<D-radio name="method" val="2">POST</D-radio>-->
					<input type="radio" class="textInput" name="method" value="GET">GET</input>
					<input type="radio" class="textInput" name="method" value="POST">POST</input>
					<input type="radio" class="textInput" name="method" value="PUT">PUT</input>
					<input type="radio" class="textInput" name="method" value="DEL">DEL</input>
				</div>
				<div class="rol">
					<label style="vertical-align:top">respond</label>
					<div class="jsonCode" v-show="false">
						<pre v-highlight="data.respond"></pre>
					</div>
					<textarea name="respond" id="respond" class="respond textArea" rows="8" cols="65">{{data.respond}}</textarea>
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
</template>
<script>
	module.exports = {
		data: function () {
			return {
                data:{},
                className:"",
                title:"",
                parentVm: ""
			}
		},
        props:["data","className","title","parentVm"],
		created: function () {
			
            this.data = this.$props.data;
            console.log('==>',this.data)
            // this.className = this.$props.className;
            // this.title = this.$props.title;
            // this.parentVm = this.$props.parentVm;
			let vm = this;
			let $methodEl = document.getElementsByName('method');
			console.log('1231231')
			for (let i=0;i<$methodEl.length;i++){
				console.log('el=> ',$methodEl[i].value)
				console.log('data=> ',vm.data.method)
				if($methodEl[i].value == vm.data.method){
					$methodEl[i].checked = 'checked'
				}
			}
		},
		mounted: function () {
			
		},
        components: {
			'D-modal': require('../component/modal.vue')
		},
		methods: {
            closeEdit:function () {
				this.parentVm.showModal = false;
			},
		}
	}