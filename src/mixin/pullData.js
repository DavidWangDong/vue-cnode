const default_option={
	url:'/',
	method:'GET',
	body:{},
	progress:null
}

const before_send=[];

const after_get=[];


// 执行函数队列
const execute_arr =function (arr,param,type) {
	const tmp_arr=[];
	const len=arr.length;
	type=='get'&&(param=Object.assign({},param));
	let arr_next=null;
	if (len==1){
		arr_next=(type==='res'?(()=>{}).bind(null,param):realAjax.bind(this,param));
		tmp_arr.unshift(arr[0].bind(null,param,arr_next));
	}
	for (let i=len-1;i>0;){
		if (i==len-1){
			arr_next=(type==='res'?(()=>{}).bind(null,param):realAjax.bind(this,param));
			arr_next=arr[i].bind(null,param,arr_next)
		}else{
			arr_next=arr[i].bind(null,param,arr_next);
		}
		tmp_arr.unshift(arr[--i].bind(null,param,arr_next));
	}
	tmp_arr[0]();
}

// 增加ajax之前的函数队列
const add_before =(fn)=>{
	is_func(fn)&&before_send.push(fn);
}
// 增加ajax之后的函数队列
const add_after =(fn)=>{
	is_func(fn)&&after_get.push(fn);
}

// 检查是否为函数
const is_func = (fn)=>{
	if (typeof fn !=='function'){
		throw 'Need a function';
		return false;
	}
	return true;
}

const realAjax = function (data) {
	const method_str=data.method.toLowerCase();
	const resutl_fn= function (res) {execute_arr(after_get,res,'res')};
	switch (method_str){
		case 'get':
			this.$http.get(data.url,{params:data.body}).then((res)=>{

				resutl_fn(res);
			},(res)=>{
				resutl_fn(res);
			}); break;
		case 'post':
			this.$http.post(data.url,data.body).then((res)=>{
				resutl_fn(res);
			},(res)=>{
				resutl_fn(res);
			}); break;
		case 'jsonp':
			this.$http.jsop(data.url,{params:data.body}).then((res)=>{
				resutl_fn(res);
			},(res)=>{
				resutl_fn(res);
			}); break;
	}
}

const proxy_ajax = function (param) {
	if (Object.prototype.toString.call(param)!=='[object Object]'){
		throw 'Need a Object';
		return;
	}
	let fixed_param={};
	fixed_param=Object.assign(default_option,param);
	execute_arr.bind(this)(before_send,fixed_param,'get');
}

const clear_cache=function (type) {
	type=type?type:'all';
	switch (type){
		case 'all':	before_send.length=0;
					after_get.length=0;
					break;
		case 'before' : before_send.length=0;break;
		case 'after' : after_get.length=0;break;
	}
}

export default {
	methods:{
		doAjax (param) {
			const params=param?param:{};
			proxy_ajax.call(this,params)
		},
		add_before:add_before,
		add_after:add_after,
		clear_cache:clear_cache,
	}
}
