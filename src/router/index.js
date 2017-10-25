import Vue from 'vue'
import Router from 'vue-router'
import IndexList from '@/page/IndexList/IndexList'
import topic from '@/page/topic/topic'
import home from '@/page/my/home'
import messages from '@/page/my/messages'
import user from '@/page/user/userinfo'
import login from '@/page/login/loginpage'
import createtopic from '@/page/createtopic/createtopic'
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
      path: '/my/messages',
      name: 'messages',
      meta:{
        needLogin:true
      },
      component: messages
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
    },
    {
      path:'/createtopic',
      name:'createtopic',
      meta:{
        needLogin:true
      },
      component:createtopic
    }
  ]
})

router.beforeEach(function (to,from,next) {
    
    let item=store.state._urlHistory;
    if (item.length>=1){
      let key=Object.keys(item[item.length-1])[0];
      if (to.fullPath==key){
        let last=item[item.length-1];
        store.commit('chgDirec','back');
      }else{
        store.commit('chgDirec','forward');
      }
    }else{
        store.commit('chgDirec','forward');
    }
    next();
});
router.afterEach(function(to,from,next){
  
  if (from.name===null){
    router.push({path:'/'})
    return
  }
  // let toIndex,fromIndex;
  // router.options.routes.forEach(function(val,index){
  //   if (to.name == val.name){
  //     toIndex=index;
  //   }
  //   if (from.name==val.name){
  //     fromIndex = index;
  //   }
  // })
  // if (toIndex<fromIndex){
  //   router.push({path:'/'});
  // }
})
export default router;