<template>
	<div class="loginBtn" v-if="loginShow">
		<span><router-link :to="'/login'">您还未登录，请先登录！</router-link></span>
	</div>
</template>


<script type="text/javascript">
	
	export default {
		name:'needLogin',
		computed:{
			loginShow () {
				return !this.$store.state.loginFlag;
			}
		},
		data () {
			return {

			}
		},
	}

</script>


<style type="text/css" scoped>
	.loginBtn:before{
		display:table;
		content: '';
	}
	.loginBtn{
		text-align: center;
    	font-size: 16px;
    	
	}
	.loginBtn span{
		padding: 10px 15px;  
		margin-top: 200px;
		background: #80bd01;

		display: inline-block;
	}
	.loginBtn span a{
		color:#fff;
	}
</style>