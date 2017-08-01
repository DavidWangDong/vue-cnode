<template>
  <div class="wrap">
  	<v-nav></v-nav>
  	<v-content>
  		<ul class="listWrap">
  			<li v-for="(val,index) in pageData">
  				<div class="topSpecial">
  					
  					<span class="icon iconfont icon-topic-top topicTop topicSpecial" v-if="val.top"></span>
  					<span class="icon iconfont icon-topic-good topicGood topicSpecial" v-if="val.good"></span>
  					<span class="topTab">#{{val.tab|tabFilter}}#</span>
  				</div>
  				<span class=""></span>
  				<div class="topContent">
  					<div class="headInfo">
  						<router-link :to="'/user/'+val.author.loginname"><img :src="val.author.avatar_url" class="avatar"></router-link>
  					<!-- <p class="username">{{val.author.loginname}}</p> -->
	  				</div>
	  				<div class="topicContent">
	  					<router-link :to="'/topic/'+val.id"><h6 class='title'>{{val.title}}</h6></router-link>
	  					<p class="create_time">{{val.last_reply_at|time_format}}</p>
	  				</div>
  				</div>
  				<div class="bottomContent">
  					<ul>
  						<li>
  							<span class="icon iconfont icon-click iconBig"></span>
  							<span class="count">{{val.visit_count}}</span>
  						</li>
  						<li>
  							<span class="icon iconfont icon-comment iconBig"></span>
  							<span class="count">{{val.reply_count}}</span>
  						</li>
  						<li>
  							<span class="icon iconfont icon-good iconBig"></span>
  						</li>
  					</ul>
  				</div>
  			</li>
  		</ul>
  	</v-content>
  	<v-footer></v-footer>
  </div>
</template>

<script>
import vNav from '@/components/nav'
import vFooter from '@/components/footer'
import vContent from '@/components/content'
import mixin from '@/mixin'
export default {
  name: 'index',
  mixins:[mixin],
  components:{vNav,vFooter,vContent},
  
  data () {
    return {
    	api:'/topics'
    }
  },
  filters:{
  	tabFilter (tab) {
  			return tab=='ask'?'问答':
  				   tab=='share'?'分享':
  				   tab=='job'?'招聘':
  				   tab=='ask'?'问答':'week';
  	}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.listWrap{
		width: 100%;
	}
	.listWrap>li{
		position: relative;
	    padding: 15px 15px 0 15px;
	    margin-bottom: 15px;
	    list-style: none;
	    box-shadow: 0 0 5px #ccc;
	    background: #fff;
	    overflow:hidden;
	}
	.headInfo{
		display: flex;
		flex-direction:column;
		width: 20%;
		float: left;
	}
	.avatar{
		width: 100%;
		border-radius: 100%;
	}
	.username{
		width: 100%;
		text-align: center;
		margin-top: 10px;
	}
	.topicContent{
		width: 80%;
		float: right;
	}
	.title{
		padding-left:5px;
		font-size: 12px;
	}
	.create_time{
		font-size: 12px;
		text-align: right;
		margin-top: 5px;
		color:#ccc;
		position: absolute;
		bottom: 0;
		right: 15px;
	}
	.topContent{
		overflow:hidden;
		position: relative;
	}
	.bottomContent{
		width: 100%;
	}
	.bottomContent>ul{
		display: flex;
		flex-grow: 1;
		height: 50px;
		justify-content:space-between;
	}
	.bottomContent>ul>li{
		display: flex;
		flex-direction: column;
		justify-content:center;
		text-align: center;
		position: relative;
	}
	.iconBig{
		font-size: 31px;
		color:#aaa;
	}
	.count{
		font-size: 8px;
	    position: absolute;
	    padding: 3px;
	    color: #fff;
	    background: #aaa;
	   	left: 21px;
	    top: 4px;
	    font-weight: bold;
	    border-radius: 8px;
	}
	.topicSpecial{
	    font-size: 15px;
	    float: right;
	    margin-right: 5px;
	}
	.topicTop{
		color:#fd8fb4;
	}
	.topicGood{
		color:#3a77e9;
	}
	.topSpecial{
		width: 100%;
		position: absolute;
		top:2px;
		overflow: hidden;
		left: 0;
	}
	.topTab{
		font-size: 11px;
		color:#80bd01;
		float:right;
		margin-right: 5px;
	}
</style>
