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
          console.log(el.style.height);
          el.style.height=window.innerHeight+'px';
      }
    }
  }
}
</script>

<style>
  *{margin:0;padding: 0;}
  body{font-family: "微软雅黑";font-size: 14px;}
  a{text-decoration:none;color:#000;}
  ul,li{
    list-style-type: none;
  }
  #app{
    max-width: 640px;
    margin:0 auto;
    position: relative;
  }
</style>
