import Vue from 'vue';
import vueResource from 'vue-resource';
import hasCollect from '@/filters/hasCollected'
Vue.use(vueResource);
const mixin={
	data () {
		return {
			target:'https://cnodejs.org/api/v1',
			page:1,
			complete:false,
			loading:false,
			pageData:[]
		}
	},
	created () {
		this.complete=true;
	},
	mounted (){
		this.pullData();
	},
	watch:{
		$route (news,old) {
			this.pullData();
		},
		api () {
			this.pullData();
		}
	},
	methods:{
		getFromApi (url,option={},call){
			this.$http.get(url,option).then((data)=>{call&&call(data)});
		},
		createApi () {
			let param={};
			let url=this.target+this.api;
			var that = this;
			let params=JSON.parse(JSON.stringify(this.$route.query));
			params.page=this.page;
			let option={
				params:params
			}
			param.url=url;
			param.option=option;
			return param;
		},
		init (){
			this.page=1;
			this.complete=false;
			this.clear();
		},
		clear (){
			this.pageData.splice(0,this.pageData.length);
		},
		pullData () {
			this.init();
			let param=this.createApi();
			let that=this;
			try {
				if (param.isDo===false){
					return;
				}
				this.getFromApi(param.url,param.option,function(data){
					let dataList=data.data.data;
					let type=Object.prototype.toString.call(dataList);
					if (type==='[object Object]'){
						that.pageData.push(dataList);
						return;
					}
					that.pageData=that.pageData.concat(JSON.parse(JSON.stringify(dataList)));
				})
			} catch (e){
				
			}
			
		},
		toDoCollect (id,val) {
	  		let that=this
	  		if (this.redirect_to_login()===false) {
	  			return false;
	  		}
	  		if (hasCollect(id)){
	  			
	  			this.$http.post(this.target+'/topic_collect/de_collect',{accesstoken:this.$store.state.accesstoken,topic_id:id}).then(function(data){
		  			let msg='取消收藏！'
		  			if (!(data.ok&&data.success)){
			  			that.$emit('showtost',msg);
		  				that.$store.commit('del_collect',id);
		  			}
	  			})
	  			return;
	  		}
	  		this.$http.post(this.target+'/topic_collect/collect',{accesstoken:this.$store.state.accesstoken,topic_id:id}).then(function(data){
	  			let msg='收藏成功！'
	  			if (!(data.ok&&data.data.success)){
	  				msg="收藏失败！"
	  			}else{
	  				that.$store.commit('add_collect',val);
	  			}
	  			that.$emit('showtost',msg);
	  		})
  		},
  		isCollect (id) {
	  		let arr=this.$store.getters.colList;
	  		for (let i=0,len=arr.length;i<len;i++){
					if (arr[i].id==id){
						return true;
					}
			}
  		},
  		redirect_to_login () {
  			let that=this
	  		if (!this.$store.state.loginFlag) {
	  			this.show_model(
	  					{
	  						type:'confirm',
	  						msg:'亲~您还没有登录,请先登录哦！',
	  						url:'/login'
	  					}
	  				);
	  			return false;
	  		}
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
  		}
	}
}

export default mixin;