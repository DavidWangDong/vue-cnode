<template>
  	<ul class="topNav">
  		<li v-for="(val,index) in listData" :class="{active:isActive(val.link),currLink:isActive(val.link)}" v-hover>
  			<router-link :to="val.link">{{val.name}}</router-link>
  		</li>
  	</ul>
</template>

<script>
export default {
  name: 'vNav',
  data () {
    return {
    	listData:[
    		{name:'全部',link:'/'},
    		{name:'精华',link:'/?tab=good'},
    		{name:'weex',link:'/?tab=weex'},
    		{name:'分享',link:'/?tab=share'},
    		{name:'问答',link:'/?tab=ask'},
    		{name:'招聘',link:'/?task=job'}
    	]
    }
  },
  methods:{
  	isActive (link){
  		return this.$route.fullPath===link; 
  	},
  },
  directives:{
  	hover:{
  		bind (el,binding,vnode){
  			let that=this;
  			el.addEventListener('mouseover',function (e) {
  				this.className.split(' ').indexOf('active')<=-1&&(this.className=this.className.split(' ').concat('active').join(' '));
  			},false);
  			el.addEventListener('mouseout',function (e) {
  				let classArray = this.className.split(' ');
  				let trueArr=[];
  				for (let i=0,len=classArray.length;i<len;i++){
  					if (classArray[i]){
  						trueArr.push(classArray[i]);
  					}
  				}
  				let index = trueArr.indexOf('active')
  				if (trueArr.indexOf('currLink')<=-1&&index>-1){
  					trueArr.splice(index,1);
  					this.className=trueArr.join(' ');
  				}
  			},false);
  		},
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topNav{
	width:100%;
	display: flex;
	height: 49px;
	border-bottom: 1px solid #ccc;
}
.topNav>li{
	display: flex;
	flex-grow:1;
	position: relative;
}
.topNav>li>a{
	display: flex;
	flex-grow: 1;
	justify-content:center;
	align-items:center;
	color:#999;
}
.topNav>li.active>a{
	color:#80bd01;
}
.topNav>li.active:after{
	content: "";
    position: absolute;
    right: 0;
    left: 0;
    bottom: 1px;
    z-index: 1;
    height: 3px;
    background: #80bd01;
}
</style>
