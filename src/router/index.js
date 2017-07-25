import Vue from 'vue'
import Router from 'vue-router'
import IndexList from '@/page/IndexList/IndexList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'vue-cnode',
      component: IndexList
    }
  ]
})
