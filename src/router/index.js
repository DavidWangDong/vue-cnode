import Vue from 'vue'
import Router from 'vue-router'
import IndexList from '@/page/IndexList/IndexList'
import topic from '@/page/topic/topic'
import home from '@/page/my/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'vue-cnode',
      component: IndexList
    },
    {
      path: '/topic/:id',
      name: 'vue-cnode',
      component: topic
    },
    {
      path: '/my/home',
      name: 'vue-cnode',
      component: home
    }
  ]
})