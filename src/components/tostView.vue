<template>
	<div class="tost-wrap" v-center>
		<div class="tost-cell">
			{{message}}
		</div>
	</div>
</template>

<script type="text/javascript">
    // import $ from 'jQuery';
	export default {
		name:'tostView',
		props:['message'],
		data () {
			return {

			}
		},
		directives:{
			center:{
				inserted (el,bind,vnode) {
					let width=$(el).width();
					let height=$(el).height();
					$(el).css({
						'margin-left':-width/2+'px',
						'margin-top':-height/2+'px',
					});
				}
			}
		}
	}
</script>
<style type="text/css" scoped>
	.tost-wrap{
		line-height: 40px;
		border-radius: 10px;
		background: rgba(0,0,0,0.5);
		font-size:15px;  
		position: fixed;
		z-index: 999;
		top:50%;
		left: 50%;
	}
	.tost-cell{
		    color: #fff;
    		padding: 0 14px;
    		white-space:nowrap;
	}
</style>