import Vue from 'vue'
import Router from 'vue-router'
import IndexList from '@/page/IndexList/IndexList'
import topic from '@/page/topic/topic'
import home from '@/page/my/home'
import user from '@/page/user/userinfo'
import login from '@/page/login/loginpage'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'IndexList',
      component: IndexList
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: topic
    },
    {
      path: '/my/home',
      name: 'home',
      meta:{
        needLogin:true
      },
      component: home
    },
    {
      path: '/user/:name',
      name: 'user',
      component: user
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

router.beforeEach(function (to,from,next) {
    next();
});

export default router;