import Vue from 'vue'
import Router from 'vue-router'
import IndexList from '@/page/IndexList/IndexList'
import topic from '@/page/topic/topic'

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
    }
  ]
})
