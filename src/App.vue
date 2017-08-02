<template>
  <div id="app" v-fullheight>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  directives:{
    fullheight:{
      bind (el,binding,vnode) {
          el.style.height=window.innerHeight+'px';
      }
    }
  }
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
</style>
