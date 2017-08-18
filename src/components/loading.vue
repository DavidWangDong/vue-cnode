<template>
	<div class="loadingWrap" v-if = "load">
		<div class="loadingCell">
			<div></div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:'loading',
		props:['load'],
		data () {
			return {

			}
		}
	}
</script>
<style type="text/css" scoped>
@-webkit-keyframes rotate{
	0%	 {-webkit-transform:rotate(0deg)}
	100% {-webkit-transform:rotate(359deg)}	
}
.loadingWrap:before,.loadingWrap:after{
	content: '';
	display: table;
}
.loadingWrap{
	display: flex;
    justify-content: center;
    background: #fff;
}
	.loadingCell{
		width: 45px;
		height: 45px;
		margin:20px auto;
		overflow:hidden;
	}
	.loadingCell div{
		width: 35px;
		height: 35px;
		border-radius: 50%;
		border:5px solid #80bd01;
		border-top:5px solid transparent; 
		-webkit-animation:rotate 1s linear 0s infinite forwards;
	}
</style>