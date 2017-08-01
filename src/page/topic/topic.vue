<template>
	<div class="topicWrap">
		<template  v-for="(val,index) in pageData">
			<div class="topicHead">
				<h4 class="title">{{val.title}}</h4>
				<div class="topicInfo">
					<div class="author">
						<router-link :to="'user/'+val.author_id">
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
							<router-link :to="'user/'+val.author_id">
								<img :src="reply.author.avatar_url">
								<span>{{reply.author.loginname}}</span>
							</router-link>
							<span class="time">{{reply.create_at|time_format}}</span>
							<span class="floor">{{key+1}}楼</span>
						</div>
						<div class="cellBody" v-html="reply.content">
							
						</div>
						<div class="cellFoot">
							<span class="icon iconfont icon-comment-fabulous">
								<span :class="{ups:true,active:isActive(reply.ups)}"  v-if="reply.ups.length>0">{{reply.ups.length}}</span>
							</span>
							<span class="icon iconfont icon-comment-topic"></span>
						</div>
					</li>
				</ul>
			</div>
		</template>
		<div class="topicFoot">
			<span class="icon iconfont icon-back sideBtn"></span>
			<span class="inputBtn">说点什么吧！</span>
			<span class="icon iconfont icon-good sideBtn"></span>
		</div>
	</div>
</template>

<script type="text/javascript">
	import mixin from '@/mixin'
	export default{
		name:'topic',
		mixins:[mixin],
		data (){
			let that=this;
			return {
				api:that.$route.path,
			}
		},
		methods:{
			isActive (data){
				console.log(data);
				return true;
			}
		}
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
		position: fixed;
		bottom: 0;
		border-top: 1px solid #ccc;
    	justify-content: space-around;
    	width: 100%;
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
<style type="text/css">
	.markdown-text{
		padding: 0 10px;
	}
	.markdown-text p{
		    margin: 10px 0px;
    		line-height: 27px;
	}
	.markdown-text p img{
		display: block;
	}
	.markdown-text .prettyprint{
		background: #ccc;
		overflow-x: auto;
		line-height: 24px;
	}
	.markdown-text img{
		max-width: 100%;
	}
	.markdown-text h2{
		margin: 10px 0;
	}
	.markdown-text h1{
		margin: 15px 0;
	}
	.markdown-text a{
		color:#ea0bd8;
	}
	.markdown-text ul{
		padding-left: 20px;
	}
</style>