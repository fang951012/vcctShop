webpackJsonp([6],{"+SMM":function(t,i){},"2UAW":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e("mvHQ"),a=e.n(s),n=e("ergL"),o=e("K31e"),c=e("Au9i"),l={name:"integral",components:{common:n.a,login:o.a},data:function(){return{isActive:!0,title:{title:"积分商城",rightTitle:"兑换记录"},aReal:[],aVirtual:[],page:0,total:0,type:3,showLogin:!1,csrf:"",isLogin:!1,isApp:!1,virtualNum:0,busy:!1,loadingShow:!0,loadMoreHide:!1,loadingText:"加载中..."}},created:function(){var t=this;t.judgeApp(),t.login(),t.loadMore()},methods:{judgeApp:function(){var t=this,i=navigator.userAgent,e=-1!=i.indexOf("iPhone");if(-1!=i.indexOf("damailicai_app")){if(t.isApp=!0,e){try{JIClient.appSetHead({showBack:!0,title:"积分商城",right:"兑换记录"})}catch(t){}}else try{JIClient.appSetHead(!0,"积分商城","兑换记录")}catch(t){}window.appRight=t.appRight}else t.isApp=!1},appRight:function(){this.isLogin?window.location.href="/shop/index#/history":this.goLogin()},rightClick:function(){var t=this;t.isLogin?(t.$router.push("/history"),_hmt.push(["_trackEvent","兑换记录","click","dhlb-dhjl"])):t.showLogin=!0},goLogin:function(){var t=navigator.userAgent;if(-1!=t.indexOf("damailicai_app")){if(t.split("damailicai_app/")[1].split(";")[0]<"3.2.0")if(-1!=t.indexOf("iPhone"))quicklogin(url);else try{JIClient.appClose(),JIClient.appLogin()}catch(t){}else try{JIClient.appLogin()}catch(t){}return!1}this.showLogin=!0},getCsrf:function(){this.csrf=document.getElementsByName("csrf-token")[0].content},ret:function(){window.history.length>1?this.$router.go(-1):this.$router.push("/")},login:function(){var t=this;t.getCsrf(),t.$http.post("/shop/is-login",{},{headers:{"X-CSRF-Token":t.csrf}}).then(function(i){if(0!=(i=i.data).statusCode)return!1;t.isLogin=!0}).catch(function(t){Object(c.MessageBox)({title:"温馨提示",message:"系统繁忙，请稍后再试！"})})},loginSuccess:function(){var t=this;t.showLogin=!1,t.isLogin=!0,t.getList(3,1)},closeLogin:function(){this.showLogin=!1},goIntegral:function(){var t=this;t.isLogin?t.$router.push("/integral"):t.goLogin()},navActive:function(t){var i=this;i.type=t,i.page=1,i.total=0,i.loadingText="加载中...",i.getList(i.type,i.page)},update:function(t){return JSON.parse(a()(t))},saveNum:function(t){this.virtualNum=t,localStorage.setItem("virtualNum",t)},loadMore:function(){var t=this;t.busy=!0,t.loadingText="加载中...",t.page++,t.getList(t.type,t.page)},getList:function(t,i){c.Indicator.open({text:"Loading...",spinnerType:"fading-circle"});var e=this;1==i&&(e.aReal=[],e.aVirtual=[]);var s=new FormData;s.append("kind",t),s.append("page",i),e.$http.post("/shop/getlist",s,{headers:{"X-CSRF-Token":e.csrf,"Content-Type":"multipart/form-data"}}).then(function(i){if("0"==(i=i.data).statusCode){i.content.virtual_money&&e.saveNum(i.content.virtual_money),e.total=i.content.total;for(var s=i.content.list,a=0;a<s.length&&s[a].seller_price!=s[a].show_price;a++)s[a].discount_rate=Math.floor(100*Number(s[a].seller_price)/Number(s[a].show_price))/10;if(1==t){for(var n=0;n<s.length;n++)e.aReal.push(s[n]);e.isActive=!1}else{for(n=0;n<s.length;n++)e.aVirtual.push(s[n]);e.isActive=!0}if(e.total<=10*e.page)return e.loadingText="—— 我是有底线的列表 ——",c.Indicator.close(),!1;e.loadingText="下拉加载更多",e.busy=!1}else Object(c.MessageBox)({title:"温馨提示",message:i.message}),e.busy=!1;c.Indicator.close()}).catch(function(t){console.log(t),Object(c.MessageBox)({title:"温馨提示",message:"系统繁忙，请稍后再试！"})})}}},r={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"exchange"}},[e("div",{staticClass:"cont"},[t.isApp?t._e():e("common",{attrs:{title:t.title.title,rightTitle:t.title.rightTitle},on:{"right-click":t.rightClick}}),t._v(" "),e("nav",{class:{top:t.isApp}},[e("a",{class:{active:t.isActive},attrs:{href:"javascript:void(0)",onclick:"_hmt.push(['_trackEvent', '积分兑换-虚拟产品', 'click', 'dhlb-xnlp'])"},on:{click:function(i){t.navActive(3)}}},[t._v("虚拟礼品")]),t._v(" "),e("a",{class:{active:!t.isActive},attrs:{href:"javascript:void(0)",onclick:"_hmt.push(['_trackEvent', '积分兑换-实物周边', 'click', 'dhlb-swzb'])"},on:{click:function(i){t.navActive(1)}}},[t._v("实物周边")])]),t._v(" "),e("div",{staticClass:"list-box"},[e("ul",{directives:[{name:"show",rawName:"v-show",value:t.isActive,expression:"isActive"}]},t._l(t.aVirtual,function(i){return e("li",[e("div",{staticClass:"clear"},[e("a",{attrs:{href:"#/detail?id="+i.goods_id}},[0==i.stocks?e("div",{staticClass:"sold-out"},[e("div",{staticClass:"sold-icon"})]):t._e(),t._v(" "),i.discount_rate?e("span",{staticClass:"discount-icon"},[e("p",[t._v(t._s(i.discount_rate))]),e("p",[t._v("折")])]):t._e(),t._v(" "),e("img",{attrs:{src:i.thum_img}}),t._v(" "),1==i.hot?e("span",{staticClass:"foot-icon"},[t._v("热销")]):t._e()])]),t._v(" "),e("h3",[t._v(t._s(i.title))]),t._v(" "),e("p",[e("span",{staticClass:"integral-icon"}),t._v(" "),e("span",{staticClass:"num"},[t._v(t._s(i.seller_price))]),t._v(" "),e("span",[t._v("积分")])])])})),t._v(" "),e("ul",{directives:[{name:"show",rawName:"v-show",value:!t.isActive,expression:"!isActive"}]},t._l(t.aReal,function(i){return e("li",[e("div",{staticClass:"clear"},[e("a",{attrs:{href:"#/detail?id="+i.goods_id}},[0==i.stocks?e("div",{staticClass:"sold-out"},[e("div",{staticClass:"sold-icon"})]):t._e(),t._v(" "),i.discount_rate?e("span",{staticClass:"discount-icon"},[e("p",[t._v(t._s(i.discount_rate))]),e("p",[t._v("折")])]):t._e(),t._v(" "),e("img",{attrs:{src:i.thum_img}}),t._v(" "),1==i.hot?e("span",{staticClass:"foot-icon"},[t._v("热销")]):t._e()])]),t._v(" "),e("h3",[t._v(t._s(i.title))]),t._v(" "),e("p",[e("span",{staticClass:"integral-icon"}),t._v(" "),e("span",{staticClass:"num"},[t._v(t._s(i.seller_price))]),t._v(" "),e("span",[t._v("积分")])])])})),t._v(" "),e("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],class:t.loadMoreHide?"load-more-hide":"load-more-normal",attrs:{"infinite-scroll-disabled":"busy","infinite-scroll-distance":"4"}},[e("span",{directives:[{name:"show",rawName:"v-show",value:t.loadingShow,expression:"loadingShow"}],domProps:{textContent:t._s(t.loadingText)}})])])],1),t._v(" "),e("footer",[e("span",[e("span",[t._v("我的积分")]),t._v(" "),t.isLogin?e("span",{staticClass:"num",domProps:{textContent:t._s(t.virtualNum)}}):e("span",{staticClass:"num",on:{click:t.goLogin}},[t._v("登录查看")])]),t._v(" "),e("a",{attrs:{href:"javascript:void(0)",onclick:"_hmt.push(['_trackEvent', '积分兑换-积分记录', 'click', 'dhlb-jfjl'])"},on:{click:t.goIntegral}},[t._v("积分记录")])]),t._v(" "),e("login",{directives:[{name:"show",rawName:"v-show",value:t.showLogin,expression:"showLogin"}],on:{"close-login":t.closeLogin,"login-success":t.loginSuccess}})],1)},staticRenderFns:[]};var v=e("VU/8")(l,r,!1,function(t){e("+SMM")},null,null);i.default=v.exports}});