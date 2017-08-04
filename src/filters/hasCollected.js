import store from '@/store'

export default function (id) {
	let arr=store.state.collect_list
	for (let i=0,len=arr.length;i<len;i++){
		if (arr[i]['id']==id){
			return true;
		}
	}
}