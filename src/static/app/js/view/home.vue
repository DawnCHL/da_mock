<style>
h1 {
	text-align: center;
	color: #ffc81f;
	font-weight: lighter;
}
.btn {
	margin-top: 150px; 
	text-align: center;
}

#indexPage {
	height: 100%;
	overflow: hidden;
}

.logo{
	text-align: center;
	width: 100%;
}
.logo > .large-logo{
	width: 200px;
	margin: 10% auto 0;
}

</style>


<template>

	<div class="content">
		
		<div class="body">

			<div id="indexPage">
				<div class="logo">
					<img class="large-logo" src="/pure/image/da_logo.png">
					<h1>Da  MocK</h1>
				</div>
				<div class="btn">
					<div class='blockBtn'>
						<router-link to='detail' tag='div' class='btnFont'>Start</router-link>
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