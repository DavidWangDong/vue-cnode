import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
	state:{
		userid:'',
		loginFlag:false,
		username:'',
		tmpUrl:'',
		accesstoken:''
	},
	mutations:{
		login (state,param){
			state.userid=param.id;
			state.username=param.loginname;
			state.accesstoken=param.accesstoken;
			state.loginFlag=true;
		},
		unlogin (state){
			state.loginFlag=false;
		},
		setTmp (state,url) {
			state.tmpUrl=url;
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
	}
})

export default store;