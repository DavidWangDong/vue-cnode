<template>
	<div class="createWrap">
		<user-home-head :title="'创建主题'"></user-home-head>
		<need-login>
		</need-login>
		<div class="formWrap" v-if="loginShow">
			<input readonly type="text" v-model="tab" name="tab" placeholder="请选择分类" class="inputCell" @focus="toggleTab" @blur="tabBlur">
			<input type="text" v-model="title" name="title" placeholder="标题(10个字数以上)" class="inputCell">
			<textarea  type="text" v-model="content" name="content" placeholder="内容(支持markdown语法)" class="inputCell"></textarea>
			<ul class="tabList" v-if="tabListShow">
					<li v-for="(val,index) in tabList" @click="chooseTab(val)">
						{{val.info}}
					</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	import userHomeHead from '@/components/userhomehead'
	import needLogin from '@/components/needLogin'
	export default {
		name:'createtopic',
		components:{userHomeHead,needLogin},
		computed:{
			loginShow () {
				return this.$store.state.loginFlag;
			}
		},
		methods:{
			toggleTab (){
				this.tabListShow=!this.tabListShow;
			},
			chooseTab (val) {
				if (this.blurFlag){
					this.tab=val.info;
					this.realTab=val.name;
					this.blurFlag=false;
					this.toggleTab();
				}
			},
			tabBlur () {
				this.blurFlag=true;
			}
		},
		data () {
			return {
				tab:'',
				reaTab:'',
				title:'',
				content:'',
				tabList:[
					{name:'ask',info:'问答'},
					{name:'share',info:'分享'},
					{name:'job',info:'招聘'},
					{name:'dev',info:'测试'},
				],
				tabListShow:false,
				blurFlag:false
			}
		}
	}
</script>
<style type="text/css" scoped>
	.formWrap{
		    width: 80%;
		    margin: 0 auto;
		    margin-top: 15px;
		    position: relative;
	}
	.inputCell {
	    display: block;
	    width: 100%;
	    outline: none;
	    border: none;
	    background: none;
	    line-height: 27px;
	    margin-bottom: 30px;
	    border-bottom: 1px solid #ccc;
	}
	textarea.inputCell{
		border: 1px solid #ccc;
	    height: 308px;
	    resize: none;
	}
	.tabList{
		position: absolute;
	    top: 27px;
	    width: 100%;
	    background: #fff;
	    line-height: 30px;
	    text-indent: 1em;
	}
</style>