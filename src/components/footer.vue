<template>
  	<ul class="footer">
  		<li v-for="(val,index) in listData" :class="{active:isActive(val.link),flex}">
  			<router-link :to="val.link" :class="[flex,,column]">
				<span :class="[val.iconClass,flex]"></span>
  				<span :class="[flex]">{{val.name}}</span>
  			</router-link>
  		</li>
  	</ul>
</template>

<script>
export default {
  name: 'vFooter',
  data () {
    return {
    	listData:[
    		{name:'主页',link:'/',iconClass:'iconfont icon-index'},
    		{name:'发表',link:'/topic/create',iconClass:'iconfont icon-edit'},
    		{name:'消息',link:'/my/messages',iconClass:'iconfont icon-msg'},
    		{name:'我的',link:'/my/home',iconClass:'iconfont icon-user'},
    	],
    	flex:'flex',
    	'column':'column',
    }
  },
  methods:{
  	isActive (link){
  		return this.$route.path===link;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../fonts/iconfont.css';
	.footer{
		display:flex;
		width: 100%;
		height: 49px;
		position: absolute;
		bottom: 0;
		left: 0;
		border-top:1px solid #ccc;
	}
	.flex{
		display: flex;
		justify-content: center;
		flex-grow: 1;
		align-items: center;
	}
	.column{
		flex-direction:column;
	}
	.footer>.active>a{
		color:#80bd01;
	}
</style>
