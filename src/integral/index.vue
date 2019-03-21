<template>
	<div id="exchange" >
		<div class="cont">
			<common v-if="!isApp" :title="title.title" :rightTitle="title.rightTitle" @right-click="rightClick"></common>
			<nav :class="{'top':isApp}">
				<a href="javascript:void(0)" @click="navActive(3)" :class="{active:isActive}"  onclick="_hmt.push(['_trackEvent', '积分兑换-虚拟产品', 'click', 'dhlb-xnlp'])" >虚拟礼品</a>
				<a href="javascript:void(0)" @click="navActive(1)" :class="{active:!isActive}" onclick="_hmt.push(['_trackEvent', '积分兑换-实物周边', 'click', 'dhlb-swzb'])">实物周边</a>
			</nav>

			<div class="list-box">
				<!-- 虚拟礼品 -->
				<ul v-show="isActive">
					<li v-for="item in aVirtual">
						<div class="clear">
							<a :href="'#/detail?id='+item.goods_id">
								<div v-if="item.stocks==0" class="sold-out">
									<div class="sold-icon"></div>
								</div>
								<span v-if="item.discount_rate"  class="discount-icon"><p>{{item.discount_rate}}</p><p>折</p></span>
								<img :src="item.thum_img" >
								<span v-if="item.hot==1" class="foot-icon">热销</span>
							</a>
						</div>
						<h3>{{item.title}}</h3>
						<p>
							<span class="integral-icon"></span>
							<span class="num">{{item.seller_price}}</span>
							<span >积分</span>
						</p>
					</li>
				</ul>
				<!-- 实物周边 -->
				<ul v-show="!isActive">
					<li v-for="value in aReal" >
						<div class="clear">
							<a :href="'#/detail?id='+value.goods_id">
								<div v-if="value.stocks==0" class="sold-out">
									<div class="sold-icon"></div>
								</div>
								<span v-if="value.discount_rate"  class="discount-icon"><p>{{value.discount_rate}}</p><p>折</p></span>
								<img :src="value.thum_img">
								<span v-if="value.hot==1"  class="foot-icon">热销</span>
							</a>
						</div>
						<h3>{{value.title}}</h3>
						<p>
							<span class="integral-icon"></span>
							<span class="num">{{value.seller_price}}</span>
							<span >积分</span>
						</p>
					</li>
				</ul>
				<div :class="loadMoreHide ? 'load-more-hide' : 'load-more-normal'" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="4">
					<span v-show="loadingShow" v-text="loadingText"></span>
				</div>
			</div>
		</div>
		<footer>
      <span>
        <span >我的积分</span>
        <span class="num" v-text="virtualNum" v-if="isLogin"></span>
				<span class="num" @click="goLogin" v-else>登录查看</span>
      </span>
      <a href="javascript:void(0)" @click="goIntegral" onclick="_hmt.push(['_trackEvent', '积分兑换-积分记录', 'click', 'dhlb-jfjl'])" >积分记录</a>
    </footer>
		<login v-show="showLogin" @close-login='closeLogin' @login-success="loginSuccess"></login>
	</div>
</template>
<script>
	import common from "../components/common-head.vue"
	import login from "../components/login.vue"
	import { MessageBox } from 'mint-ui'
	//import { Loadmore } from 'mint-ui'
  import { Indicator } from 'mint-ui'
	export default {
		 name:'integral',
		 components:{
			 'common':common,
			 'login':login
		 },
 		data(){
 			return {
				isActive:true,
				title:{//头部
					title:"积分商城",
					rightTitle:"兑换记录",
				},
				aReal:[],//实物奖品列表
				aVirtual:[],//虚拟奖品奖励
				page:0,
				total:0,
				type:3,
				showLogin:false,//是否显示登录框
				csrf:"",//csrf
				isLogin:false,//是否登录
				isApp:false,//是否app
				virtualNum:0,//我的积分数量
        busy: false,
        loadingShow: true,
        loadMoreHide:false,
        loadingText:'加载中...'
 			}
		},
		created(){
      var t=this
      t.judgeApp()
      t.login()
			t.loadMore()
		},
 		methods:{
      judgeApp(){
        var t=this;
        var ua = navigator.userAgent;
        var iPhone = ua.indexOf('iPhone') != -1;
        if(ua.indexOf("damailicai_app") != -1){
          t.isApp=true;
          if(iPhone) {
            var param = {
              showBack: true,
              title: '积分商城',
              right: '兑换记录'
            }
            try {
              JIClient.appSetHead(param);
            } catch(err) {};
          } else {
            try {
              JIClient.appSetHead(true, '积分商城', '兑换记录');
            } catch(err) {};
          }
          window.appRight=t.appRight;
        }else{
          t.isApp=false;
        }
			},
      appRight(){
        var t=this
        if(t.isLogin){
          window.location.href="/shop/index#/history"
				}else{
          t.goLogin()
				}
      },
      rightClick(){
        var t=this
        if(t.isLogin){//已登录
          t.$router.push('/history')
          _hmt.push(['_trackEvent', '兑换记录', 'click', 'dhlb-dhjl'])
        }else{
          t.showLogin=true
        }
      },

			//去登陆
			goLogin(){
				var t=this;
				var ua = navigator.userAgent;
				if(ua.indexOf("damailicai_app") != -1){
	        var version = ua.split('damailicai_app/')[1].split(';')[0];
	        if(version < '3.2.0'){
	            if(ua.indexOf('iPhone') != -1){
	                quicklogin(url)          
	            }else{
	                try{JIClient.appClose();JIClient.appLogin();}catch(err){};
	            }
	        }else{
	            try{JIClient.appLogin();}catch(err){};
	        }
	        return false;
				}
				t.showLogin=true;
			},

		  getCsrf(){
			  var t=this;
			  t.csrf=	document.getElementsByName("csrf-token")[0].content;
		  },

			//兑换记录
			/*goHistory(){
				var t=this;
				if(t.isLogin){
					t.$router.push('/history');
				}else{
					t.showLogin=true;
				}
			},*/

			//返回按钮
			ret(){
				var t=this;
				window.history.length > 1? t.$router.go(-1): t.$router.push('/')
			},

			//登录
			login(){
				var t=this;
				t.getCsrf();
				t.$http.post('/shop/is-login',{
				},{
					headers: {
							'X-CSRF-Token': t.csrf,
					}
    		}).then(function(res){
					var res=res.data;
					if(res.statusCode==0){
						t.isLogin=true;
					}else{
					  return false
					}
				}).catch(function(err){
          MessageBox({
            title: '温馨提示',
            message: '系统繁忙，请稍后再试！'
          })
				})
			},
			//登录成功
			loginSuccess(){
				var t=this;
				t.showLogin=false;
				t.isLogin=true;
				t.getList(3,1)
			},
			closeLogin(){
				var t=this;
				t.showLogin=false;
			},

			//积分记录
			goIntegral(){
				var t=this;
				if(t.isLogin){
					t.$router.push("/integral");
				}else{
          t.goLogin()
				}
			},
			
      navActive(type){
				var t=this;
        t.type = type
        t.page = 1
        t.total = 0
        t.loadingText = '加载中...'
        t.getList(t.type,t.page);
			},

			update(data){
				return JSON.parse(JSON.stringify(data));
			},

			//保存积分数量
			saveNum(num){
				var t=this;
				t.virtualNum=num;
				localStorage.setItem('virtualNum',num);//存在本地
			},
			
			//获取产品列表
      loadMore(){
        var t = this
        t.busy = true
        t.loadingText = '加载中...'
        t.page++
        t.getList(t.type,t.page);
      },
			getList(type,page){
        Indicator.open({
          text: 'Loading...',
          spinnerType: 'fading-circle'
        })
				var t=this;
        if(page == 1){
          t.aReal = []
          t.aVirtual = []
          /*document.documentElement.scrollTop = 0
					window.pageYOffset = 0
					document.body.scrollTop =0*/
        }
				var data=new FormData();
				data.append("kind",type);
				data.append("page",page);
				t.$http.post('/shop/getlist',data,{
					headers: {
						'X-CSRF-Token': t.csrf,
            'Content-Type': 'multipart/form-data'
					}
				}).then(function(res){
					var res=res.data
					if(res.statusCode=="0"){
						if(res.content.virtual_money){
							t.saveNum(res.content.virtual_money);
						}
						t.total = res.content.total
            var list=res.content.list;
            for(var j=0;j<list.length;j++){
              if(list[j].seller_price==list[j].show_price){
                break;
              }
              list[j].discount_rate=Math.floor(Number(list[j].seller_price)*100/Number(list[j].show_price))/10;
            }
						if(type==1){
							//t.aReal=list;
              for(var i=0;i<list.length;i++){
                t.aReal.push(list[i]);
              }
							t.isActive=false;
						}else{
              for(var i=0;i<list.length;i++){
                t.aVirtual.push(list[i]);
              }
              t.isActive=true;
						}
            if(t.total<=t.page*10){//全部已加载
              t.loadingText = '—— 我是有底线的列表 ——'
              Indicator.close()
              return false
            }else{
              t.loadingText = '下拉加载更多'
            }
            t.busy = false
          }else{
            MessageBox({
              title: '温馨提示',
              message: res.message
            })
            t.busy = false
					}
          Indicator.close()
				}).catch(function(err){
					console.log(err);
          MessageBox({
            title: '温馨提示',
            message: '系统繁忙，请稍后再试！'
          })
				})
			}
		 }
 	}
</script>
<style lang="less">
.mint-loadmore{
	overflow: scroll !important;
}
.mint-loadmore-bottom{
	margin-bottom:0 !important;
}
.mint-indicator{
	position: relative;
	z-index: 10000;
}
.load-more-normal {
	text-align: center;
	height: .8rem;
	line-height: .8rem;
	font-size: .28rem;
}
.load-more-hide {
	height: 0;
}
#exchange {
	.cont{
		padding-bottom: 1.2rem;
	}
	.cont::-webkit-scrollbar {
		display:none;
	}
  .num {
    color: #ff9a26;
  }
  nav {
		width: 100%;
    height: .9rem;
    line-height: .9rem;
    text-align: center;
    font-size: 0.3rem;
    display: flex;
		background: #fff;
		position: fixed;
		z-index: 100;
		top: .91rem;
		&.top{
			top: 0;
		}
    a {
      flex: 1;
      color: #757575;
    }
    .active {
      color: #ff9a26;
      border-bottom: 1px solid #ff9a26;
    }
	}
	.list-box{
		margin-top: .8rem;
		font-size: .3rem;
		/*min-height: 11.1rem;
		height: 100%;
		overflow:scroll;
		-webkit-overflow-scrolling: touch;*/
	}
	.list-box::-webkit-scrollbar {
		display:none;
	}
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0.5rem 0.3rem 0;
    li {
      width: 3.25rem;
      margin-bottom: 0.15rem;
      > div {
        width: 3.25rem;
        height: 3.25rem;
        position: relative;
        border: 1px solid #eeeeee;
        .sold-out {
          position: absolute;
          width: 3.25rem;
          height: 3.25rem;
          background: rgba(0, 0, 0, 0.3);
          z-index: 12;
          .sold-icon {
            width: 1.65rem;
            height: 1.31rem;
            background: url(http://cdn1.damailicai.com/h5/integral/soldout@1x.png)  no-repeat;
            background-size: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .discount-icon {
					position: absolute;
					top: 0;
					right: 0;
          width: 0.64rem;
					height: 0.99rem;
					line-height: .33rem;
					text-align: center;
					word-break: break-all;
					padding-top: .15rem;
					box-sizing: border-box;
          background: url(http://cdn1.damailicai.com/h5/integral/find_jfsc_zk_bj@2x.png) no-repeat;
					background-size: 100%;
					z-index: 11;
					p{
						font-size: .3rem;
						color: #FFFFFF;
						text-align: center;
					}
        }
        img {
          width: 3rem;
          height: 3rem;
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
        .foot-icon {
          position: absolute;
          width: 0.66rem;
					height: 0.37rem;
					line-height: .37rem;
					text-align: center;
					background: #FF5657;
					color: #ffffff;
          right: 0;
					bottom: 0;
					font-size: .26rem;
					z-index: 11;
        }
      }
      h3 {
        font-size: .28rem;
        color: #212121;
        text-align: left;
      }
      p {
        line-height: 0.33rem;
        text-align: left;
        font-size: 0;
        span {
          display: inline-block;
          vertical-align: middle;
          font-size: 0.24rem;
          margin-right: 0.05rem;
        }
        .integral-icon {
          width: 0.23rem;
          height: 0.25rem;
          background: url(http://cdn1.damailicai.com/h5/integral/jifentubiao@1x.png)
            no-repeat;
          background-size: 100%;
        }
      }
    }
  }
  footer {
    height: 1.2rem;
    line-height: 1.2rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 0.3rem;
    box-sizing: border-box;
    border-top: 1px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
		z-index: 100;
    span {
      font-size: 0.3rem;
      // height: 1.46rem;
      // line-height: 1.46rem;
      color: #212121;
    }
    .num {
      color: #ff9a26;
    }
    a {
      width: 2.4rem;
      height: 0.68rem;
      line-height: 0.68rem;
      text-align: center;
      border-radius: 0.68rem;
      color: #ffffff;
      background: #ff9a26;
      font-size: 0.3rem;
    }
  }
}
</style>
