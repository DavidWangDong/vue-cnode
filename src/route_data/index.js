const defaultKey = ['pageData','scrollTop'];
import store from '@/store'
// 通过历史记录恢复数据
const history_get_data =function () {
	if (store.state.direction=='forward')
		return;
	const lastItem=store.state._urlHistory[store.state._urlHistory.length-1]
	const key=Object.keys(lastItem)[0];
	Object.assign(this.$data,lastItem[key]);
	del_history_url(this.curr_url);
}

// 添加到历史记录
const add_history_url = function (store_data) {

	if (Object.prototype.toString.call(store_data)!=='[object Array]'){
		throw 'Need a Array';
		return;
	}

	defaultKey.forEach((key)=>{
		store_data.indexOf(key)<=-1&&store_data.push(key);
	})

	let param={};
	let data={}
	store_data.forEach((key)=>{
		data[key]=this.$data[key];
	})
	param[this.curr_url]=JSON.parse(JSON.stringify(data));
	this.$store.commit('set_url',param);
}

// 从历史记录中删除
const del_history_url = function (_url) {
	store.commit('del_last_url',_url);

}

export default {
	methods:{
		history_get_data:history_get_data,
		add_history_url:add_history_url,
		del_history_url:del_history_url
	}
}