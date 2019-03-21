import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router=new Router({
  routes: [
    {
      //首页
      path: '/',
      component: resolve=>require(["../view/home/index"],resolve),
    },
    {
      //服务详情
      path: '/',
      component: resolve=>require(["../view/home/serverInformation"],resolve),
    },
    {
      //商铺详情
      path: '/',
      component: resolve=>require(["../view/home/shopInformation"],resolve),
    },
    {
      //购买优惠券
      path: '/',
      component: resolve=>require(["../view/buyCoupon/index"],resolve),
    },
    {
      //我的优惠券
      path: '/',
      component: resolve=>require(["../view/myCoupon/index"],resolve),
    },
    {
      //我的优惠券使用记录
      path: '/',
      component: resolve=>require(["../view/myCoupon/recordList"],resolve),
    },
    {
      //我的订单
      path: '/',
      component: resolve=>require(["../view/order/index"],resolve),
    },
    {
      //我的订单详情
      path: '/',
      component: resolve=>require(["../view/order/details"],resolve),
    },
    {
      //支付
      path: '/',
      component: resolve=>require(["../view/payment/index"],resolve),
    },
    {
      //地址
      path: '/',
      component: resolve=>require(["../view/address/index"],resolve),
    },
    {
      //地址编辑
      path: '/',
      component: resolve=>require(["../view/address/edit"],resolve),
    },

  ]
})
// const router=new Router({
//   routes: [
//     {
//       //积分兑换
//       path: '/',
//       component: resolve=>require(["../integral/index"],resolve),
//     },
//     {
//       //兑换记录
//       path: '/history',
//       component: resolve=>require(["../integral/history"],resolve),
//     },
//     {
//       //兑换详情页
//       path:"/his-detail",
//       component: resolve=>require(["../integral/exchange-detail"],resolve)
//     },
//     {
//       //详情页
//       path:"/detail",
//       component: resolve=>require(["../integral/detail"],resolve)
//     },
//     {
//       //兑换成功
//       path:"/success",
//       component: resolve=>require(["../integral/success"],resolve)
//     },
//     {
//      //积分记录
//      path:"/integral",
//      component: resolve=>require(["../integral/integral-history"],resolve)
//     },
//     {
//       //积分规则
//       path:"/rule",
//       component: resolve=>require(["../integral/rule"],resolve)
//     },
//     {
//     //确认兑换
//     path:"/sure",
//     component: resolve=>require(["../integral/sure"],resolve)
//     },
//   ]
// })
  router.beforeEach((to, from, next) => {
    if (to.matched.length ===0) {
      from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    } else {
      next();
    }
  });

export default router;
