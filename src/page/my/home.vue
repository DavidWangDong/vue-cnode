<template>
	<div class="wrap">
		<user-home :pagedata="pageData" :username="user" :target="target"></user-home>
		<v-footer></v-footer>
	</div>
	
</template>

<script type="text/javascript">
	import vFooter from '@/components/footer'
	import mixin from '@/mixin'
	import userHome from '@/components/userhome'
	export default{
		name:'home',
		mixins:[mixin],
		components:{vFooter,userHome},
		data (){
			let that=this;
			return {
				api:'/user/i5ting',
				user:'i5ting'
			}
		},
	}
</script>