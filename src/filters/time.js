export default function (timeStr){
	let create_time=new Date(timeStr).getTime();
	let curr_time=new Date().getTime();
	let diff_time=curr_time-create_time;
	let limit_gg=1000;
	let limit_second=60*1000;
	let limit_minum=3600*1000;
	let limit_hour= 3600*24*1000;
	let limit_day=limit_hour*30;
	let limit_mounth=limit_day*12;
	let str=diff_time<limit_gg?'刚刚':
	diff_time<limit_second?Math.ceil(diff_time/limit_gg)+'秒前':
	diff_time<limit_minum?Math.ceil(diff_time/limit_second)+'分钟前':
	diff_time<limit_hour?Math.ceil(diff_time/limit_minum)+'小时前':
	diff_time<limit_day?Math.ceil(diff_time/limit_hour)+'天前':
	diff_time<limit_mounth?Math.ceil(diff_time/limit_day)+'个月前':
	Math.ceil(diff_time/limit_mounth)+'年前';
	return str;
}