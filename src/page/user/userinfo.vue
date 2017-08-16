<template>
	<div class="wrap">	
		<user-home-head :title="title"></user-home-head>		
		<user-home :pagedata="pageData" :username="user" :target="target" :type="type"></user-home>
	</div>	
</template>

<script type="text/javascript">
	import mixin from '@/mixin'
	import userHome from '@/components/userhome'
	import userHomeHead from '@/components/userhomehead'
	export default{
		name:'home',
		mixins:[mixin],
		components:{userHome,userHomeHead},
		data (){
			let that=this;
			return {
				api:that.$route.fullPath,
				user:that.$route.params.name,
				type:'info',
				title:'个人详情页'
			}
		},
		computed:{
			HomeisShow () {
				return this.$store.state.loginFlag;
			},
			loginShow () {
				return !this.$store.state.loginFlag;
			}
		}
	}
</script>