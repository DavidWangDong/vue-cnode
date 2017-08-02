<template>
	<div class="home">
		  <template v-for="(val,index) in pagedata">
			  	<div class="homeHead">
					<span class="leftImg">
						<img :src="val.avatar_url">
					</span>
					<div class="midInfo">
						<span class="username">{{val.loginname}}</span>
						<span class="usescore">积分:{{val.score}}/注册于:{{val.create_at|time_format}}</span>
					</div>
					<span class="icon iconfont icon-signout signout" v-if="!type"></span>
				</div>
				<div class="homeBody" :style="{top:type?'110px':'70px',bottom:type?'0':'50px'}">
					<ul class="topic_type" @click="changeTab($event)">
						<li :class="{'about':true,'active':activeClass=='about'}" type="about">
							参与的话题
						</li>
						<li :class="{'recent':true,'active':activeClass=='recent'}" type="recent">
							创建的话题
						</li>
						<li :class="{'collect':true,'active':activeClass=='collect'}" type="collect">
							收藏的话题
						</li>
					</ul>
					<div class="contentWrap">
						<ul class="list">
							<li class="listCell" v-for="(topic,key) in get_type_topic">
								<router-link :to="'/topic/'+topic.id">
									<span class="topic_left_img">
										<img :src="topic.author.avatar_url">
									</span>
									<div class="topicInfo">
										<div>
											<span class="topic_belong">{{topic.author.loginname}}</span>
											<span class="topic_time">{{topic.last_reply_at|time_format}}</span>
										</div>
										<span class="topic_content">{{topic.title}}</span>

									</div>
								</router-link>
								
							</li>
						</ul>
					</div>
				</div>
		  </template>
	</div>
</template>

<script>
	
	export default {
		name:'userhome',
		props:['pagedata','username','target','type'],
		mounted (){
			// let that=this;
			// this.$http.get(this.target+'/topic_collect/'+this.username,{}).then(function (data) {
			// 		that.collect=data.data.data;
			// })
		},
		data (){
			return {
				activeClass:'about',
				collect:[],
				collect_load:false
			}
		},
		watch:{
			activeClass (news,old) {
				if (news!=='collect'){
					return;
				}
				let that=this;
				this.$http.get(this.target+'/topic_collect/'+this.username,{}).then(function (data) {
						that.collect=data.data.data;
				})
			}
		},
		computed:{
			get_type_topic (){
				let   type = this.activeClass;
				if (type=='about'){
					return this.pagedata[0].recent_replies;
				}else if (type=='recent'){
					return this.pagedata[0].recent_topics;
				}else if (type=="collect"){
					return this.collect;
				}
			}
		},
		methods:{
			changeTab (e){
				let el=e.target;
				if (el.nodeName!=='LI'){
					return;
				}
				let classes=el.className;
				if (classes.indexOf('active')>-1){
					return;
				}
				this.activeClass=el.type;
			}
		}
	}

</script>
<style scoped>
	.homeHead{
		display: flex;
	    justify-content: space-between;
	    background: #fff;
	}
	.leftImg img{
		width: 50px;
		height: 50px;
    	border-radius: 10px;
	}
	.leftImg{
		padding: 5px;
	}
	.midInfo{
		display: flex;
	    flex-grow: 1;
	    flex-direction: column;
	    padding-left: 15px;
	    justify-content: space-around;
	}
	.username{
		font-size: 18px;
    	font-weight: bold;
	}
	.usescore{
		    font-style: italic;
		    font-size: 12px;
	}
	.signout{
		align-items: center;
	    display: flex;
	    background: #80bd01;
	    color: #fff;
	    font-size: 28px;
	    padding: 0 20px;
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

</style>