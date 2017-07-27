<template>
	<div class="topicWrap">
		<div class="topicHead">
			<h4 class="title">{{pageData.title}}</h4>
			<div class="topicInfo">
				<div class="author">
					
				</div>
				<span class="time"></span>
			</div>
		</div>
		<div class="topicContent" v-html="pageData.content">
			
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
	}
</style>
<style type="text/css">
	.markdown-text{
		padding: 0 10px;
	}
	.markdown-text p{
		    margin: 10px 0px;
    		line-height: 27px;
    		text-indent: 2em;
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