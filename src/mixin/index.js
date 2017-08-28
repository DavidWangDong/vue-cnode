import Vue from 'vue';
import vueResource from 'vue-resource';
import hasCollect from '@/filters/hasCollected';
import pullData from './pullData';
import route_data from '@/route_data';
import $ from 'jQuery'
Vue.use(vueResource);
let mixin={
	mixins:[pullData,route_data],
	data () {
		return {
			target:'https://cnodejs.org/api/v1',
			page:1,
			complete:false,
			loading:true,
			pageData:[],
			scrollTop:0,
			curr_url:'',
			store_data:[],
		}
	},
	created () {
		this.curr_url=this.$route.fullPath;
		if (this.$store.state.direction=='back'){
			this.history_get_data();
			this.pageData.length>0&&(this.complete=true);
			this.loading=false;
		}
	},
	beforeDestroy () {
		this.$store.state.direction=='forward'&&this.add_history_url(Object.assign([],this.store_data));
	},
	mounted (){
		!this.complete&&this.pullData();
	},
	watch:{
		$route (news,old) {
				this.curr_url=this.$route.fullPath;
				this.init();
				this.pullData();
		},
		page () {
			this.loading=true;
			setTimeout(()=>{this.pullData()},500)
		}
	},
	computed:{
			loginShow () {
				return !this.$store.state.loginFlag;
			}
	},
	methods:{
		init (){
			this.page=1;
			this.complete=false;
			this.loading=true;
			this.clear();
		},
		clear (){
			this.pageData.splice(0,this.pageData.length);
		},
		pullData () {
			this.clear_cache();
			this.add_before((param,next)=>{
				const needLogin=this.$route.meta.needLogin
				const accesstoken=this.$store.state.accesstoken

				if (needLogin&&!accesstoken){
					return;
				}
				if (needLogin){
					param.body['accesstoken']=accesstoken;
				}
				next();
			});
			this.add_before((param,next)=>{
					const needLogin=this.$route.meta.needLogin
					let params=JSON.parse(JSON.stringify(this.$route.query));
					params.page=this.page;
					param.body=needLogin?Object.assign(param.body,params):Object.assign({},params);
					param.url=this.target+this.api;
					next()
			})
			
			this.add_after((data,next)=>{
				if (!data.ok){
					this.$emit('showtost',data.data.error_msg);
					this.$router.back();
					return;
				}
				let dataList=data.data.data;
				let type=Object.prototype.toString.call(dataList);
				this.loading=false;
				if (type==='[object Object]'){
					this.pageData.push(dataList);
					return;
				}
				this.pageData=this.pageData.concat(JSON.parse(JSON.stringify(dataList)));
			});
			this.doAjax();
		},
		toDoCollect (id,val) {
	  		let that=this
	  		if (this.redirect_to_login()===false) {
	  			return false;
	  		}
	  		const collectflag=hasCollect(id);
	  		const msg=collectflag?'取消收藏！':'收藏成功！';
	  		const action=collectflag?'de_collect':'collect';
	  		this.clear_cache();
	  		this.add_before((param,next)=>{
	  			param.url=this.target+'/topic_collect/'+action;
	  			param.method="POST";
	  			param.body={accesstoken:this.$store.state.accesstoken,topic_id:id};
	  			next();
	  		});
	  		this.add_after((data,next)=>{
	  			if (data.ok==false){
	  				this.$emit('showtost',data.data.error_msg);
	  				return;
	  			}
	  			!collectflag&&this.$store.commit('add_collect',val);
	  			collectflag&&this.$store.commit('del_collect',id);
	  			this.$emit('showtost',msg);
	  		})
	  		this.doAjax()
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
  		},
  		chgTab (val) {
				this.active=val;
			}
	}
}
export default mixin;