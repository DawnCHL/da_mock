<style>
	.modal{
		top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    overflow: auto;
	}
	.modal .modalShade {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
    z-index: 999;
	}
	.modal .modalBox {
		z-index: 1000;
		width: 800px;
		position: absolute;
    left: 50%;
    top: 10%;
    margin-top: 45px;
    transform: translateX(-50%);
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    margin-bottom: 50px;
	}
	.modal .modalBox .modalHead{
		height: 25%;
		width: inherit;
	}
	.modal .modalBox .modalContext{
		height: 45%;
		width: inherit;
	}
	.modal .modalBox .modalFoot{
		height: 25%;
		width: inherit;
	}
</style>

<template>

	<div class="modal">
		<div class="modalShade"></div>
		<div class="modalBox">
			<div class="modalHead">
				123
			</div>
			<div class="modalContext">qwer</div>
			<div class="modalFoot">ASC</div>
		</div>
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
			
		}
	}
</script>