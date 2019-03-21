import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router=new Router({
  routes: [
    {
      //积分兑换
      path: '/',
      component: resolve=>require(["../integral/index"],resolve),
    },
    {
      //兑换记录
      path: '/history',
      component: resolve=>require(["../integral/history"],resolve),
    },
    {
      //兑换详情页
      path:"/his-detail",
      component: resolve=>require(["../integral/exchange-detail"],resolve)
    },
    {
      //详情页
      path:"/detail",
      component: resolve=>require(["../integral/detail"],resolve)
    },
    {
      //兑换成功
      path:"/success",
      component: resolve=>require(["../integral/success"],resolve)
    },
    {
     //积分记录
     path:"/integral",
     component: resolve=>require(["../integral/integral-history"],resolve)
    },
    {
      //积分规则
      path:"/rule",
      component: resolve=>require(["../integral/rule"],resolve)
    },
    {
    //确认兑换
    path:"/sure",
    component: resolve=>require(["../integral/sure"],resolve)
    },
  ]
})
  router.beforeEach((to, from, next) => {
    if (to.matched.length ===0) {   
      from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    } else {
      next();        
    }
  });

export default router;
