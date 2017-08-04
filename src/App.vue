<template>
  <div id="app" v-fullheight>
    <router-view @showmodel="showModel"></router-view>
    <model-view :modelClass="modelClass" :modelType="modelType" :modelShow="modelShow" :modelMassage="modelMassage" @hidemodel="hideModel" :toUrl="toUrl"></model-view>
  </div>
</template>

<script>

import modelView from '@/components/modelView'

export default {
  name: 'app',
  components:{modelView},
  data () {
     return {
        modelClass:'',
        modelType:[],
        modelShow:false,
        modelMassage:'',
        toUrl:'',
     }
  },
  directives:{
    fullheight:{
      bind (el,binding,vnode) {
          el.style.height=window.innerHeight+'px';
      }
    }
  },
  methods:{
    showModel (data) {
      Object.keys(data).forEach((key)=>{
        this[key]=data[key];
      });
      console.log(this.modelType);
      if (this.modelType.indexOf('tost')>-1){
        setTimeout(()=>{
          this.modelType.splice(this.modelType.indexOf('tost'),1);
        },1000)
      }
    },
    hideModel () {
      this.modelShow=false;
    },

  },
}
</script>

<style>
  @import url(fonts/iconfont.css);
  *{margin:0;padding: 0;}
  body{font-family: "微软雅黑";font-size: 14px;background:#eff2f7;}
  a{text-decoration:none;color:#000;}
  ul,li{
    list-style-type: none;
  }
  img{
    vertical-align: middle;
  }
  #app{
    max-width: 640px;
    margin:0 auto;
    position: relative;
  }
  .icon.active{
    color:#80bd01 !important;
  }
</style>
