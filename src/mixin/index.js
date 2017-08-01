import Vue from 'vue';
import vueResource from 'vue-resource';
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
				this.getFromApi(param.url,param.option,function(data){
					let dataList=data.data.data;
					let type=Object.prototype.toString.call(dataList);
					if (type==='[object Object]'){
						that.pageData.push(dataList);
						return;
					}
					that.pageData=JSON.parse(JSON.stringify(dataList));
				})
			} catch (e){
				
			}
			
		},
	}
}

export default mixin;