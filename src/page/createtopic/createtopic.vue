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
			
			<div class="btnWrap">
				<span class="sureBtn" @click="doSub">
					提交
				</span>
				<span class="preView" @click="toPreView">
					预览
				</span>
			</div>
			<p class="markdowndesc">
				<a href="https://segmentfault.com/markdown">了解markdown语法~</a>
			</p>
		</div>

		<div class="preview" v-if="isPreView">
			<div class="head">
				<span class="close icon iconfont icon-signout" @click="closePre"></span>
				<span class="name">主题预览</span>
				<span class="fabiao icon iconfont icon-edit" @click="doSub"></span>
			</div>
			<div class="content">
				<div class="markdown-text" v-html="getContent">
					
				</div>
			</div>
		</div>

		
	</div>
</template>
<script type="text/javascript">
	const validate={
		isNoEmpty (val) {
			return {flag:(val?true:false),msg:'不能为空！'};
		},
		needLength (val,len) {
			return {flag:(val.length>=len?true:false),msg:'不能小于'+len+'个字符！'};
		},
		execute () {

		}
	}
	import userHomeHead from '@/components/userhomehead'
	import needLogin from '@/components/needLogin'
	import $ from 'jQuery'
	import {markdown} from 'markdown'
	
	export default {
		name:'createtopic',
		components:{userHomeHead,needLogin},
		computed:{
			loginShow () {
				return this.$store.state.loginFlag;
			},
			getContent () {
				let hasParsed=markdown.toHTML(this.content);
				return hasParsed;
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
			},
			doSub () {
				
				this.valueCheck()&&this.$http.post('https://cnodejs.org/api/v1'+this.api,{accesstoken:this.$store.state.accesstoken,title:this.title,tab:this.realTab,content:this.content}).then((data)=>{
					if (data.data.topic_id){
						this.show_model({
							type:'confirm',
							msg:'亲~恭喜发帖成功~是否转到新发的帖子?',
							url:'/topic/'+data.data.topic_id
						})
					}
				},(data)=>{
					this.$emit('showtost',data.data.error_msg)
				})

			},
			check () {
				let key=Array.prototype.shift.call(arguments);
				let val=Array.prototype.shift.call(arguments);
				return validate[key].apply(null,Array.prototype.concat(val,[].slice.call(arguments)));
			},
			valueCheck () {
				let el=this.$el;

				let tab=$(el).find('[name="tab"]');
				let tabres=this.check('isNoEmpty',this.realTab);

				let title=$(el).find('[name="title"]');
				let titleres2=this.check('needLength',this.title,10);

				let content=$(el).find('[name="content"]');
				let contentres=this.check('isNoEmpty',this.content);

				if (!tabres.flag){
					this.$emit('showtost','分类'+tabres.msg);
					!tab[0].focus&&tab.focus();
					return false
				}

				if (!titleres2.flag){
					this.$emit('showtost','标题'+titleres2.msg);
					!title[0].focus&&title.focus();
					return false
				}

				if (!contentres.flag){
					this.$emit('showtost','发表的内容'+contentres.msg);
					!content[0].focus&&content.focus();
					return false
				}
				return true;
			},
			show_model (param) {
	  			this.$emit('showmodel',{
	  				modelClass:param.type+'Class',
			        modelType:param.type.split(','),
			        modelShow:true,
			        modelMassage:param.msg,
			        toUrl:param.url,
			        hasMsg:param.hasMsg?param.hasMsg:false,
		  		})
  			},
  			closePre (){
  				this.isPreView=!this.isPreView;
  			},
  			toPreView () {
  				this.valueCheck()&&(this.isPreView=true);
  			}
		},
		data () {
			return {
				tab:'',
				realTab:'',
				title:'',
				content:'',
				tabList:[
					{name:'ask',info:'问答'},
					{name:'share',info:'分享'},
					{name:'job',info:'招聘'},
					{name:'dev',info:'测试'},
				],
				tabListShow:false,
				blurFlag:false,
				api:'/topics',
				isPreView:false
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
	    margin-bottom: 0;
	}
	.tabList{
		position: absolute;
	    top: 27px;
	    width: 100%;
	    background: #fff;
	    line-height: 30px;
	    text-indent: 1em;
	}
	.btnWrap{
		display: flex;
		text-align: center;
	}
	.btnWrap span{
		    flex-grow: 1;
		    background: #80bd01;
		    color: #fff;
		    height: 30px;
		    line-height: 30px;
	}
	.sureBtn{
		border-right:1px solid #fff; 
	}
	.markdowndesc{
		margin-top: 10px;
	}
	.markdowndesc a{
		color: #80bd01;
	}
	.preview{
		position: fixed;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		background: #eff2f7;
	}
	.head{
		display: flex;
	    height: 49px;
	    align-items: center;
	    background: #fff;
	    border-bottom: 1px solid #80bd01;
	}
	.close{
		height: 100%;
	    width: 14%;
	    line-height: 50px;
	    text-align: center;
	    font-size: 25px;
	}
	.name{
		width: 72%;
	    text-align: center;
	    height: 100%;
	    line-height: 50px;
	    font-size: 16px;
	    font-weight: bold;
	}
	.fabiao{
		width: 14%;
	    height: 100%;
	    line-height: 49px;
	    font-size: 25px;
	    color: #80bd01;
        text-align: center;
	}
	.content{
		    position: absolute;
		    top: 50px;
		    left: 0;
		    right: 0;
		    bottom: 0;
		    background: #fff;
		    overflow-y: auto;
		    overflow-x: hidden;
	}
</style>