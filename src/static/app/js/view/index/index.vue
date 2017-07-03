<style>
.index_content{	
	background-color: #222;
}
.index_content h1 {
	text-align: center;
	color: #ffc81f;
	font-weight: lighter;
}
.index_content .btn {
	margin-top: 150px; 
	text-align: center;
}

.index_content #indexPage {
	height: 100%;
	overflow: hidden;
}

.index_content .logo{
	text-align: center;
	width: 100%;
}
.index_content  .logo > .large-logo{
	width: 200px;
	margin: 10% auto 0;
}

</style>


<template>

	<div class="index_content">
		
		<div class="body">

			<div id="indexPage">
				<div class="logo">
					<img class="large-logo" src="/pure/image/da_logo.png">
					<h1>Da  MocK</h1>
				</div>
				<div class="btn">
					<div class='blockBtn'>
						<router-link to='home' tag='div' class='btnFont'>Api List</router-link>
					</div>
					<div class='blockBtn'>
						<router-link to='service' tag='div' class='btnFont'>Services</router-link>
					</div>
					<a href="https://github.com/DawnCHL"  class='blockBtn'>
						<div class='btnFont'>GitHub</div>
					</a>
				</div>
			</div>

		</div>
		<div class="foot">
			
		</div>
	</div>

</template>


<script>

	module.exports = {
		data: function () {
			return {
				status: 0
			}
		},
		mounted: function () {
			console.log('gua')
		},
		methods: {
			test: function () {
				console.log('!')
			},
			testagin: function () {
				console.log('?')
			},
		}
	}
</script>