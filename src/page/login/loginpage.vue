<template>
	<div class="wrap">
		<user-home-head :title="title"></user-home-head>
		<div class="login">
			<div class="loginContent">
				<div class="inputWrap">
					<input type="text" v-model="id" :value="id" placeholder="请输入Access Token">
				</div>
				<div class="buttonWrap" @click="login">
					<span>登录</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import userHomeHead from '@/components/userhomehead'
	export default {
		name:'loginpage',
		components:{userHomeHead},
		data () {
			return {
				id:'f3afaac8-4027-4fd9-8244-17d2442952d2',
				lastUrl:'/',
				title:'登录页'
			}
		},
		methods:{
			login () {
				this.$http.post('https://cnodejs.org/api/v1/accesstoken',{accesstoken:this.id}).then((data)=>{
					let param=JSON.parse(JSON.stringify(data.data));
					param.accesstoken=this.id;
					this.$store.commit('login',param);
					this.$router.back();
				})
			}
		}
	}	
</script>

<style type="text/css" scoped>
	
.login{
	position: absolute;
	top:50px;
	left: 0;
	right: 0;
	bottom: 50px;
}
.login:before{
	content:'';
	display: table;
}
.loginContent{
	margin-top: 100px;
    display: flex;
    flex-direction: column;
}
.inputWrap{
	width: 70%;
    margin: 0 auto;
    height: 44px;
    border-bottom: 1px solid #ddd;
}
.inputWrap:before{
	content: '';
	display: table;
}
.inputWrap input{
	border: none;
    background: none;
    width: 100%;
    height: 70%;
    appearance: none;
        outline: none;
    border: none;
    background: none;
    border-radius: 0 0 0 0;
    box-shadow: none;
    margin-top: 7%;
}
.buttonWrap{
	width: 70%;
    margin: 0 auto;
    margin-top: 16px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    background: #80bd01;
    color: #fff;

}
</style>