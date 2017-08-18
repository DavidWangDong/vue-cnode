<template>
	<div class="wrap">
		<template v-if="!loginShow">
			<user-home :pagedata="pageData" :username="user" :target="target"></user-home>
		</template>
		<need-login>
			
		</need-login>
		<v-footer></v-footer>
	</div>
	
</template>

<script type="text/javascript">
	import vFooter from '@/components/footer'
	import mixin from '@/mixin'
	import userHome from '@/components/userhome'
	import loginPage from '@/components/loginpage'
	import needLogin from '@/components/needLogin'
	export default{
		name:'home',
		mixins:[mixin],
		components:{vFooter,userHome,loginPage,needLogin},
		data (){
			let that=this;
			return {
				api:this.$store.getters.getUserUrl,
				user:this.$store.getters.getUserName
			}
		},
		methods:{
			createApi () {
				let param={};
				let url=this.target+this.api;
				let params=JSON.parse(JSON.stringify(this.$route.query));
				params.page=this.page;
				if (this.$store.state.accesstoken){
					param.isDo=true;
					params.accesstoken=this.$store.state.accesstoken;
				}else{
					param.isDo=false;
				}
				let option={
					params:params
				}
				param.url=url;
				param.option=option;
				return param;
			},
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