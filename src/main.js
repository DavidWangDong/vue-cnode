// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import time from './filters/time'
import store from '@/store'
import vScroll from '@/directive/vScroll/index'

Vue.filter('time_format',time);
Vue.directive('scroll',vScroll)
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
