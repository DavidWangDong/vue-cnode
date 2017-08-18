<template>
	<div class="messageWrap">
		<user-home-head :title="title"></user-home-head>
		<template v-if="!loginShow">
			
			<div class="homeBody" :style="{top:'50px',bottom:'0'}">
					<ul class="topic_type" @click="changeTab($event)">
						<li :class="{'about':true,'active':activeClass=='about'}" type="about">
							未读消息
						</li>
						<li :class="{'recent':true,'active':activeClass=='recent'}" type="recent">
							已读消息
						</li>
					</ul>
					<div class="contentWrap">
						<ul class="list">
							<li class="listCell" v-for="(topic,key) in get_type_topic">

								<div class="topicInfo">
									<router-link :to="'/user/'+topic.author.loginname">
										{{topic.author.loginname}}
									</router-link>
									在
									<router-link :to="'/topic/'+topic.topic.id">
										{{topic.topic.title}}
									</router-link>
									中{{topic.type=='at'?'回复':'点赞'}}了你
									<br/>
									{{topic.type=='at'?'内容为':''}}
									<div v-html="topic.reply.content">
									</div>
								</div>
								
							</li>
						</ul>
					</div>
				</div>
		</template>	
		<need-login>
			
		</need-login>
	</div>
</template>
<script type="text/javascript">
	import mixin from '@/mixin'
	import userHomeHead from '@/components/userhomehead'
	import vFooter from '@/components/footer'
	import needLogin from '@/components/needLogin'
	export default{
		name:'home',
		mixins:[mixin],
		components:{userHomeHead,vFooter,needLogin},
		data (){
			let that=this;
			return {
				activeClass:'about',
				api:'/messages',
				title:'个人消息页',
				type:'info'
			}
		},
		computed:{
			get_type_topic () {
				let   type = this.activeClass;
				if (this.pageData.length<=0){
					return [];
				}
				if (type=='about'){
					return this.pageData[0].hasnot_read_messages;
				}else if (type=='recent'){
					return this.pageData[0].has_read_messages;
				}
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
			changeTab (e){
				console.log(e);
				let el=e.target;
				if (el.nodeName!=='LI'){
					return;
				}
				let classes=el.className;
				if (classes.indexOf('active')>-1){
					return;
				}
				this.activeClass=el.type;
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
	.homeBody{
		position: absolute;
	    width: 100%;
	    top: 70px;
	    bottom: 50px;
	    left: 0;
	    right: 0;
	    background: #fff;
        display: flex;
    	flex-direction: column;
	}
	.topic_type{
		display: flex;
	    justify-content: space-around;
	    height: 50px;
	    line-height: 50px;
	    border-bottom: 1px solid #80bd01;
	    background: #fff;
	    padding-top: 5px;
	    width: 100%;
	}
	.topic_type li.active{
	    border: 1px solid #80bd01;
	    position: relative;
	    top: 1px;
	    line-height: 45px;
	    border-bottom: 1px solid #fff;
	    color: #80bd01;
	}
	.topic_type li{
		flex-grow: 1;
    	text-align: center;
    	box-sizing: content-box;
	}
	.contentWrap{
		    flex-grow: 1;
		    overflow-x: hidden;
		    overflow-y: auto;
		    position: absolute;
		    top: 60px;
		    right: 0;
		    left: 0;
		    bottom: 0;
		    background: #eff2f7;
	}
	.listCell{
		box-sizing: content-box;
	    padding: 16px 5px;
	    border-top: 1px solid #ccc;
	    margin-bottom: 15px;
	    background:#fff;
	    border-bottom: 1px solid #ccc;
	}
	.listCell>a{
		    display: flex;
	}
	.topic_left_img{
		    display: flex;
		    flex-direction: column;
		    margin-right: 6px;
	}
	.topic_left_img img{
		    width: 39px;
		    border-radius: 5px;
		    height: 39px;
	}
	.topicInfo{
		flex-grow: 1;
	}
	.topicInfo>div{
		display: flex;
	    justify-content: space-between;
	    font-size: 13px;

	}
	.topic_belong{
		color: #80bd01;
	}
	.topic_time{
		    margin-right: 13px;
    		color: #aaa;
	}
	.topic_content{
		    font-size: 14px;
	}
	.topicInfo a{
		color:#ea0bd8;
	}
</style>