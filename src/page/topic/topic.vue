<template>
 <div class="wrap">
	<div class="topicWrap" v-scroll>
		<template  v-for="(val,index) in pageData">
			<div class="topicHead">
				<h4 class="title">{{val.title}}</h4>
				<div class="topicInfo">
					<div class="author">
						<router-link :to="{path:'/user/'+val.author.loginname}">
							<img :src="avatar" @load.once="getReal(val.author,$event)">
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
							<router-link :to="{path:'/user/'+reply.author.loginname}">
								<img :src="avatar" @load.once="getReal(reply.author,$event)">
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
		<div class="hoverbg" v-if="showComment" @click.self="close_hoverbg">
			<div class="comment">
				<div class="commentWrap">
					<textarea class="commentInfo" :placeholder="modelMassage" v-model="comment">
						
					</textarea>
				</div>
				<div class="subBtn" @click="to_sub">
					<span class="iconfont icon-edit" ></span>发表
				</div>
			</div>
		</div>
	</div>
	<loading-view :load="loading"></loading-view>
	<div class="topicFoot" v-for="(val,index) in pagedata">
		<span class="icon iconfont icon-back sideBtn" @click.self="$router.back()"></span>
		<span class="inputBtn" @click="to_comment(val);">说点什么吧！</span>
		<span :class="[{sideBtn:true},{icon:true},{iconfont:true},{'icon-good':true},{'iconBig':true},{'active':isCollect(val.id)}]" @click.self="toDoCollect(val.id,val)"></span>
	</div>
</div>
</template>

<script type="text/javascript">
	import mixin from '@/mixin'
	import loadingView from '@/components/loading'
	export default{
		name:'topic',
		mixins:[mixin],
		components:{loadingView},
		data (){
			let that=this;
			return {
				api:that.$route.path,
				comment:'',
				modelMassage:'请输入评论内容！',
				showComment:false,
				reply_id:'',
			}
		},
		computed:{
			pagedata () {
				if (this.pageData[0]===undefined){
					return [{}];
				}
				return this.pageData;
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
				if (this.redirect_to_login()===false){
					return false;
				}

				this.clear_cache('all');
				this.add_before((param,next)=>{
					param.url=this.target+'/reply/'+reply_id+'/ups';
					param.body={accesstoken:this.$store.state.accesstoken};
					param.method='POST';
					next();
				});
				this.add_after((data,next)=>{
					if (!data.ok){
						this.$emit('showtost',data.data.error_msg);
						return;
					}
					let msg='取消点赞'
					if (data.data.action=='up'){
						msg='点赞成功！';
						up_arr.push(this.$store.state.userid);
					}else{
						up_arr.splice(up_arr.indexOf(this.$store.state.userid),1);
					}
					this.$emit('showtost',msg);
				});
				this.doAjax();
			},
			to_comment (topic,reply) {
				if (this.redirect_to_login()===false){
					return false;
				}
				if (reply){
					if (reply.author.loginname==this.$store.state.username){
						this.$emit('showtost','亲~不能自己回复自己哦！');
						return ;
					}
					this.reply_id=reply.id;
					this.modelMassage="@"+reply.author.loginname;
				}
				this.showComment=true;
			},
			close_hoverbg () {
				this.showComment=false;
			},
			to_sub () {
				if (!this.comment){
					this.$emit('showtost','回复内容不能为空哦~');
					return;
				}
				  const content=this.reply_id?(this.modelMassage+this.comment):this.comment;
				  this.clear_cache('all');
			      this.add_before((param,next)=>{
			          param.url=this.target+/topic/+this.pageData[0].id+'/replies';
			          param.method='POST';
			          param.body={accesstoken:this.$store.state.accesstoken,content:content,reply_id:this.reply_id};
			          next();
			      });
			      this.add_after((data,next)=>{
			      	this.reply_id='';
			      	this.modelMassage='请输入评论内容！';
			      	this.comment='';
			        if (data.ok){
			            this.$http.get(this.target+/topic/+this.pageData[0].id).then((data)=>{
			            this.pageData.length=0;
			            this.pageData.push(data.data.data);
			            this.$emit('showtost','评论成功！');
			         	this.showComment=false;
			          })
			          return;
			        }
			        this.showTost(data.data.error_msg);
			      });
			      this.doAjax();
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

	.comment{
		    width: 70%;
    		margin: 0 auto;
    		box-shadow: 0 0 5px #80bd01;
	}
	.commentWrap{
		    min-height: 170px;
		    background: #fff;
		    padding: 5px;
		    box-sizing: border-box;
	}
	.commentInfo{
		    display: block;
		    height: 160px;
		    width: 100%;
		    background: #eff2f7;
		    outline: none;
		    resize: none;
		    border: none;
		    font-size: 15px;
	}
	.subBtn{
		height: 30px;
	    background: #80bd01;
	    color: #fff;
	    text-align: center;
	    line-height: 30px;
	    font-size: 16px;
	}
	.hoverbg{
		position: fixed;
		top:0;
		bottom: 0;
		left:0;
		right: 0;
		z-index: 200;
		background: rgba(0,0,0,0.5); 
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>