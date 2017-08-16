<template>
 <div class="wrap">
	<div class="topicWrap">
		<template  v-for="(val,index) in pageData">
			<div class="topicHead">
				<h4 class="title">{{val.title}}</h4>
				<div class="topicInfo">
					<div class="author">
						<router-link :to="'/user/'+val.author.loginname">
							<img :src="val.author.avatar_url">
							<span>{{val.author.loginname}}</span>
						</router-link>
					</div>
					<span class="time">
						{{val.create_at|time_format}}
					</span>
				</div>
			</div>
			<div class="topicContent" v-html="val.content">
				
			</div>
			<div class="topicSpeak">
				<p class="speakListHead">回复共(<span>{{val.reply_count}}</span>)条</p>
				<ul class="speakList">
					<li class="speakCell" v-for="(reply,key) in val.replies">
						<div class="cellHead">
							<router-link :to="'/user/'+reply.author.loginname">
								<img :src="reply.author.avatar_url">
								<span>{{reply.author.loginname}}</span>
							</router-link>
							<span class="time">{{reply.create_at|time_format}}</span>
							<span class="floor">{{key+1}}楼</span>
						</div>
						<div class="cellBody" v-html="reply.content">
							
						</div>
						<div class="cellFoot">
							<span class="icon iconfont icon-comment-fabulous" @click="to_up_down(reply.id,reply.ups);">
								<span :class="{ups:true,active:isActive(reply.ups)}"  v-if="reply.ups.length>0">{{reply.ups.length}}</span>
							</span>
							<span class="icon iconfont icon-comment-topic" @click="to_comment(val,reply)"></span>
						</div>
					</li>
				</ul>
			</div>
		</template>
		
	</div>
	<div class="topicFoot" v-for="(val,index) in pageData">
		<span class="icon iconfont icon-back sideBtn" @click.self="$router.back()"></span>
		<span class="inputBtn" @click="to_comment(val);">说点什么吧！</span>
		<span :class="[{sideBtn:true},{icon:true},{iconfont:true},{'icon-good':true},{'iconBig':true},{'active':isCollect(val.id)}]" @click.self="toDoCollect(val.id,val)"></span>
	</div>
</div>
</template>

<script type="text/javascript">
	import mixin from '@/mixin'
	export default{
		name:'topic',
		mixins:[mixin],
		updated (){
			let el=this.$el;
			let aList=document.querySelectorAll('.cellBody a');
			for (let i=0,len=aList.length;i<len;i++){
				aList[i].href='#'+aList[i].pathname;
			}
		},
		data (){
			let that=this;
			return {
				api:that.$route.path,
			}
		},
		methods:{
			isActive (data){
				if (!this.$store.state.loginFlag) {
					return false;
				}
				let res=false;
				data.forEach((tmp)=>{
					this.$store.state.userid==tmp&&(res=true);
					return;
				});
				return res;
			},
			to_up_down (reply_id,up_arr){
				let that=this;
				if (this.redirect_to_login()===false){
					return false;
				}
				
				this.$http.post(this.target+'/reply/'+reply_id+'/ups',{accesstoken:this.$store.state.accesstoken}).then(function(data){
					
							if(data.data.action=='up'){
			  					
			  					that.$emit('showtost','点赞成功！')
			  					up_arr.push(that.$store.state.userid);
							}else if(data.data.action){
							
								that.$emit('showtost','取消点赞！')
			  					up_arr.splice(up_arr.indexOf(that.$store.state.userid),1);
							}
						
				},function(data){
					that.$emit('showtost',data.data.error_msg);
				})
			},
			to_comment (topic,reply) {
				if (this.redirect_to_login()===false){
					return false;
				}
				let msg="请输入您的评论！"
				let hasMsg=false;
				if (reply){
					msg='@'+reply.author.loginname;
					this.$store.commit('set_curr',{key:'curr_reply_id',id:reply.id});
				}
				this.show_model({
					type:'comment',
					msg:msg,
					hasMsg:true
				});
				this.$store.commit('set_curr',{key:'curr_topic_id',id:topic.id});
			}
		},

	}
</script>

<style type="text/css" scoped>
	.topicWrap{
		width: 100%;
		position: absolute;
		top:0;
		left: 0;
		right:0;
		bottom: 50px;
		overflow-x: hidden;
		overflow-y: auto;
		background: #fff;
	}
	.title{
		font-size: 20px;
		line-height: 40px;
		margin:20px;
	}
	.topicInfo{
		display: flex;
		justify-content: space-between;
		padding: 0 10px;
	}
	.author{
		display: flex;
		justify-content: center;
	}
	.author a{
		display:flex;
	}
	.author a img{
		border-radius:100%; 
		width: 30px;
		height: 30px;
		margin-right: 5px;
	}
	.author a span{
		font-size: 12px;
		display: flex;
		align-self:center;
		color:#80bd01;
	}
	.time{
		align-self:center;
		font-size: 12px;
		color: #bbb;
	}
	.speakListHead{
		padding-left: 5px;
    	border-left: 10px solid rgb(128, 189, 1);
    	line-height: 35px;
    	background: #eee;
	}
	.speakListHead span{
		color: #80bd01;
	}
	.topicSpeak{
		    margin-top: 50px;
	}
	.speakList{
		width: 100%;
	}
	.cellHead{
		display: flex;
		justify-content: space-between;
	}
	.cellHead a{
		    display: flex;
    		margin-right: 10px;
	}
	.cellHead a img{
		    width: 30px;
		    height: 30px;
		    border-radius: 100%;
	}
	.cellHead a span{
		        align-self: center;
			    margin-left: 5px;
			    color: #80bd01;
			    font-size: 12px;
	}
	.cellHead .floor{
		    align-self: center;
		    font-size: 13px;
		    color: #aaa;
	}
	.cellFoot{
		    display: flex;
		    justify-content: flex-end;
		    font-size: 20px;
		    height: 20px;
	}
	.ups{
		    position: absolute;
		    padding: 1px 2px;
		    border-radius: 100%;
		    font-size: 10px;
		    top: -5px;
		    right: -9px;
		    border-radius: 100%;
		    background: #aaa;
		    color: #fff; 
	}
	.ups.active{
		background: #80bd01;
	}
	.cellFoot>span{
		    font-size: 20px;
		    margin-right: 20px;
		    position: relative;
	}
	.speakCell{
		padding: 10px 5px;
    	border-top: 1px solid #ddd;
	}
	.topicFoot{
		display: flex;
		height: 49px;
		position: absolute;
		bottom: 0;
		border-top: 1px solid #ccc;
    	justify-content: space-around;
    	width: 100%;
    	background: #fff;
	}
	.inputBtn{
		height: 35px;
	    width: 70%;
	    align-self: center;
	    background: #eff2f7;
	    color:#b2c2d4;
	    line-height: 35px;
	    font-size: 15px;
	    text-indent:2em;
	}
	.sideBtn{
		    align-self: center;
		    font-size: 32px;
		    line-height: 49px;
	}
</style>