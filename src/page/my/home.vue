<template>
	<div class="wrap">
		<div class="home">
			home is home
		</div>
		<v-footer></v-footer>
	</div>
	
</template>

<script type="text/javascript">
	import vFooter from '@/components/footer'
	import mixin from '@/mixin'
	export default{
		name:'home',
		mixins:[mixin],
		components:{vFooter},
		data (){
			let that=this;
			return {
				api:'/user/i5ting',
			}
		},
		methods:{
			
		}
	}
</script>

<style type="text/css" scoped>
	
</style>
