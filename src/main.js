
import Vue from 'vue'
import App from './App'
import router from './router'
import time from './filters/time'
import store from '@/store'
import vScroll from '@/directive/vScroll/index'

Vue.filter('time_format',time);
Vue.directive('scroll',vScroll)
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
