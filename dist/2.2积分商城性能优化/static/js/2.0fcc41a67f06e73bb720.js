webpackJsonp([2],{K31e:function(t,s,e){"use strict";var a=e("Au9i"),i={name:"login",data:function(){return{userName:"",passWord:"",csrf:""}},created:function(){},methods:{getCsrf:function(){this.csrf=document.getElementsByName("csrf-token")[0].content},close:function(){this.$emit("close-login")},login:function(){var t=this;if(!t.userName||!t.passWord)return Object(a.MessageBox)({title:"温馨提示",message:"请输入账号密码"}),!1;t.getCsrf();var s=new FormData;s.append("userName",t.userName),s.append("password",t.passWord),s.append("type","quick_login"),t.$http.post("/home/login",s,{headers:{"Content-Type":"multipart/form-data","X-CSRF-Token":t.csrf}}).then(function(s){0==(s=s.data).statusCode?t.$emit("login-success"):Object(a.MessageBox)({title:"温馨提示",message:s.message})}).catch(function(t){Object(a.MessageBox)({title:"温馨提示",message:"系统繁忙，请稍后再试"})})}}},n={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"mask",attrs:{id:"login"}},[e("div",{staticClass:"mask-cont login-box"},[e("div",{staticClass:"title"},[e("span",{staticClass:"tipsclose",on:{click:t.close}},[t._v("×")]),t._v("快速登录")]),t._v(" "),e("div",{staticClass:"form_ctrl"},[e("div",{staticClass:"group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.userName,expression:"userName"}],attrs:{type:"text",name:"userName",placeholder:"请输入手机号码/用户名",autocomplete:"off"},domProps:{value:t.userName},on:{input:function(s){s.target.composing||(t.userName=s.target.value)}}})]),t._v(" "),e("div",{staticClass:"group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.passWord,expression:"passWord"}],attrs:{type:"password",name:"password",placeholder:"请输入登录密码",autocomplete:"off"},domProps:{value:t.passWord},on:{input:function(s){s.target.composing||(t.passWord=s.target.value)}}})]),t._v(" "),t._m(0),t._v(" "),e("a",{staticClass:"box_btn login_btn",attrs:{href:"javascript:void(0)"},on:{click:t.login}},[t._v("登录")])])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"other_info"},[s("a",{attrs:{href:"/home/resetpw"}},[this._v("找回密码")]),this._v(" "),s("a",{staticClass:"rt",attrs:{href:"/home/reg",id:""}},[this._v("注册专享红包")])])}]};var o=e("VU/8")(i,n,!1,function(t){e("cGsX")},null,null);s.a=o.exports},cGsX:function(t,s){},m16B:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("mvHQ"),i=e.n(a),n=e("ergL"),o=e("K31e"),c=e("Au9i"),l={name:"detail",components:{"common-head":n.a,login:o.a},created:function(){var t=this;t.getDetail(),t.login(),t.getNum(),t.judgeApp()},data:function(){return{title:"积分兑换",isActive:"one",oDetail:{},flag:!0,num:1,goodsId:"",sellOut:!0,showLogin:!1,maxBuy:"",csrf:"",isLogin:!1,isApp:!1,virtualNum:0}},computed:{seller_price:function(){return this.num*this.oDetail.seller_price}},methods:{getNum:function(){localStorage.getItem("virtualNum")&&(this.virtualNum=localStorage.getItem("virtualNum"))},judgeApp:function(){var t=navigator.userAgent,s=-1!=t.indexOf("iPhone");if(-1!=t.indexOf("damailicai_app"))if(this.isApp=!0,s){try{JIClient.appSetHead({showBack:!0,title:"积分兑换"})}catch(t){}}else try{JIClient.appSetHead(!0,"积分兑换","")}catch(t){}else this.isApp=!1},checkNum:function(){var t=this;t.num<0&&(t.num=0),t.num>t.maxBuy&&(t.num=t.maxBuy,Object(c.MessageBox)({title:"温馨提示",message:"您当前只能兑换"+t.maxBuy+"个"}))},goLogin:function(){var t=navigator.userAgent;if(-1!=t.indexOf("damailicai_app")){if(t.split("damailicai_app/")[1].split(";")[0]<"3.2.0")if(-1!=t.indexOf("iPhone"))quicklogin(url);else try{JIClient.appClose(),JIClient.appLogin()}catch(t){}else try{JIClient.appLogin()}catch(t){}return!1}this.showLogin=!0},loginSuccess:function(){var t=this;t.showLogin=!1,t.isLogin=!0,t.getDetail()},closeLogin:function(){this.showLogin=!1},login:function(){var t=this;t.getCsrf(),t.$http.post("/shop/is-login",{},{headers:{"X-CSRF-Token":t.csrf}}).then(function(s){0==(s=s.data).statusCode&&(t.isLogin=!0)}).catch(function(t){})},reduce:function(){if(0==this.num)return!1;this.num--},add:function(){var t=this;return t.num==t.oDetail.stocks?(Object(c.MessageBox)({title:"温馨提示",message:"兑换数量不能大于剩余的"+t.oDetail.stocks+"个"}),!1):t.num==t.maxBuy?(Object(c.MessageBox)({title:"温馨提示",message:"您当前只能兑换"+t.maxBuy+"个"}),!1):void t.num++},getCsrf:function(){this.csrf=document.getElementsByName("csrf-token")[0].content},changeType:function(t){this.isActive=t},exchange:function(){var t=this;if(!t.isLogin)return t.showLogin=!0,!1;if(0==t.num)return Object(c.MessageBox)({title:"温馨提示",message:"请选择兑换数量"}),!1;if(t.virtualNum<t.oDetail.seller_price)return Object(c.MessageBox)({title:"温馨提示",message:"您当前积分不足"}),!1;var s={title:t.oDetail.title,need:t.oDetail.seller_price,goodsId:t.oDetail.goods_id,number:t.num,kind:t.oDetail.kind};t.saveSure(s),t.$router.push("/sure")},saveSure:function(t){t=i()(t);localStorage.setItem("sureDetail",t)},htmlDecode:function(t){var s=document.createElement("div");s.innerHTML=t;var e=s.innerText||s.textContent;return s=null,e},getDetail:function(){var t=this,s=location.href.split("?id=")[1];t.getCsrf();var e=new FormData;e.append("goods_id",s),t.$http.post("/shop/detail",e,{headers:{"Content-Type":"multipart/form-data","X-CSRF-Token":t.csrf}}).then(function(s){if("0"==(s=s.data).statusCode){var e=s.content;e.show_price!=e.seller_price&&(e.discount_rate=Math.floor(100*Number(e.seller_price)/Number(e.show_price))/10),t.oDetail=e,t.oDetail.remark=t.htmlDecode(t.oDetail.remark),t.maxBuy=s.content.max_buy,t.goodsId=s.content.goods_id,t.virtualNum=Math.floor(s.content.virtual_money),localStorage.setItem("virtualNum",t.virtualNum)}}).catch(function(t){})}}},r={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"detail"}},[t.isApp?t._e():e("common-head",{attrs:{title:t.title}}),t._v(" "),e("div",{staticClass:"cont"},[e("div",{staticClass:"good"},[e("img",{attrs:{src:t.oDetail.head_image}}),t._v(" "),t.oDetail.discount_rate?e("span",{staticClass:"discount-icon"},[e("p",[t._v(t._s(t.oDetail.discount_rate))]),e("p",[t._v("折")])]):t._e()]),t._v(" "),e("div",{staticClass:"good-back"}),t._v(" "),e("div",{staticClass:"introduce"},[e("h3",{staticClass:"tl"},[t._v(t._s(t.oDetail.title))]),t._v(" "),e("div",{staticClass:"integral"},[e("span",{staticClass:"num-icon"}),t._v(" "),e("span",{staticClass:"num"},[t._v(t._s(t.oDetail.seller_price))]),t._v(" "),e("span",[t._v("积分")]),t._v(" "),t.oDetail.show_price?e("span",{staticClass:"discount"},[e("span",{staticClass:"no-line"}),t._v(" "),e("span",{staticClass:"no-icon"}),t._v(" "),e("span",[t._v(t._s(t.oDetail.show_price))]),t._v(" "),e("span",[t._v("积分")])]):t._e(),t._v(" "),e("span",{staticClass:"remain"},[e("span",[t._v("剩余：")]),t._v(" "),e("span",[t._v(t._s(t.oDetail.stocks))]),t._v(" "),e("span",[t._v("件")])])]),t._v(" "),e("div",{staticClass:"number"},[e("span",[t._v("选择数量（每月限购 "+t._s(t.maxBuy)+"件/人 ）")]),t._v(" "),e("span",{staticClass:"box"},[e("span",{staticClass:"reduce-icon",on:{click:t.reduce}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.num,expression:"num"}],attrs:{type:"text"},domProps:{value:t.num},on:{input:[function(s){s.target.composing||(t.num=s.target.value)},t.checkNum]}}),t._v(" "),e("span",{staticClass:"add-icon",on:{click:t.add}})])])]),t._v(" "),e("div",{staticClass:"good-detail"},[e("ul",{staticClass:"type"},[e("li",{class:{active:"one"==t.isActive},on:{click:function(s){t.changeType("one")}}},[t._v("礼品简介")]),t._v(" "),e("li",{class:{active:"two"==t.isActive},on:{click:function(s){t.changeType("two")}}},[t._v("兑换须知")])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:"one"==t.isActive,expression:"isActive=='one'"}],staticClass:"introduction",domProps:{innerHTML:t._s(t.oDetail.remark)}}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:"two"==t.isActive,expression:"isActive=='two'"}],staticClass:"instruction"},[t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3)])])]),t._v(" "),e("footer",[e("div",{staticClass:"consum tl"},[e("span",[t._v("消耗积分")]),t._v(" "),e("span",{domProps:{textContent:t._s(t.seller_price)}}),t._v(" "),0!=t.oDetail.stocks?e("a",{staticClass:"tc",attrs:{href:"javascript:void(0)"},on:{click:t.exchange}},[t._v("积分兑换")]):e("a",{staticClass:"sell-out tc",attrs:{href:"javascript:void(0)"}},[t._v("已抢光")])]),t._v(" "),e("div",{staticClass:"points tl"},[t.isLogin?e("span",[e("span",[t._v("我的积分")]),t._v(" "),e("span",{domProps:{textContent:t._s(t.virtualNum)}})]):e("span",{on:{click:t.goLogin}},[t._v("登录查看我的积分")])])]),t._v(" "),e("login",{directives:[{name:"show",rawName:"v-show",value:t.showLogin,expression:"showLogin"}],on:{"close-login":t.closeLogin,"login-success":t.loginSuccess}})],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("h3",[s("span",{staticClass:"icon"}),s("span",{staticClass:"title"},[this._v("兑换到账时间？")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("p",[e("span",{staticClass:"icon"}),e("span",{staticClass:"title"},[t._v("红包，体验金，免费提现次数 在您兑换成功后即时到账；")])]),t._v(" "),e("p",[e("span",{staticClass:"icon"}),e("span",{staticClass:"title"},[t._v("话费 在您兑换成功后 5个工作日内充值至您帐号绑定的手机；")])]),t._v(" "),e("p",[e("span",{staticClass:"icon"}),e("span",{staticClass:"title"},[t._v("京东E卡，爱奇艺会员卡在您兑换成功后 7个工作日内，以短信方式将兑换码 发送至您帐号绑定的手机；")])]),t._v(" "),e("p",[e("span",{staticClass:"icon"}),e("span",{staticClass:"title"},[t._v("如派奖过程中，您更换了绑定手机，则以派奖时实际显示的手机号为准；")])]),t._v(" "),e("p",[e("span",{staticClass:"icon"}),e("span",{staticClass:"title"},[t._v("实物礼品在您兑换成功后 15个工作日内为您安排配送，请务必填写准确的邮寄地址。")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",[s("span",{staticClass:"icon"}),s("span",{staticClass:"title"},[this._v("注意事项？")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("p",[e("span",{staticClass:"icon"}),e("span",{staticClass:"title"},[t._v("积分兑换礼品非现金买卖商品，仅为大麦理财为答谢用户所提供的回赠服务，不提供发票。")])]),t._v(" "),e("p",[e("span",{staticClass:"icon"}),e("span",{staticClass:"title"},[t._v("大件实物礼品如需保修，请与客服联系；")])]),t._v(" "),e("p",[e("span",{staticClass:"icon"}),e("span",{staticClass:"title"},[t._v("除在运送途中发生损毁或本身存在质量瑕疵以外，恕不允许退货或换货。")])]),t._v(" "),e("p",[e("span",{staticClass:"icon"}),e("span",{staticClass:"title"},[t._v("符合退换货条件的用户，请在礼品签收后，及时与客服联系退换货。残次礼品寄回时，请务必保留原包装、内附说明书及相关文件。")])]),t._v(" "),e("p",[e("span",{staticClass:"icon"}),e("span",{staticClass:"title"},[t._v("积分兑换不支持刷奖等恶意行为，一经发现大麦理财有权取消其获奖资格或者删除其订单；一旦换购成功，则在换购中所消耗的积分不再返还。")])])])}]};var u=e("VU/8")(l,r,!1,function(t){e("reC1")},null,null);s.default=u.exports},reC1:function(t,s){}});