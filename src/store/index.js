import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
	state:{
		userid:'',
		loginFlag:false,
		username:'',
		tmpUrl:'',
		accesstoken:'',
		collect_list:[],
		curr_topic_id:'',
		curr_reply_id:'',
		_urlHistory:[],
		_urlTmp:{},
		direction:'',
		scrollTop:0
	},
	mutations:{
		login (state,param){
			state.userid=param.id;
			state.username=param.loginname;
			state.accesstoken=param.accesstoken;
			state.loginFlag=true;
			Vue.http.get('https://cnodejs.org/api/v1/topic_collect/'+state.username).then(function (data) {
				if (data.data.success===true&&data.data.data.length>0){	
					store.commit('set_collect_list',data.data.data);
				}
			})
		},
		unlogin (state){
			state.loginFlag=false;
			state.collect_list=[];
		},
		setTmp (state,url) {
			state.tmpUrl=url;
		},
		set_collect_list (state,arr) {
			state.collect_list=JSON.parse(JSON.stringify(arr));
		},
		del_collect (state,id) {
			for (let i=0,len=state.collect_list.length;i<len;i++){
				if (state.collect_list[i].id==id){
					console.log(i);
					state.collect_list.splice(i,1);
					return;
				}
			}
		},
		add_collect (state,val) {
			state.collect_list.push(val);
		},
		set_curr (state,param){
			state[param.key]=param.id;
		},
		chgDirec (state,direction){
			state.direction=direction;
		},
		set_url (state,param){
				if (state._urlHistory.length>0){
					let lastItem=state._urlHistory[state._urlHistory.length-1];
					let key1=Object.keys(lastItem)[0]
					let key2=Object.keys(param)[0]
					if (key1==key2){
						Object.keys(lastItem[key1]).forEach((key)=>{
							lastItem[key1][key]=param[key1][key];
						})
						return;
					}
				}
				state._urlHistory.push(param);
		},
		del_last_url (state,_url){
			const lastItem = state._urlHistory.pop();
			Object.keys(lastItem)[0]!==_url&&state._urlHistory.push(lastItem);
		},
		set_urlTmp (state,param){
			Object.keys(param).forEach((key)=>{
				state._urlTmp[key]=param[key];
			})
		},
		set_scrollTop(state,val){
			state.scrollTop=val;
		}
	},
	getters : {
		getUserUrl (state) {
			return '/user/'+state.username;
		},
		getUserName (state) {
			return state.username;
		},
		getUserId (state) {
			return state.userid;
		},
		colList (state){
			return state.collect_list;
		},
	}
})

export default store;