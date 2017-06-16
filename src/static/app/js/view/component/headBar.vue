<style>
#headBar {
	position: fixed;
	top: 0px;
	left: 0px;
	height: 45px;
	width: 100%;
	background-color: #ffc81f;
	color: #222;
	overflow: hidden;
	z-index: 1000;
}
#headBar div {
	height: 1em;
	display: inline-block;
}
#headBar .meun {
	text-align: center;
	font-size: 45px;
	line-height: 45px;
	cursor: pointer;
}
#headBar .meun .icon {
	font-size: 35px !important;
	line-height: 20px;
	font-weight: bold;
}


</style>

<template>

	<div id="headBar">

		<router-link class="meun" tag="div" to="/index">
			<div><i class="icon iconfont icon-menu_icon"></i></div>
			<div class="d_m" >Da MocK</div>
		</router-link>

	</div>

</template>

<script>
	module.exports = {
		data: function () {
			return {
				
			}
		},
		mounted: function () {
			
		},
		methods: {
			toIndex: () => {

			}
		}
	}
</script>