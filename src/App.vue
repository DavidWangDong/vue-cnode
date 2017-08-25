<template>
  <div id="app" v-fullheight>
    
    <template>
      
        <router-view @showmodel="showModel"  @showtost="showTost"></router-view>
      
      <model-view :modelClass="modelClass" :modelType="modelType" :modelShow="modelShow" :modelMassage="modelMassage" @hidemodel="hideModel" :toUrl="toUrl" @showtost="showTost" @comment="comment_topic" :hasMsg="hasMsg"></model-view>
    </template>
    <tost-view v-for="(val,index) in messageList" :message="val" :key="index"></tost-view>
  </div>
  </template>


<script>

import modelView from '@/components/modelView'
import tostView from '@/components/tostView'
import mixin from '@/mixin/pullData'


export default {
  name: 'app',
  mixins:[mixin],
  components:{modelView,tostView},
  data () {
     return {
        modelClass:'',
        modelType:[],
        modelShow:false,
        modelMassage:'',
        toUrl:'',
        messageList:[],
        url:'https://cnodejs.org/api/v1',
        hasMsg:false
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
    },
    hideModel () {
      this.modelShow=false;
    },
    showTost (message) {
        this.messageList.push(message);
        setTimeout(()=>{
          let del_index=this.messageList.indexOf(message);
          this.messageList.splice(del_index,1);
        },800)
    },
    comment_topic (message) {
      this.clear_cache('all');
      this.add_before((param,next)=>{
          param.url=this.url+/topic/+this.$store.state.curr_topic_id+'/replies';
          param.method='POST';
          param.body={accesstoken:this.$store.state.accesstoken,content:message,reply_id:this.$store.state.curr_reply_id};
          next();
      });
      this.add_after((data,next)=>{
        if (data.ok){
          // this.$http.get(this.url+/topic/+this.$store.state.curr_topic_id).then((data)=>{
          //   // this.pageData.pop();
          //   // this.pageData.push(data.data.data);
          //   console.log(this);
          // })
          this.hideModel();
          return;
        }
        this.showTost(data.data.error_msg);
      });
      this.doAjax();
    }
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
<style type="text/css">
  .markdown-text{
    padding: 0 10px;
  }
  .markdown-text p{
        margin: 10px 0px;
        line-height: 27px;
  }
  .markdown-text p img{
    display: block;
  }
  .markdown-text .prettyprint{
    background: #ccc;
    overflow-x: auto;
    line-height: 24px;
  }
  .markdown-text img{
    max-width: 100%;
  }
  .markdown-text h2{
    margin: 10px 0;
  }
  .markdown-text h1{
    margin: 15px 0;
  }
  .markdown-text a{
    color:#ea0bd8;
  }
  .markdown-text ul{
    padding-left: 20px;
  }
</style>
