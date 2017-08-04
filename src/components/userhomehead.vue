<template>
	<div class="wrap">
		<div class="header">
			<span class="icon iconfont icon-back back" @click.self="$router.back()"></span>
			<span class="title">{{title}}</span>
		</div>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		props:['title'],
		data () {

			return {

			}
		}
	}

</script>
<style type="text/css" scoped>
	
	.header{
		height: 41px;
	    border-bottom: 1px solid #ddd;
	    display: flex;
	    background: #fff;
	}
	.back{
		width: 15%;
		line-height: 41px;
		text-align: center;
		font-size: 21px;
	}
	.title{
		width: 70%;
		font-size: 16px;
		font-weight: bold;
		line-height: 41px;
		text-align: center;
	}
</style>