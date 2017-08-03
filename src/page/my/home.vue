<template>
	<div class="wrap">
		<template v-if="HomeisShow">
			<user-home :pagedata="pageData" :username="user" :target="target"></user-home>
		</template>
		<template v-if="loginShow">
			<div class="loginBtn">
				<span><router-link :to="'/login'">您还未登录，请先登录！</router-link></span>
			</div>
		</template>
		<v-footer></v-footer>
	</div>
	
</template>

<script type="text/javascript">
	import vFooter from '@/components/footer'
	import mixin from '@/mixin'
	import userHome from '@/components/userhome'
	import loginPage from '@/components/loginpage'
	export default{
		name:'home',
		mixins:[mixin],
		components:{vFooter,userHome,loginPage},
		data (){
			let that=this;
			return {
				api:this.$store.getters.getUserUrl,
				user:this.$store.getters.getUserName
			}
		},
		computed:{
			HomeisShow () {
				return this.$store.state.loginFlag;
			},
			loginShow () {
				return !this.$store.state.loginFlag;
			}
		},
		methods:{
			
		}
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